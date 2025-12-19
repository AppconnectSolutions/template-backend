import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import db from "../db.js";
import pool from "../db.js";  
import { sendMail } from "../mailer.js"; // email
import upload from "../middleware/upload.js";



const router = express.Router();

/* ==================================================
   MULTER STORAGE
================================================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + unique + path.extname(file.originalname));
  }
});


/* Delete helper */
const safeUnlink = (file) => {
  if (!file) return;
  fs.unlink(file, (err) => {
    if (err && err.code !== "ENOENT") console.error("Delete error:", err);
  });
};

/* ==================================================
   GET ALL PRODUCTS + VARIANTS
================================================== */
router.get("/", async (req, res) => {
  try {
    const status = req.query.status || "Active";

    const [rows] = await db.query(
      `SELECT 
        id, title, description, category, hsn, status, units,
        image1, image2, image3, image4, image5, image6, video, created_at
       FROM products
       WHERE status = ?`,
      [status]
    );

    for (let p of rows) {
      const [variants] = await db.query(
        `SELECT id, weight, price, sale_price, offer_percent, tax_percent, tax_amount, stock
         FROM product_variants
         WHERE product_id = ?`,
        [p.id]
      );
      p.variants = variants;
    }

    res.json({ success: true, products: rows });

  } catch (err) {
    console.error("Fetch All Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ==================================================
   GET SINGLE PRODUCT + VARIANTS
================================================== */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [[product]] = await db.query(
      `SELECT * FROM products WHERE id = ?`,
      [id]
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    const [variants] = await db.query(
      `SELECT id, weight, price, sale_price, offer_percent, 
              tax_percent, tax_amount, stock
       FROM product_variants
       WHERE product_id = ?`,
      [id]
    );

    product.variants = variants || [];

    res.json({ product });

  } catch (err) {
    console.error("Fetch Single Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ==================================================
   ADD PRODUCT + VARIANTS
================================================== */
router.post("/", upload.any(), async (req, res) => {
  try {
    const { title, description, category, hsn, status, units, variants } = req.body;
    const files = req.files || [];

    const images = Array(6).fill(null);

    files.forEach((f) => {
      if (f.fieldname.startsWith("image")) {
        const index = parseInt(f.fieldname.replace("image", "")) - 1;
        images[index] = f.filename;
      }
    });

    const video =
      files.find((f) => f.fieldname === "video")?.filename || null;

    const [result] = await db.query(
      `INSERT INTO products 
       (title, description, category, hsn, status, units,
        image1, image2, image3, image4, image5, image6, video, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        title,
        description,
        category,
        hsn,
        status,
        units, // Add units field
        images[0],
        images[1],
        images[2],
        images[3],
        images[4],
        images[5],
        video
      ]
    );

    const productId = result.insertId;

    // Insert variants
    const list = JSON.parse(variants);
    for (let v of list) {
      await db.query(
  `INSERT INTO product_variants
   (product_id, weight, price, sale_price, offer_percent,
    tax_percent, tax_amount, stock)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    productId,
    v.weight,
    Number(v.price),
    Number(v.sale_price) || 0,
    Number(v.offer_percent) || 0,
    Number(v.tax_percent) || 0,
    Number(v.tax_amount) || 0,
    Number(v.stock) || 0
  ]
);      
    }
    const [admins] = await pool.query(
      "SELECT email FROM admin_users WHERE role IN ('ADMIN','STAFF') AND email IS NOT NULL"
    );
    const adminEmails = admins.map(a => a.email);

    if (adminEmails.length > 0) {
      await sendMail({
        bcc: adminEmails.join(","), 
        subject: `New Product Added: ${title}`,
        html: `
          <h2>New Product Added</h2>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Units:</strong> ${units}</p>
          <p><a href="${process.env.FRONTEND_URL}/admin/products/${productId}">View Product</a></p>
        `
      });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("Add Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ==================================================
   UPDATE PRODUCT + VARIANTS
================================================== */
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, hsn, status, units, variants, removedImages } = req.body;

    const [[product]] = await db.query(
      `SELECT * FROM products WHERE id = ?`,
      [id]
    );
    if (!product) return res.status(404).json({ error: "Product not found" });

    const files = req.files || [];

    // Current images array
    const images = [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
      product.image5,
      product.image6
    ];

    // 1️⃣ Handle removed images
    if (removedImages && Array.isArray(removedImages)) {
      removedImages.forEach((field) => {
        const index = parseInt(field.replace("image", "")) - 1;
        safeUnlink(`uploads/${images[index]}`);
        images[index] = null; // set DB field to null
      });
    }

    // 2️⃣ Handle new uploaded images
    files.forEach((f) => {
      if (f.fieldname.startsWith("image")) {
        const index = parseInt(f.fieldname.replace("image", "")) - 1;
        safeUnlink(`uploads/${images[index]}`); // remove old image if exists
        images[index] = f.filename;
      }
    });

    // 3️⃣ Handle video
    let video = product.video;
    const vFile = files.find((f) => f.fieldname === "video");
    if (vFile) {
      safeUnlink(`uploads/${video}`);
      video = vFile.filename;
    }

    // 4️⃣ Update product
    await db.query(
      `UPDATE products SET 
        title=?, description=?, category=?, hsn=?, status=?, units=?,
        image1=?, image2=?, image3=?, image4=?, image5=?, image6=?, video=?
       WHERE id = ?`,
      [
        title,
        description,
        category,
        hsn,
        status,
        units,
        images[0], images[1], images[2],
        images[3], images[4], images[5],
        video,
        id
      ]
    );

    // 5️⃣ Replace variants
    await db.query(`DELETE FROM product_variants WHERE product_id = ?`, [id]);
    const list = JSON.parse(variants);
    for (let v of list) {
      await db.query(
        `INSERT INTO product_variants
         (product_id, weight, price, sale_price, offer_percent,
          tax_percent, tax_amount, stock)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          v.weight,
          v.price,
          v.sale_price,
          v.offer_percent,
          v.tax_percent,
          v.tax_amount,
          v.stock
        ]
      );
    }
    const [admins] = await db.query(
      "SELECT email FROM admin_users WHERE role IN ('ADMIN','STAFF') AND email IS NOT NULL"
    );
    const adminEmails = admins.map(a => a.email);

    if (adminEmails.length > 0) {
      await sendMail({
        bcc: adminEmails.join(","),
        subject: `Product Updated: ${title}`,
        html: `
          <h2>Product Updated</h2>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Units:</strong> ${units}</p>
          <p><a href="${process.env.FRONTEND_URL}/admin/products/${id}">View Product</a></p>
        `
      });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: err.message });
  }
});


/* ==================================================
   DELETE PRODUCT
================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [[product]] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete images
    for (let i = 1; i <= 6; i++) {
      safeUnlink(`uploads/${product[`image${i}`]}`);
    }

    safeUnlink(`uploads/${product.video}`);

    // Delete product & variants
    await db.query("DELETE FROM product_variants WHERE product_id = ?", [id]);
    await db.query("DELETE FROM products WHERE id = ?", [id]);

     // Send email to admins
    const [admins] = await db.query(
      "SELECT email FROM admin_users WHERE role IN ('ADMIN','STAFF') AND email IS NOT NULL"
    );
    const adminEmails = admins.map(a => a.email);

    if (adminEmails.length > 0) {
      await sendMail({
        bcc: adminEmails.join(","),
        subject: `Product Deleted: ${product.title}`,
        html: `
          <h2>Product Deleted</h2>
          <p><strong>Title:</strong> ${product.title}</p>
          <p><strong>Category:</strong> ${product.category}</p>
        `
      });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

import express from "express";
import pool from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for logo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/logos"); // folder for logos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET latest navbar
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM navbar ORDER BY id DESC LIMIT 1");
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.json({
        logo_url: "",
        company_name: "",
        label1: "Home",
        label2: "Products",
        label3: "Shop Now",
        label4: "About Us",
        label5: "Contact Us",
        label6: "Combos",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add or update navbar
router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const {
      companyName,
      label1,
      label2,
      label3,
      label4,
      label5,
      label6,
    } = req.body;

    const logoUrl = req.file ? `/uploads/logos/${req.file.filename}` : null;

    const [rows] = await pool.execute("SELECT * FROM navbar LIMIT 1");

    if (rows.length > 0) {
      await pool.execute(
        `UPDATE navbar SET 
          logo_url = ?, 
          company_name = ?, 
          label1 = ?, 
          label2 = ?, 
          label3 = ?, 
          label4 = ?, 
          label5 = ?, 
          label6 = ? 
        WHERE id = ?`,
        [
          logoUrl || rows[0].logo_url,
          companyName,
          label1,
          label2,
          label3,
          label4,
          label5,
          label6,
          rows[0].id,
        ]
      );
      res.json({ message: "Navbar updated" });
    } else {
      await pool.execute(
        `INSERT INTO navbar 
          (logo_url, company_name, label1, label2, label3, label4, label5, label6) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [logoUrl, companyName, label1, label2, label3, label4, label5, label6]
      );
      res.json({ message: "Navbar added" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

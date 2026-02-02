import express from "express";
import pool from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer config for multiple images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/why-choose");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET current company + images
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM why_choose ORDER BY id DESC LIMIT 1");
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.json({
        company_name: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        image6: "",
        image7: "",
        image8: "",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST update company + 8 images
router.post("/", upload.fields([
  { name: "image1" }, { name: "image2" }, { name: "image3" }, { name: "image4" },
  { name: "image5" }, { name: "image6" }, { name: "image7" }, { name: "image8" }
]), async (req, res) => {
  try {
    const { companyName } = req.body;

    // Build image URLs if uploaded
    const images = {};
    for (let i = 1; i <= 8; i++) {
      images[`image${i}`] = req.files[`image${i}`]
        ? `/uploads/why-choose/${req.files[`image${i}`][0].filename}`
        : null;
    }

    const [rows] = await pool.execute("SELECT * FROM why_choose LIMIT 1");

    if (rows.length > 0) {
      await pool.execute(
        `UPDATE why_choose SET 
          company_name = ?, 
          image1 = COALESCE(?, image1),
          image2 = COALESCE(?, image2),
          image3 = COALESCE(?, image3),
          image4 = COALESCE(?, image4),
          image5 = COALESCE(?, image5),
          image6 = COALESCE(?, image6),
          image7 = COALESCE(?, image7),
          image8 = COALESCE(?, image8)
        WHERE id = ?`,
        [
          companyName,
          images.image1, images.image2, images.image3, images.image4,
          images.image5, images.image6, images.image7, images.image8,
          rows[0].id
        ]
      );
      res.json({ message: "Why Choose updated" });
    } else {
      await pool.execute(
        `INSERT INTO why_choose 
          (company_name, image1, image2, image3, image4, image5, image6, image7, image8) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          companyName,
          images.image1, images.image2, images.image3, images.image4,
          images.image5, images.image6, images.image7, images.image8
        ]
      );
      res.json({ message: "Why Choose created" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

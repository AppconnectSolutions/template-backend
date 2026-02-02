import express from "express";
import pool from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/top-picks");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all top picks
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM top_picks ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Normalize all fields to avoid undefined
    const {
      title = null,
      price = null,
      oldPrice = null,
      rating = null,
      badge = null,
    } = req.body;

    const imgUrl = req.file ? `/uploads/top-picks/${req.file.filename}` : null;

    // Optional: validate required fields
    if (!title || !price || !rating || !imgUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await pool.execute(
      "INSERT INTO top_picks (img_url, title, price, old_price, rating, badge) VALUES (?, ?, ?, ?, ?, ?)",
      [imgUrl, title, price, oldPrice || null, rating, badge || null]
    );

    res.json({ message: "Top pick added successfully" });
  } catch (err) {
    console.error("Top pick insert error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

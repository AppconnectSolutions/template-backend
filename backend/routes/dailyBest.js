


import express from "express";
import pool from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/daily-best"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// --- HERO ---
router.get("/hero", async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM daily_best_hero ORDER BY id DESC LIMIT 1");
  res.json(rows[0] || {});
});

router.post("/hero", upload.single("image"), async (req, res) => {
  const { title, description, ctaLabel } = req.body;
  const imageUrl = req.file ? `/uploads/daily-best/${req.file.filename}` : null;

  const [rows] = await pool.execute("SELECT * FROM daily_best_hero LIMIT 1");
  if (rows.length > 0) {
    await pool.execute(
      "UPDATE daily_best_hero SET title=?, description=?, cta_label=?, image_url=? WHERE id=?",
      [title, description, ctaLabel, imageUrl, rows[0].id]
    );
    res.json({ message: "Hero updated" });
  } else {
    await pool.execute(
      "INSERT INTO daily_best_hero (title, description, cta_label, image_url) VALUES (?, ?, ?, ?)",
      [title, description, ctaLabel, imageUrl]
    );
    res.json({ message: "Hero created" });
  }
});

// --- PRODUCTS ---
router.get("/products", async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM daily_best_products ORDER BY id ASC");
  res.json(rows);
});

router.post("/products", upload.single("image"), async (req, res) => {
  const { title, description, rating, ctaLabel } = req.body;
  const imageUrl = req.file ? `/uploads/daily-best/${req.file.filename}` : null;

  await pool.execute(
    "INSERT INTO daily_best_products (title, description, rating, cta_label, image_url) VALUES (?, ?, ?, ?, ?)",
    [title, description, rating || null, ctaLabel, imageUrl]
  );
  res.json({ message: "Product added" });
});

export default router;
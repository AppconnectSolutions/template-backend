import express from "express";
import pool from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/banners");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all banner slides
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM banner_slides ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upload new slide
router.post("/", upload.single("slide"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = `/uploads/banners/${req.file.filename}`;
    await pool.execute("INSERT INTO banner_slides (image_url) VALUES (?)", [imageUrl]);

    res.json({ message: "Slide added", imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update existing slide image
router.put("/:id", upload.single("slide"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = `/uploads/banners/${req.file.filename}`;

    await pool.execute(
      "UPDATE banner_slides SET image_url = ? WHERE id = ?",
      [imageUrl, id]
    );

    res.json({ message: "Slide updated", imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

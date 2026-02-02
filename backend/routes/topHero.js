import express from "express";
import pool from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/top-hero"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST add hero section
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title = null, description = null, buttonLabel = null } = req.body;
    const imageUrl = req.file ? `/uploads/top-hero/${req.file.filename}` : null;

    if (!title || !description || !buttonLabel || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await pool.execute(
      "INSERT INTO top_hero (title, description, button_label, image_url) VALUES (?, ?, ?, ?)",
      [title, description, buttonLabel, imageUrl]
    );

    res.json({ message: "Hero section saved" });
  } catch (err) {
    console.error("Hero insert error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET latest hero section
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM top_hero ORDER BY id DESC LIMIT 1");
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.json({ title: "", description: "", button_label: "", image_url: "" });
    }
  } catch (err) {
    console.error("Hero fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

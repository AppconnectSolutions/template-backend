

import express from "express";
import pool from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/recipes"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all recipes
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM recipes ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("Recipes fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST add new recipe
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title = null, description = null } = req.body;
    const imageUrl = req.file ? `/uploads/recipes/${req.file.filename}` : null;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await pool.execute(
      "INSERT INTO recipes (title, description, image_url) VALUES (?, ?, ?)",
      [title, description, imageUrl]
    );

    res.json({ message: "Recipe added successfully" });
  } catch (err) {
    console.error("Recipe insert error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
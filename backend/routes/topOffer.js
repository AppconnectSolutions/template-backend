import express from "express";
import pool from "../db.js";

const router = express.Router();

// ==========================
// GET latest offer
// ==========================
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM top_offer ORDER BY id DESC LIMIT 1"
    );
    if (rows.length > 0) {
      const offer = rows[0];
      res.json({
        lemonMessage: offer.lemon_message || "",
        whatsappNumber: offer.whatsapp_number || "",
        welcomeMessage: offer.welcome_message || "",
        leftArrowLabel: offer.left_arrow_label || "",
        rightArrowLabel: offer.right_arrow_label || "",
      });
    } else {
      res.json({
        lemonMessage: "",
        whatsappNumber: "",
        welcomeMessage: "",
        leftArrowLabel: "",
        rightArrowLabel: "",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// POST add or update offer
// ==========================
router.post("/", async (req, res) => {
  try {
    const {
      lemonMessage,
      whatsappNumber,
      welcomeMessage,
      leftArrowLabel,
      rightArrowLabel,
    } = req.body;

    const [rows] = await pool.execute("SELECT * FROM top_offer LIMIT 1");

    if (rows.length > 0) {
      await pool.execute(
        `UPDATE top_offer SET 
          lemon_message = ?, 
          whatsapp_number = ?, 
          welcome_message = ?, 
          left_arrow_label = ?, 
          right_arrow_label = ? 
        WHERE id = ?`,
        [
          lemonMessage,
          whatsappNumber,
          welcomeMessage,
          leftArrowLabel,
          rightArrowLabel,
          rows[0].id,
        ]
      );
      res.json({ message: "Offer updated" });
    } else {
      await pool.execute(
        `INSERT INTO top_offer 
          (lemon_message, whatsapp_number, welcome_message, left_arrow_label, right_arrow_label) 
        VALUES (?, ?, ?, ?, ?)`,
        [
          lemonMessage,
          whatsappNumber,
          welcomeMessage,
          leftArrowLabel,
          rightArrowLabel,
        ]
      );
      res.json({ message: "Offer added" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// PUT update offer (matches frontend PUT requests)
// ==========================
router.put("/", async (req, res) => {
  try {
    const {
      lemonMessage,
      whatsappNumber,
      welcomeMessage,
      leftArrowLabel,
      rightArrowLabel,
    } = req.body;

    const [rows] = await pool.execute("SELECT * FROM top_offer LIMIT 1");

    if (rows.length > 0) {
      await pool.execute(
        `UPDATE top_offer SET 
          lemon_message = ?, 
          whatsapp_number = ?, 
          welcome_message = ?, 
          left_arrow_label = ?, 
          right_arrow_label = ? 
        WHERE id = ?`,
        [
          lemonMessage,
          whatsappNumber,
          welcomeMessage,
          leftArrowLabel,
          rightArrowLabel,
          rows[0].id,
        ]
      );
      res.json({ message: "Offer updated" });
    } else {
      // Optional: insert if no offer exists
      await pool.execute(
        `INSERT INTO top_offer 
          (lemon_message, whatsapp_number, welcome_message, left_arrow_label, right_arrow_label) 
        VALUES (?, ?, ?, ?, ?)`,
        [
          lemonMessage,
          whatsappNumber,
          welcomeMessage,
          leftArrowLabel,
          rightArrowLabel,
        ]
      );
      res.json({ message: "Offer added" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

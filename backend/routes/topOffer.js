import express from "express";
import pool from "../db.js";

const router = express.Router();

/* ==========================
   GET latest offer
========================== */
router.get("/", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM top_offer ORDER BY id DESC LIMIT 1"
    );

    if (!rows.length) {
      return res.json({
        lemonMessage: "",
        whatsappNumber: "",
        welcomeMessage: "",
        leftArrowLabel: "",
        rightArrowLabel: "",
      });
    }

    const offer = rows[0];

    res.json({
      lemonMessage: offer.lemon_message ?? "",
      whatsappNumber: offer.whatsapp_number ?? "",
      welcomeMessage: offer.welcome_message ?? "",
      leftArrowLabel: offer.left_arrow_label ?? "",
      rightArrowLabel: offer.right_arrow_label ?? "",
    });
  } catch (err) {
    console.error("❌ GET /api/topOffer failed:", err);
    next(err);
  }
});

/* ==========================
   SAVE / UPDATE offer
   (Use POST for both create & update)
========================== */
router.post("/", async (req, res, next) => {
  try {
    console.log("📥 TopOffer body:", req.body);

    const {
      lemonMessage = "",
      whatsappNumber = "",
      welcomeMessage = "",
      leftArrowLabel = "",
      rightArrowLabel = "",
    } = req.body || {};

    const [rows] = await pool.query(
      "SELECT id FROM top_offer ORDER BY id DESC LIMIT 1"
    );

    if (rows.length) {
      await pool.query(
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

      return res.json({ success: true, message: "Offer updated" });
    }

    await pool.query(
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

    res.json({ success: true, message: "Offer created" });
  } catch (err) {
    console.error("❌ POST /api/topOffer failed:", err);
    next(err);
  }
});

/* ==========================
   OPTIONAL: allow PUT but forward to POST
========================== */
router.put("/", (req, res, next) => {
  router.handle(req, res, next);
});

export default router;

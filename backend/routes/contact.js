// routes/contact.js
import express from "express";
import pool from "../db.js";
import { sendMail } from "../mailer.js";

const router = express.Router();

/* =======================================================
   CREATE CONTACT MESSAGE + SEND MAIL
======================================================= */
router.post("/", async (req, res) => {
  try {
    const { name, email, category, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email & message are required",
      });
    }

    // 1️⃣ Save to DB
    const sql = `
      INSERT INTO contact_messages (name, email, category, message)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query(sql, [name, email, category || "GENERAL", message]);

    // 2️⃣ Fetch admin + staff emails (same logic as orders)
    const [admins] = await pool.query(
      "SELECT email FROM admin_users WHERE role IN ('ADMIN','STAFF') AND email IS NOT NULL"
    );
    const adminEmails = admins.map(a => a.email);

    // 3️⃣ Prepare email HTML
    const adminHTML = `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Category:</b> ${category || "GENERAL"}</p>
      <p><b>Message:</b></p>
      <p>${message}</p>
    `;

    // 4️⃣ Send email to admins
    if (adminEmails.length) {
      await sendMail({
        bcc: adminEmails.join(","),
        subject: `New Contact Message (${category || "GENERAL"})`,
        html: adminHTML,
      });
    }

    // 5️⃣ Optional: auto-reply to user
   try {
  await sendMail({
    to: email,
    subject: "We received your message",
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for contacting us. We have received your message and our team will get back to you shortly.</p>
      
      <br/>
      <p>— Support Team</p>
    `,
  });
} catch (err) {
  console.error("Auto-reply failed:", err);
}

    res.json({
      success: true,
      message: "Message submitted successfully",
    });
  } catch (err) {
    console.error("CONTACT FORM ERROR:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

export default router;

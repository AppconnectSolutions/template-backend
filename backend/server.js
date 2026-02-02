import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/* ---------------- ROUTES ---------------- */
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payment.js";
import shipmentRoutes from "./routes/shipment.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import contactRoutes from "./routes/contact.js";
import feedbackRoutes from "./routes/feedback.js";
import topOfferRoutes from "./routes/topOffer.js";
import navbarRoutes from "./routes/navbar.js";
import bannerRoutes from "./routes/banner.js";
import whyChooseRoutes from "./routes/whyChoose.js";
import topPicksRoutes from "./routes/topPicks.js";
import topHeroRoutes from "./routes/topHero.js";
import recipeRoutes from "./routes/recipes.js";
import dailyBestRoutes from "./routes/dailyBest.js";

/* ---------------- CONFIG ---------------- */
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* ---------------- SAFETY LOGGING ---------------- */
process.on("unhandledRejection", (reason) => {
  console.error("🔥 UNHANDLED PROMISE REJECTION:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("🔥 UNCAUGHT EXCEPTION:", err);
});

/* ---------------- UPLOADS DIRECTORY ---------------- */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 uploads directory created");
}

app.use("/uploads", express.static(uploadDir));

/* ---------------- API ROUTES ---------------- */
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/topOffer", topOfferRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/why-choose", whyChooseRoutes);
app.use("/api/top-picks", topPicksRoutes);
app.use("/api/top-hero", topHeroRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/daily-best", dailyBestRoutes);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/health", (req, res) => {
  res.json({ status: "OK", time: new Date() });
});

/* ---------------- ROOT ---------------- */
app.get("/", (req, res) => {
  res.send("Backend running ✔");
});

/* ---------------- GLOBAL ERROR HANDLER (🔥 MOST IMPORTANT) ---------------- */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR HANDLER 🔥");
  console.error(err.stack || err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ---------------- SERVER START ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

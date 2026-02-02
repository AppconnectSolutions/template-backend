import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payment.js";
import shipmentRoutes from "./routes/shipment.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import path from "path";
import { fileURLToPath } from "url";  
import contactRoutes from "./routes/contact.js";
import feedbackRoutes from "./routes/feedback.js";
import topOfferRoutes from "./routes/topOffer.js"
import navbarRoutes from "./routes/navbar.js"; 
import bannerRoutes from "./routes/banner.js"; 
import whyChooseRoutes from "./routes/whyChoose.js"; 
import topPicksRoutes from "./routes/topPicks.js"; 
import topHeroRoutes from "./routes/topHero.js";
import recipeRoutes from "./routes/recipes.js";
import dailyBestRoutes from "./routes/dailyBest.js"; 






// emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 🔥 Serve image uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔥 API Routes
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


// Root URL
app.get("/", (req, res) => {
  res.send("Backend running ✔");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

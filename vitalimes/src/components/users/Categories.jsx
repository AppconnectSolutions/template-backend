import React from "react";
import { Container } from "react-bootstrap";

export default function ShopByCategory() {
  const base =
    typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : "";

  const categories = [
  { title: "Lemon Powder", img: "https://appconnect.cloud/uploads/lemon_powder.png", link: "/products" },
  { title: "Black Lemon", img: "https://appconnect.cloud/uploads/Black_lemon_dry.png", link: "/products" },
  { title: "Lemon Seed Powder", img: "https://appconnect.cloud/uploads/Lemon_seed_powder.png", link: "/products" },
  { title: "Lemon Seed Oil", img: "https://appconnect.cloud/uploads/seed_oil.png", link: "/products" },
  { title: "Lemon Essential Oil", img: "https://appconnect.cloud/uploads/essential_oil.png", link: "/products" },
  { title: "Black Lemon Powder", img: "https://appconnect.cloud/uploads/Black_lemon_powder.png", link: "/products" }
];

  return (
    <section style={{ padding: "2rem 0", background: "#fdfdfd" }}>
      <Container>
        <h3 className="text-center mb-5">Shop by Category</h3>

        <style>{`
          .category-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }

          @media (max-width: 992px) {
            .category-grid { grid-template-columns: repeat(2, 1fr); }
          }

          @media (max-width: 576px) {
            .category-grid { grid-template-columns: 1fr; }
          }

          /* Card */
          .category-card {
            width: 100%;
            height: 360px;
            border-radius: 18px;
            overflow: hidden;
            position: relative;
            background: #000;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            transition: 0.3s ease;
          }

          /* FULL IMAGE COVER (NO WHITE SPACE) */
          .category-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            transition: transform 0.4s ease;
          }

          .category-card:hover .category-bg {
            transform: scale(1.08);
          }

          /* TITLE — MAXIMUM VISIBILITY */
          .category-title {
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 1rem 0;
            text-align: center;
            font-size: 1.45rem;
            font-weight: 900;
            letter-spacing: 0.6px;

            color: #ffffff !important;
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.85),
              rgba(0,0,0,0.4),
              transparent
            );

            text-shadow: 0px 0px 6px rgba(0,0,0,0.9);
          }
        `}</style>

        <div className="category-grid">
          {categories.map((cat, i) => (
            <a href={cat.link} key={i} className="category-card">
              <div
                className="category-bg"
                style={{ backgroundImage: `url(${base}${cat.img})` }}
              ></div>

              <div className="category-title">{cat.title}</div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

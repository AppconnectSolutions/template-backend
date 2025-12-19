import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Featured() {
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products?status=Active`);
        console.log("API Response:", res.data);
        if (res.data.success) {
          setProducts(res.data.products.slice(0, 4)); // first 4 products
        }
      } catch (err) {
        console.error("Product fetch error", err);
      }
    };
    fetchProducts();
  }, []);

  const PrevArrow = ({ onClick }) => (
    <button className="featured-arrow featured-prev" onClick={onClick}>
      &#10094;
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button className="featured-arrow featured-next" onClick={onClick}>
      &#10095;
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 450,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section style={{ padding: "2rem 0", background: "#fafafa" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <h3 style={{ textAlign: "center", fontSize: "28px", marginBottom: "2rem" }}>
          Featured Products
        </h3>

        <Slider className="featured-slider" {...settings}>
          {products.map((product) => (
            <div key={product.id}>
              <div
                className="category-card"
                style={{ backgroundImage: `url(${API_URL}/uploads/${product.image1})` }}
              >
                <div className="category-title">{product.title}</div>
              </div>
            </div>
          ))}
        </Slider>

        <style>{`
          .featured-slider .slick-track { display: flex !important; }
          .featured-slider .slick-slide { height: auto !important; display: flex !important; justify-content: center; align-items: stretch; }
          .featured-slider .slick-slide > div { width: 100%; display: flex; }
          .category-card { width: 100%; height: 260px; border-radius: 18px; position: relative; overflow: hidden; cursor: pointer; box-shadow: 0 6px 20px rgba(0,0,0,0.12); transition: 0.35s ease; background-size: cover !important; background-position: center !important; background-repeat: no-repeat !important; }
          .category-card:hover { transform: translateY(-8px); box-shadow: 0 14px 35px rgba(0,0,0,0.25); }
          .category-title { position: absolute; bottom: 0; width: 100%; padding: 14px 0; text-align: center; font-size: 1.2rem; font-weight: 800; color: #fff; background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.15)); }
          .featured-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; background: #fff; border-radius: 50%; border: 1px solid rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; font-size: 20px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
          .featured-prev { left: -20px; }
          .featured-next { right: -20px; }
          @media (max-width: 768px) { .featured-arrow { width: 34px; height: 34px; font-size: 16px; } }
        `}</style>
      </div>
    </section>
  );
}

import React, { useRef, useEffect } from "react";

export default function DailyBestSells() {
  const base =
    typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : "";

  const sliderRef = useRef(null);

  // AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });

    if (
      sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
      sliderRef.current.scrollWidth - 5
    ) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const products = [
    {
      img: `${base}/assets/new/essential_oil.png`,
      title: "Lemon Essential Oil",
      description: [
        "100% pure lemon essential oil for skin and hair care",
        "✔ Natural astringent (oil control)",
        "✔ Anti-bacterial, anti-fungal",
        "✔ Skin whitening, pigmentation reduction",
        "✔ Anti-dandruff",
        "✔ Fresh fragrance",
      ],
      rating: 4.5,
    },

    {
      img: `${base}/assets/new/lemon_powder.png`,
      title: "Lemon Powder Drink",
      description: [
        "A refreshing lemon powder drink",
        "✔ Long shelf life",
        "✔ Strong natural flavour",
        "✔ Easy storage and transport",
      ],
      rating: 4.5,
    },

    {
      img: "https://appconnect.cloud/uploads/Black_lemon_dry.png",
      title: "Black Lemon",
      description: [
        "Dried black lemons for recipes",
        "✔ High antioxidant",
        "✔ Natural smoky sourness",
      ],
      rating: 4.5,
    },

    {
      img: "https://appconnect.cloud/uploads/Lemon_seed_powder.png",
      title: "Lemon Seed Powder",
      description: [
        "A natural source of lemon seed powder",
        "✔ Natural exfoliant",
        "✔ Removes dead skin",
        "✔ Chemical scrub safe alternative",
      ],
      rating: 4.5,
    },

    {
      img: `${base}/assets/new/Black_lemon_powder.png`,
      title: "Black Lemon Powder",
      description: [
        "Ground black lemon powder for seasoning",
        "✔ Spice mixes",
        "✔ Snack seasoning",
      ],
      rating: 4.5,
    },

    {
      img: `${base}/assets/new/seed_oil.png`,
      title: "Lemon Seed Oil",
      description: ["Pure lemon seed oil", "✔ High antioxidant", "✔ Nourishing properties"],
      rating: 4.5,
    },
  ];

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const stars = [];

    for (let i = 0; i < full; i++)
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    if (half)
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);

    while (stars.length < 5)
      stars.push(
        <i
          key={"e" + stars.length}
          className="bi bi-star text-warning opacity-50"
        ></i>
      );

    return stars;
  };

  return (
    <section style={{ marginTop: "4rem", marginBottom: "3rem" }}>
      <div className="container">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Daily Best Sells</h3>

          <div>
            <button
              className="btn btn-light me-2 shadow-sm rounded-circle"
              onClick={scrollLeft}
              style={{ width: 42, height: 42 }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              className="btn btn-light shadow-sm rounded-circle"
              onClick={scrollRight}
              style={{ width: 42, height: 42 }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div className="slider" ref={sliderRef}>
          {/* BANNER FIXED */}
          <div
            className="banner-small"
            style={{
              backgroundImage: `url(${base}/assets/images/Blacklemon_powder_2.png)`,
            }}
          >
            <h4 className="banner-text">100% Pure Black Lemon Powder</h4>
            <p className="banner-sub">Organic | Fresh | Premium Quality</p>

            <a href="/products" className="btn btn-success btn-sm banner-btn">
              Shop Now
            </a>
          </div>

          {/* PRODUCT CARDS */}
          {products.map((p, idx) => (
            <div className="product-card" key={idx}>
              <div className="product-image-frame">
                <img src={p.img} alt={p.title} />
              </div>

              <h6 className="mt-2 fw-bold">{p.title}</h6>

              <ul className="product-description">
                {p.description.map((benefit, i) => (
                  <li key={i} className="benefit-item">
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-auto text-end">
                {renderStars(p.rating)}
                <small className="text-muted">{p.rating}</small>
              </div>

              <a href="/products" className="btn btn-success btn-sm mt-2">
                Add to Cart
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CSS FIXES */}
      <style>{`
        .slider {
          display: flex;
          gap: 1.6rem;
          overflow-x: hidden;
          scroll-behavior: smooth;
          white-space: nowrap;
        }

        .slider::-webkit-scrollbar {
          display: none;
        }

        .banner-small {
          flex: 0 0 380px;
          height: 480px;
          background-size: cover;
          background-position: center;
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          color: #fff;
        }

        /* FIXED OVERLAY - LIGHTER AT BOTTOM */
        .banner-small::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.15)
          );
          border-radius: 16px;
        }

        .banner-text {
          position: relative;
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 5px;
          text-shadow: 0 3px 6px rgba(0,0,0,0.7);
          z-index: 5;
        }

        .banner-sub {
          position: relative;
          font-size: 1rem;
          opacity: 0.95;
          text-shadow: 0 2px 4px rgba(0,0,0,0.6);
          z-index: 5;
        }

        /* FIXED SHOP NOW BUTTON VISIBILITY */
        .banner-btn {
          position: relative;
          margin-top: 12px;
          margin-bottom: 15px;
          background-color: #28a745 !important;
          border: 2px solid white !important;
          font-weight: 600;
          z-index: 6;
        }

        .product-card {
          flex: 0 0 280px;
          height: 480px;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 14px;
          background: #fff;
          display: inline-flex;
          flex-direction: column;
        }

        .product-image-frame {
          width: 100%;
          height: 200px;
          background: #f7f7f7;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .product-image-frame img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .product-description {
          padding: 0;
          margin-top: 10px;
          list-style: none;
        }

        .benefit-item {
          margin-bottom: 4px;
          font-size: .9rem;
        }
      `}</style>
    </section>
  );
}

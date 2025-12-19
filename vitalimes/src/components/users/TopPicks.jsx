import React from "react";

export default function TopPicks() {
  const base =
    typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : "";

  const products = [
    {
      img: `/assets/images/combo_2.png`,
      title: "Vitalimes Daily Essential Combo",
      price: "₹849.00",
      oldPrice: "₹1,199.00",
      rating: 4.7,
      badge: null,
    },
    {
      img: `/assets/images/combo.png`,
      title: "Vitalimes Black Lemon Powder Pack",
      price: "₹399.00",
      oldPrice: "₹599.00",
      rating: 4.3,
      badge: "Hot",
    },
    {
      img: `/assets/images/combo_4.png`,
      title: "Vitalimes Lemon Essential Oil",
      price: "₹299.00",
      oldPrice: null,
      rating: 4.6,
      badge: null,
    },
    {
      img: `/assets/images/combo_3.png`,
      title: "Vitalimes Lemon Seed Oil",
      price: "₹449.00",
      oldPrice: "₹699.00",
      rating: 4.4,
      badge: null,
    },
  ];

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const stars = [];

    for (let i = 0; i < full; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning me-1" />);
    }

    if (half) {
      stars.push(<i key="half" className="bi bi-star-half text-warning me-1" />);
    }

    while (stars.length < 5) {
      stars.push(
        <i
          key={"e" + stars.length}
          className="bi bi-star text-warning opacity-25 me-1"
        />
      );
    }

    return stars;
  };

  return (
    <section className="top-picks-section" style={{ padding: "3rem 0" }}>
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="mb-0">Top Picks</h3>
            <p className="text-muted small">Hand-picked products you may love</p>
          </div>
          <a href="#!" className="text-decoration-none small">
            View all
          </a>
        </div>

        {/* FIXED CSS */}
        <style>{`
          .hero-card {
            border-radius: 20px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 8px 28px rgba(0,0,0,0.12);
          }

          .hero-media img {
            width: 100%;
            height: 520px;
            object-fit: cover;
            display: block;
          }

          .hero-cta {
            padding: 30px 25px 40px;
            text-align: center;
          }

          /* PRODUCT CARD */
          .product-card {
            border-radius: 18px;
            border: 1px solid #eef1f5;
            padding: 18px;
            display: flex;
            flex-direction: column;
            background: #fff;
            height: 100%;
            box-shadow: 0 6px 18px rgba(0,0,0,0.06);
            transition: 0.3s ease;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          }

          /* BIG PRODUCT IMAGE */
          .product-thumb {
            width: 100%;
            height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border-radius: 14px;
            background: #f8f8f8;
            margin-bottom: 18px;
          }

          .product-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .badge-hot {
            position: absolute;
            top: 10px;
            left: 12px;
            background: #ff4d4d;
            color: #fff;
            padding: 5px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: bold;
          }

          .add-btn {
             text-decoration:none !important;
            background: #1eae55 !important;
            color: #fff !important;
            border: none;
            padding: 12px 0;
            font-weight: 700;
            border-radius: 10px;
            text-align: center;
            margin-top: auto;
          }

          .add-btn:hover {
            background: #149d48 !important;
            text-decoration:none !important;
          }

          @media (max-width: 992px) {
            .product-thumb { height: 260px; }
            .hero-media img { height: 400px; }
          }

          @media (max-width: 575px) {
            .product-thumb { height: 200px; }
            .hero-media img { height: 260px; }
          }
        `}</style>

        {/* GRID */}
        <div className="row g-4">
          {/* LEFT HERO */}
          <div className="col-12 col-lg-6">
            <div className="hero-card">
              <div className="hero-media">
                <img
                  src={`${base}/assets/images/combo_2.png`}
                  alt="Daily Essentials"
                />
              </div>

              <div className="hero-cta">
                <h4>Daily Essentials Combos</h4>
                <p className="text-muted">
                  Everything you need for everyday meals — in one value pack!
                </p>
                <a href="/products" className="btn btn-success px-4">
                  Shop Daily Combos
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="col-12 col-lg-6">
            <div className="row g-3">
              {products.map((p, idx) => (
                <div className="col-6" key={idx}>
                  <div className="product-card position-relative">
                    {p.badge && <div className="badge-hot">{p.badge}</div>}

                    <div className="product-thumb">
                      <img src={`${base}${p.img}`} alt={p.title} />
                    </div>

                    <h6 className="text-dark">{p.title}</h6>

                    <div className="d-flex justify-content-between mt-2">
                      <div>
                        
                      </div>

                      <div className="text-end">
                        {renderStars(p.rating)}
                        <small className="text-muted d-block">{p.rating}</small>
                      </div>
                    </div>

                    <a href="/products" className="add-btn w-100">
                      GET YOUR PRODUCT
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

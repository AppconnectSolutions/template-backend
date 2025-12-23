import React from "react";

export default function TopPicks() {
  const base =
    typeof process !== "undefined" && process.env?.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : "";

  const products = [
    {
      img: "/assets/images/combo_2.png",
      title: "Vitalimes Daily Essential Combo",
      price: "₹849.00",
      oldPrice: "₹1,199.00",
      rating: 4.7,
      badge: null,
    },
    {
      img: "/assets/images/combo_4.png",
      title: "Vitalimes Black Lemon Powder Pack",
      price: "₹399.00",
      oldPrice: "₹599.00",
      rating: 4.3,
      badge: "Hot",
    },
    {
      img: "/assets/images/combo_4.png",
      title: "Vitalimes Lemon Essential Oil",
      price: "₹299.00",
      oldPrice: null,
      rating: 4.6,
      badge: null,
    },
    {
      img: "/assets/images/combo_3.png",
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

    for (let i = 0; i < full; i++)
      stars.push(<i key={i} className="bi bi-star-fill text-warning me-1" />);

    if (half)
      stars.push(<i key="h" className="bi bi-star-half text-warning me-1" />);

    while (stars.length < 5)
      stars.push(
        <i
          key={"e" + stars.length}
          className="bi bi-star text-warning opacity-25 me-1"
        />
      );

    return stars;
  };

  return (
    <section className="py-5">
      <div className="container">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="mb-0">Top Picks</h3>
            <p className="text-muted small">
              Hand-picked products you may love
            </p>
          </div>
          <a href="#!" className="text-decoration-none small">
            View all
          </a>
        </div>

        {/* STYLES */}
        <style>{`
          /* HERO */
          .hero-card {
            height: 100%;
            border-radius: 22px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 10px 30px rgba(0,0,0,.12);
            display: grid;
            grid-template-rows: 1fr auto;
          }

          .hero-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .hero-cta {
            padding: 26px;
            text-align: center;
          }

          /* PRODUCT CARD – COMPACT */
          .product-card {
            height: 100%;
            border-radius: 18px;
            background: #fff;
            border: 1px solid #eef1f5;
            box-shadow: 0 6px 18px rgba(0,0,0,.06);
            padding: 14px;
            display: grid;
            grid-template-rows:
              170px
              auto
              auto
              auto
              44px;
            row-gap: 6px;
          }

          .product-thumb {
            border-radius: 14px;
            background: #f7f7f7;
            overflow: hidden;
          }

          .product-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .product-title {
            font-size: 14px;
            font-weight: 700;
            line-height: 1.2;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .price-row {
            font-weight: 700;
            color: #1eae55;
          }

          .price-row del {
            font-size: 13px;
            color: #999;
            margin-left: 6px;
          }

          .rating-row {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
          }

          .rating-row small {
            font-weight: 600;
            color: #666;
          }

          .add-btn {
            background: #1eae55;
            color: #fff;
            border-radius: 10px;
            text-align: center;
            font-weight: 700;
            line-height: 44px;
            text-decoration: none;
          }

          .add-btn:hover {
            background: #149d48;
            color: #fff;
          }

          .badge-hot {
            position: absolute;
            top: 10px;
            left: 12px;
            background: #ff4d4d;
            color: #fff;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 700;
          }


          @media (max-width: 768px) {
  .hero-media img,
  .product-thumb img {
    height: auto !important;
    object-fit: contain;
  }

  .product-card {
    grid-template-rows: auto auto auto auto 44px;
  }

  .product-thumb {
    height: auto;
  }
}

        `}</style>

        {/* GRID */}
        <div className="row g-4">
  {/* LEFT HERO */}
  <div className="col-12 col-md-6">
    <div className="hero-card">
      <div className="hero-media">
        <img
          src={`${base}/assets/images/combo_2.png`}
          alt="Daily Essentials"
        />
      </div>
      <div className="hero-cta">
        <h4>Daily Essentials Combos</h4>
        <p className="text-muted mb-3">
          Everything you need for everyday meals — in one value pack!
        </p>
        <a href="/products" className="btn btn-success px-4">
          Shop Daily Combos
        </a>
      </div>
    </div>
  </div>

  {/* RIGHT PRODUCTS */}
  <div className="col-12 col-md-6">
    <div className="row g-3">
      {products.map((p, i) => (
        <div className="col-12 col-sm-6" key={i}>
          <div className="product-card position-relative">
            {p.badge && <span className="badge-hot">{p.badge}</span>}

            <div className="product-thumb">
              <img src={`${base}${p.img}`} alt={p.title} />
            </div>

            <div className="product-title">{p.title}</div>

            <div className="price-row">
              {p.price}
              {p.oldPrice && <del>{p.oldPrice}</del>}
            </div>

            <div className="rating-row">
              {renderStars(p.rating)}
              <small>{p.rating}</small>
            </div>

            <a href="/products" className="add-btn">
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
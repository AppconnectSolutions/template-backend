import React from "react";

export default function Footers() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#1f3b2f",
        color: "#ffffff",
        paddingTop: "70px",
        paddingBottom: "50px",
      }}
    >
      <div className="container">

        {/* TOP GRID */}
        <div className="row g-5 mb-5">

          {/* COLUMN 1: ABOUT */}
          <div className="col-12 col-md-6 col-lg-3">
            <img
              src="/assets/images/vita_logo.svg"
              alt="Vitalimes Logo"
              style={{ width: "170px", marginBottom: "22px" }}
            />

            <p style={{ fontSize: "15px", lineHeight: "1.7", opacity: 0.9 }}>
              At Vitalimes, we bring you the purest and freshest lemon-based
              health products — from freeze-dried lemon powder to natural lemon oil.
              We deliver wellness and purity directly to your home.
            </p>
          </div>

          {/* COLUMN 2: EXPLORE */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="footer-title">Explore</h5>
            <ul className="footer-list">
              <li><a href="/products">Freeze Dried Lemon Powder</a></li>
              <li><a href="/products">Beverages</a></li>
              <li><a href="/products">Dried Lemon</a></li>
              <li><a href="/products">Lemon Oil</a></li>
              <li><a href="/products">Skin Care</a></li>
              <li><a href="/products">Metal Cleaning Powder</a></li>
            </ul>
          </div>

          {/* COLUMN 3: USEFUL LINKS */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="footer-title">Useful Links</h5>
            <ul className="footer-list">
              <li><a href="/about">About Us</a></li>
              <li><a href="/products">New Arrivals</a></li>
              <li><a href="/offers">Offers</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* COLUMN 4: CITIES */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="footer-title">All Over India</h5>
            <ul className="footer-list">
              <li><a href="/#">Chennai</a></li>
              <li><a href="/#">Bangalore</a></li>
              <li><a href="/#">Coimbatore</a></li>
              <li><a href="/#">Hyderabad</a></li>
              <li><a href="/#">Madurai</a></li>
            </ul>
          </div>
                         {/* CONTACT DETAILS */}
<div className="col-12 col-md-6 col-lg-3">
  <h5 className="footer-title">Contact Details</h5>

  <p className="footer-text">
    VITALIME AGROTECH PRIVATE LIMITED <br />
    Kovilpatti – 628503
  </p>

  <p className="footer-text">Phone: +91-9042417179</p>
  <p className="footer-text">Email: contact@vitalimes.com</p>

  {/* SUBSCRIBE */}
  <div className="d-flex mt-3">
    <input
      type="email"
      placeholder="Enter your email"
      className="form-control"
      style={{
        borderRadius: "10px",
        height: "45px",
        maxWidth: "240px",
      }}
    />
    <button
      className="btn btn-light ms-2"
      style={{
        height: "45px",
        borderRadius: "10px",
        padding: "0 18px",
        fontWeight: "bold",
      }}
    >
      →
    </button>
  </div>

  {/* SOCIAL ICONS */}
  <div className="d-flex gap-3 mt-4">
    <a className="social-btn" href="https://facebook.com">
      <i className="bi bi-facebook"></i>
    </a>
    <a className="social-btn" href="https://instagram.com">
      <i className="bi bi-instagram"></i>
    </a>
    <a className="social-btn" href="https://youtube.com">
      <i className="bi bi-youtube"></i>
    </a>
    <a className="social-btn" href="https://linkedin.com">
      <i className="bi bi-linkedin"></i>
    </a>
  </div>

  {/* WE ACCEPT */}
  
</div>

        

        </div>

        {/* BOTTOM SECTION */}
        <div
          className="text-center mt-5 pt-4"
          style={{
            borderTop: "1px solid #3c6a50",
            opacity: 0.9,
            fontSize: "15px",
            paddingTop: "25px",
          }}
        >
          <p style={{ margin: 0 }}>
            © {currentYear} Vitalimes. All rights reserved.
          </p>
          <p style={{ marginTop: "5px" }}>
             ❤️  Designed & Developed by {" "}
            <a
              href="https://www.appconnectsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#76ffb3", fontSize: "16px", fontWeight: 800, textDecoration: 'none' }}
            >
              AppConnect Solutions
            </a>
            {" "}❤️.
          </p>
        </div>
      </div>

      {/* CUSTOM CSS */}
      <style>{`
        .footer-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 18px;
        }
        .footer-list li {
          margin-bottom: 10px;
        }
        .footer-list li a {
          color: #d9e8db;
          font-size: 14px;
          text-decoration: none;
        }
        .footer-list li a:hover {
          color: #ffffff;
        }
        .footer-text {
          opacity: 0.9;
          font-size: 15px;
          line-height: 1.6;
        }
        .social-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #ffffff;
          transition: 0.3s ease;
        }
        .social-btn:hover {
          background: #ffffff;
          color: #1f3b2f;
        }
        .payment-icons img {
          margin-right: 10px;
        }
      `}</style>
    </footer>
  );
}

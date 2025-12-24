// src/components/users/Navbar.jsx
import React, { useState, useEffect } from "react"; // ✅ added useState & useEffect
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext.jsx";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Navbar({ openCart }) {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const isAdminLoggedIn = !!localStorage.getItem("vitalimes_token");
  const fromAdmin = sessionStorage.getItem("from_admin") === "true";

  // 🔐 Logout state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("vitalimes_token");
    const savedRole = localStorage.getItem("vitalimes_role"); // "admin" or "user"
    setIsLoggedIn(!!token);
    setRole(savedRole);
  }, []);

  const toggleNavbar = () => setIsOpen((s) => !s);
  const closeNavbar = () => setIsOpen(false);

    const handleLogout = () => {
    localStorage.removeItem("vitalimes_token");
    localStorage.removeItem("vitalimes_role");
    setIsLoggedIn(false);
    setRole(null);
    closeNavbar();
    navigate("/login", { replace: true });
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Shopnow", to: "/shopnow" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "Combos", to: "/combos" },
  ];

  const carouselItems = [
  "Welcome to Vitalimes",
  "Switch to Purity, Switch to Organic",
  "Next Day Delivery Available* | Shop Now",
  "Pure Lemon. Pure Wellness.",
];

const [carouselIndex, setCarouselIndex] = useState(0);

// Auto-slide every 5 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCarouselIndex((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  }, 3000); // every 3 seconds
  return () => clearInterval(interval);
}, []);


  return (
    <>
      <header className="sticky-top">
        {/* TOP STRIP */}
         <div className="top-offer-strip bg-dark text-white py-2">
  <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
    
    {/* CENTER TIMER */}
    <div className="offer-timer text-center text-md-start mb-2 mb-md-0 flex-grow-1">
      <h6 className="mb-0">Pure Lemon. Pure Wellness.</h6>
    </div>

    {/* RIGHT WHATSAPP */}
    <a
      href="https://wa.me/918072812904"
      target="_blank"
      rel="noopener noreferrer"
      className="offer-whatsapp d-flex align-items-center gap-2"
      style={{ whiteSpace: "nowrap" }}
    >
      <i className="bi bi-whatsapp"></i>
      <span className="d-none d-sm-inline">Need help? Call Us: +91 80728 12904</span>
    </a>

  </div>

  <style>
    {`
      .top-offer-strip {
        font-size: 0.9rem;
      }

      .offer-timer h6 {
        font-weight: 500;
        margin: 0;
      }

      .offer-whatsapp i {
        font-size: 1.2rem;
      }

      /* Small devices (<576px): only show icon */
      @media (max-width: 575px) {
        .offer-whatsapp span {
          display: none;
        }
        .offer-timer {
          font-size: 0.85rem;
        }
      }

      /* Medium devices (sm - 576px to 767px) */
      @media (min-width: 576px) and (max-width: 767px) {
        .offer-timer {
          font-size: 0.9rem;
        }
        .offer-whatsapp span {
          font-size: 0.85rem;
        }
      }

      /* Large devices (tablet & desktop) */
      @media (min-width: 768px) {
        .offer-timer {
          font-size: 1rem;
        }
        .offer-whatsapp span {
          font-size: 0.95rem;
        }
      }
    `}
  </style>
</div>



        
        <div className="bg-black text-white py-2">
  <div className="container d-flex align-items-center justify-content-between overflow-hidden">
    <button
      className="btn btn-link text-white p-0"
      onClick={() =>
        setCarouselIndex((prev) =>
          prev === 0 ? carouselItems.length - 1 : prev - 1
        )
      }
    >
      <ChevronLeft size={18} />
    </button>

    <div className="flex-grow-1 position-relative overflow-hidden" style={{ height: "24px" }}>
  {carouselItems.map((item, i) => {
    const isActive = i === carouselIndex;
    return (
      <div
        key={i}
        className="carousel-text position-absolute top-50 start-50 translate-middle"
        style={{
          transition: "transform 0.3s ease, opacity 0.3s ease",
          transform: isActive ? "translate(-50%, -50%)" : "translate(150%, -50%)",
          opacity: isActive ? 1 : 0,
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        {item}
      </div>
    );
  })}
</div>


    <button
      className="btn btn-link text-white p-0"
      onClick={() =>
        setCarouselIndex((prev) =>
          prev === carouselItems.length - 1 ? 0 : prev + 1
        )
      }
    >
      <ChevronRight size={18} />
    </button>
  </div>

  
</div>


        {/* MAIN NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            {/* Logo */}
            <Link to="/products" className="navbar-brand d-flex align-items-center me-3">
              <img
                src="/assets/images/vita_logo.svg"
                alt="Vitalimes Logo"
                style={{
                  width: "70px",
                  height: "auto",
                  marginRight: "10px",
                  objectFit: "contain",
                }}
              />
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <span style={{ color: "#086835fb" }}>Vita</span>
                <span style={{ color: "#ffc107" }}>limes</span>
              </span>
            </Link>

            {/* Mobile Toggler */}
            <button
            className="navbar-toggler"
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
            {/* Collapsible Section */}
            <div
  className={"collapse navbar-collapse" + (isOpen ? " show" : "")}
  id="mainNavbar"
>

              {/* Center Menu Items */}
              <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-4 mt-3 mt-lg-0">
                {navItems.map((item) => (
                  <li className="nav-item mx-1" key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        "nav-link px-0 fw-semibold " +
                        (isActive ? "text-success" : "text-dark") +
                        (item.label === "Shopnow" ? " shopnow-highlight" : "")
                      }
                      style={({ isActive }) => ({
                        fontSize: "0.95rem",
                        paddingBottom: "4px",
                        borderBottom: isActive
                          ? "2px solid #16a34a"
                          : "2px solid transparent",
                        transition: "0.2s",
                      })}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* RIGHT ICONS */}
<div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">



               {role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  className="btn btn-sm px-3 fw-semibold text-dark border"
                  style={{
                    backgroundColor: "#fff3cd",
                    borderColor: "#ffe08a",
                    borderRadius: "8px",
                  }}
                >
                  Admin Panel
                </NavLink>
              )}

              {/* Login / Logout */}
              {!isLoggedIn ? (
                <button
                  type="button"
                  className="btn btn-link p-0 text-dark"
                  onClick={() => navigate("/login")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-sm px-3 fw-semibold"
                  style={{
                    color: "#b02a37",
                    border: "1px solid #f1c2c2",
                    backgroundColor: "#fff5f5",
                    borderRadius: "8px",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
                {/* Search Icon */}
                <button type="button" className="btn btn-link p-0 text-dark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>

                {/* CART ICON */}
<button
  type="button"
  className="cart-icon-wrapper position-relative"
  onClick={openCart}
  aria-label="Open cart"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.6 13.5a2 2 0 0 0 2 1.5h9.7a2 2 0 0 0 2-1.6l1.3-7.4H6"></path>
  </svg>

  {cartCount > 0 && (
    <span className="cart-badge">
      {cartCount}
    </span>
  )}
</button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}


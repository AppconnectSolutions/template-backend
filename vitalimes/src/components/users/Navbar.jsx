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
  }, 3000); // 5 seconds

  return () => clearInterval(interval); // cleanup
}, []);

  return (
    <>
      <header className="sticky-top">
        {/* TOP STRIP */}
         <div className="top-offer-strip">
  <div className="container top-offer-inner">

    

    {/* CENTER TIMER */}
    <div className="offer-timer">
      <h6>Pure Lemon. Pure Wellness.</h6>
    </div>

    {/* RIGHT WHATSAPP */}
    <a
      href="https://wa.me/918072812904"
      target="_blank"
      rel="noopener noreferrer"
      className="offer-whatsapp"
    >
      <i className="bi bi-whatsapp"></i>
      <span>Need help? Call Us: +91 80728 12904</span>
    </a>

  </div>
</div>


        
        <div className="bg-black text-white py-2">
  <div className="container d-flex align-items-center justify-content-between">
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

    <div className="text-center flex-grow-1 fw-semibold">
      {carouselItems[carouselIndex]}
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
                  className="btn btn-link p-0 text-dark position-relative"
                  onClick={openCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>

                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
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


import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { to: "/account/cart", label: "My Cart", icon: "shopping-cart" },
    { to: "/account/orders", label: "My Orders", icon: "shopping-bag" },
    { to: "/account/settings", label: "Profile Settings", icon: "user" },
  ];

  const isActive = (path) =>
    location.pathname === path ? "bg-dark text-white" : "text-dark";

  return (
    <div className="d-flex flex-column p-3 border-end" style={{ minHeight: "100vh", width: "260px" }}>

      {/* --- TITLE --- */}
      <h5 className="fw-bold mb-4 d-none d-md-block" style={{ color: "#0d2b2f" }}>
        Account Menu
      </h5>

      {/* --- MENU ITEMS --- */}
      <ul className="nav nav-pills flex-column mb-auto">

        {menu.map((item, idx) => (
          <li className="nav-item mb-2" key={idx}>
            <Link
              to={item.to}
              className={`nav-link d-flex align-items-center gap-2 rounded ${isActive(item.to)}`}
              style={{ padding: "10px 12px", fontSize: "15px" }}
            >
              <i className={`feather-icon icon-${item.icon}`}></i>
              {item.label}
            </Link>
          </li>
        ))}

        {/* --- DIVIDER --- */}
        <hr className="my-3" />

        {/* --- LOG OUT --- */}
        <li>
          <a
            href="#"
            className="nav-link d-flex align-items-center gap-2 text-danger rounded"
            style={{ padding: "10px 12px", fontSize: "15px" }}
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("vitalimes_token");
              window.location.href = "/login";
            }}
          >
            <i className="feather-icon icon-log-out"></i>
            Logout
          </a>
        </li>
      </ul>

      {/* BOOTSTRAP RESPONSIVE STYLE */}
      <style>
        {`
        @media (max-width: 768px) {
          div[style] {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid #ddd !important;
            min-height: auto !important;
          }
          ul.nav {
            flex-direction: row !important;
            justify-content: space-around;
          }
          li.nav-item {
            margin-bottom: 0 !important;
          }
        }
      `}
      </style>
    </div>
  );
}

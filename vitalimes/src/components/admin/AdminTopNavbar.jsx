import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.min.js";

import "../../assets/css/admin-theme.css";

export default function AdminTopNavbar() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  const API_URL_BASE =
    (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

  useEffect(() => {
    const token = localStorage.getItem("vitalimes_token");
    if (!token) return;

    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${API_URL_BASE}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.valid) {
          setAdmin(res.data.admin);
        } else {
          localStorage.removeItem("vitalimes_token");
          setAdmin(null);
        }
      } catch (err) {
        console.error("AUTH VERIFY ERROR:", err);
      }
    };

    fetchAdmin();
  }, [API_URL_BASE]);

  const handleLogout = () => {
    localStorage.removeItem("vitalimes_token");
    setAdmin(null);
    navigate("/login");
  };

  return (
    <nav className="admin-topbar">
      <div className="admin-nav-inner">
        {/* Logo */}
        <Link to="/admin/dashboard" className="admin-logo">
          <img src="/assets/images/vita_logo.svg" alt="Vitalimes" />
        </Link>

        {/* Navigation */}
        <ul className="admin-pill-menu">
          <li>
            <NavLink to="/admin/dashboard" className="admin-pill">
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
              className="admin-pill bg-transparent border-0"
              onClick={() => {
                sessionStorage.setItem("from_admin", "true");
                navigate("/");
              }}
            >
              Home
            </button>
          </li>
          <li>
            <NavLink to="/admin/products" className="admin-pill">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories" className="admin-pill">
              Categories
            </NavLink>
          </li>

          
            
              <li>
                <NavLink  to="/orders/list" className="admin-pill">
                  Order List
                </NavLink>
              </li>
              <li>
                <NavLink  to="/orders/details" className="admin-pill">
                  Invoice
                </NavLink>
              </li>
          

          {admin?.role === "ADMIN" && (
            <li className="dropdown">
              
              
                <li>
                  <NavLink  to="/admin/users" className="admin-pill">
                    Users
                  </NavLink>
                </li>
                
             
            </li>
          )}

          {/* Admin Profile */}
          <li className="dropdown ms-auto">
            {admin ? (
              <>
                <button
                  className="admin-pill dropdown-toggle border-0 bg-transparent"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  {admin.name || "Admin"}{" "}
                  <span className="badge bg-light text-dark ms-1">
                    {admin.role || "ADMIN"}
                  </span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow rounded-4">
                  <li className="px-3 py-2 small text-muted">
                    <div className="fw-semibold">{admin.name || "Admin User"}</div>
                    <div className="text-break">{admin.email}</div>
                    <div className="text-uppercase mt-1">
                      Role:{" "}
                      <span className="badge bg-warning text-dark">
                        {admin.role || "ADMIN"}
                      </span>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Log Out
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <button
                className="admin-pill border-0 bg-transparent"
                type="button"
                onClick={() => navigate("/login")}
              >
                Admin Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

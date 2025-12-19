// src/components/admin/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function AdminProtectedRoute({ children, allowedRoles = ["admin", "staff"] }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("vitalimes_token");
    if (!token) {
      setChecking(false);
      setAllowed(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(`${API_URL_BASE}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const valid = res.data?.valid;
        const role = res.data?.admin?.role?.toLowerCase();

        if (valid && allowedRoles.includes(role)) {
          localStorage.setItem("vitalimes_role", role);
          localStorage.setItem("vitalimes_name", res.data.admin.name || "");
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch (err) {
        console.error("ADMIN VERIFY ERROR:", err);
        setAllowed(false);
      } finally {
        setChecking(false);
      }
    };

    verify();
  }, [allowedRoles]);

  if (checking) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <span className="text-muted small">Checking permission…</span>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


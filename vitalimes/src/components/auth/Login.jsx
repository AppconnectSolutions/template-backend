// src/components/auth/Login.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL_BASE =
    (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

  // 🔐 If already logged in, just verify token and set role
  useEffect(() => {
  const token = localStorage.getItem("vitalimes_token");
  if (!token) return;

  const verifyToken = async () => {
    try {
      const res = await axios.get(`${API_URL_BASE}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.valid) {
        const role = res.data.admin?.role?.toLowerCase() || "user";
        localStorage.setItem("vitalimes_role", role);

        // 🔀 Redirect based on role
        if (role === "admin" || role === "staff") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/products", { replace: true });
        }
      } else {
        localStorage.removeItem("vitalimes_token");
        localStorage.removeItem("vitalimes_role");
      }
    } catch (err) {
      console.error("VERIFY ERROR:", err);
    }
  };

  verifyToken();
}, [API_URL_BASE, navigate]);

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = `${API_URL_BASE}/api/auth/login`;
      const res = await axios.post(url, { email, password });

      if (!res.data || !res.data.success) {
        setError(res.data?.message || "Invalid credentials");
        return;
      }

      if (!res.data.token) {
        setError("Login succeeded but no token returned from server.");
        return;
      }

      // ✅ Persist token and role
      localStorage.setItem("vitalimes_token", res.data.token);
      const role = res.data.admin?.role || "USER";
      localStorage.setItem("vitalimes_role", role.toLowerCase());

      // 🔀 Redirect based on role
      if (role.toLowerCase() === "admin" || role.toLowerCase() === "staff") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/admin/dashboard", { replace: true }); // normal user route
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Server error. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #fff7d1 0%, #ffe28a 40%, #ffd35a 75%, #ffc107 100%)",
      }}
    >
      <div
        className="shadow-lg rounded-4 p-4 p-md-5"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
        }}
      >

        <div className="mb-3">
  <button
    className="btn btn-sm fw-semibold text-white"
    style={{ backgroundColor: "#2e7d32", borderColor: "#2e7d32" }}
    onClick={() => navigate("/")}
  >
    ← Back to Home
  </button>
</div>
        {/* Logo + Title */}
        <div className="text-center mb-4">
          <img
            src="/assets/images/vita_logo.svg"
            alt="Vitalimes"
            style={{ width: "80px", height: "auto", marginBottom: "8px" }}
          />
          <h3 className="fw-bold mb-1">Login</h3>
          <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
            Sign in to continue to Vitalimes
          </p>
        </div>

        {/* Error message */}
        {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}

        {/* Form */}
        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                defaultChecked
              />
              <label className="form-check-label small" htmlFor="rememberMe">
                Remember me on this device
              </label>
            </div>
            <span className="small text-primary" style={{ cursor: "pointer" }}>
              Forgot password?
            </span>
          </div>

          <button
            className="btn btn-warning w-100 fw-semibold mb-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Sign up link */}
        <div className="text-center mt-2">
          <span className="small text-muted">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primary fw-semibold">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}


// src/components/auth/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL_BASE =
    (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
      /\/+$/,
      ""
    );

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // ✅ Backend endpoint we implemented: POST /api/auth/signup
      const res = await axios.post(`${API_URL_BASE}/api/auth/signup`, {
        name,
        email,
        password,
        // optional: you can send role: "USER" | "STAFF" | "ADMIN"
        // role: "USER",
      });

      if (!res.data || !res.data.success) {
        setError(res.data?.message || "Signup failed");
        return;
      }

      setSuccessMsg("Account created successfully. You can now login.");

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error("SIGNUP ERROR:", err);
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
        {/* Logo + Title */}
        <div className="text-center mb-4">
          <img
            src="/assets/images/vita_logo.svg"
            alt="Vitalimes"
            style={{ width: "80px", height: "auto", marginBottom: "8px" }}
          />
          <h3 className="fw-bold mb-1">Create Account</h3>
          <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
            Join Vitalimes to manage your orders & wishlist
          </p>
        </div>

        {/* Error / Success */}
        {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}
        {successMsg && (
          <div className="alert alert-success py-2 mb-3">{successMsg}</div>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            className="btn btn-warning w-100 fw-semibold mb-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-2">
          <span className="small text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

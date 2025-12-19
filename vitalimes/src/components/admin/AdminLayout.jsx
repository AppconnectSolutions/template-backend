import React from "react";
import AdminTopNavbar from "./AdminTopNavbar.jsx";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div
      className="w-100"
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #fff9d6, #ffe9a6)",
      }}
    >
      {/* FULL WIDTH NAVBAR */}
      <AdminTopNavbar />

      {/* FULL WIDTH PAGE CONTENT */}
      <div
        style={{
          width: "100%",
          margin: 0,
          padding: "20px 30px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

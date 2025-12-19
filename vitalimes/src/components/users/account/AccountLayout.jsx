import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <div className="container my-5">

      <div className="row">

        {/* -------- LEFT SIDEBAR (NOT FIXED) -------- */}
        <div className="col-12 col-md-3 mb-4">
          <Sidebar />
        </div>

        {/* -------- RIGHT CONTENT -------- */}
        <div className="col-12 col-md-9">
          <Outlet />
        </div>

      </div>

      <style>
        {`
          /* Sidebar box styling */
          .sidebar-wrapper {
            border-right: none !important;
            height: auto !important;
            position: relative !important;
            top: 0 !important;
          }

          /* Content styling */
          .account-content {
            padding: 20px;
            background: #fff;
            min-height: 400px;
          }

          /* Mobile adjustments */
          @media (max-width: 768px) {
            .account-content {
              margin-top: 20px;
            }
          }
        `}
      </style>

    </div>
  );
}

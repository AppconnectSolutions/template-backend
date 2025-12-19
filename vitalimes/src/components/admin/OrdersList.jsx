import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Load all orders
  const loadOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders/all`);
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Update order status
  const updateStatus = async (order_no, newStatus) => {
    try {
      await axios.post(`${API_URL}/api/orders/update-status`, {
        order_no,
        status: newStatus,
      });
      loadOrders();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // PRODUCT FORMATTER
  const getProductDetails = (products_json) => {
    if (!products_json) return "-";

    try {
      const items = JSON.parse(products_json);

      return items
        .map((p) => {
          const title = p.title || "Product";
          const weight = p.weight ? `${p.weight}g` : "";
          const units = p.units ? `${p.units} pack` : "";
          const qty = p.qty ? `Qty: ${p.qty}` : "";

          return [title, weight, units, qty].filter(Boolean).join(" | ");
        })
        .join("\n");
    } catch {
      return "-";
    }
  };

  const getFullAddress = (o) =>
    `${o.address}, ${o.city}, ${o.state}, ${o.country} - ${o.pin}`;

  return (
    <div
      className="w-100 py-4"
      style={{
        minHeight: "100vh",
        padding: "0 35px",
        background:
          "linear-gradient(to bottom, #fff7d1 0%, #ffe9a1 40%, #ffd873 100%)",
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Orders</h2>
      </div>

      {/* MAIN CARD */}
      <div
        className="card border-0 mx-auto"
        style={{
          width: "100%",
          borderRadius: "22px",
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Order No</th>
                  <th>Invoice No</th>
                  <th>Name</th>
                  <th>Products</th>
                  <th>Address</th>
                  <th>Mobile</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                  <th>Prepare</th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.order_no}</td>
                      <td>{o.invoice_no || "-"}</td>
                      <td>{o.name}</td>

                      {/* PRODUCTS */}
                      <td style={{ whiteSpace: "pre-wrap", maxWidth: "250px" }}>
                        {getProductDetails(o.products_json)}
                      </td>

                      {/* ADDRESS */}
                      <td style={{ whiteSpace: "pre-wrap" }}>
                        {getFullAddress(o)}
                      </td>

                      <td>{o.mobile}</td>
                      <td>₹{o.total_amount}</td>

                      <td>
                        <span className="badge bg-secondary">
                          {o.payment_status}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            o.status === "PENDING"
                              ? "bg-warning text-dark"
                              : o.status === "PROCESSING"
                              ? "bg-info text-dark"
                              : o.status === "SHIPPED"
                              ? "bg-primary"
                              : o.status === "DELIVERED"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>

                      <td>{o.order_date}</td>

                      {/* STATUS DROPDOWN */}
                      <td>
                        <select
                          className="form-select"
                          style={{ width: "140px" }}
                          value={o.status}
                          onChange={(e) =>
                            updateStatus(o.order_no, e.target.value)
                          }
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>

                      {/* PREPARE SHIPMENT */}
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm rounded-pill px-3"
                          onClick={() =>
                            (window.location.href = `/prepare-shipment/${o.order_no}`)
                          }
                        >
                          Prepare
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center py-4">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <span className="fw-semibold">
              Showing {orders.length} orders
            </span>

            <span className="text-muted small">
              *Sorted by latest orders
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

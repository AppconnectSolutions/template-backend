import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PrepareShipment() {
  const { order_no } = useParams();

  const [order, setOrder] = useState(null);

  // FORM DATA FOR ADMIN INPUT
  const [form, setForm] = useState({
    waybill: "",
    weight: "",
    shipment_length: "",
    shipment_breadth: "",
    shipment_height: "",
    payment_mode: "Pre-paid",
    cod_amount: "",
    products_desc: "",
    shipping_mode: "S",
    fragile_item: "false",
  });

  // ================================
  // 1️⃣ LOAD ORDER DETAILS ONLY
  // ================================
  const loadOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/get/${order_no}`,
        { headers: { "Cache-Control": "no-cache" } }
      );

      if (res.data.success) {
        setOrder(res.data.order);
      } else {
        alert("Order not found");
      }
    } catch (err) {
      console.error("Order loading error:", err);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  // ================================
  // 2️⃣ HANDLE INPUT CHANGE
  // ================================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================================
  // 3️⃣ SAVE SHIPMENT DETAILS
  // ================================
  const saveShipment = async () => {
    try {
      const payload = {
        order_no: order.order_no,

        // customer data stored for shipment
        name: order.name,
        city: order.city,
        state: order.state,
        country: order.country,
        address: order.address,
        pin: order.pin,
        phone: order.phone,
        mobile: order.mobile,
        quantity: order.quantity,
        total_amount: order.total_amount,
        order_date: order.order_date,

        // admin-input fields
        ...form,
      };

      const res = await axios.post(
        "http://localhost:5000/api/shipments/create",
        payload
      );

      if (res.data.success) {
        alert("Shipment details saved successfully!");
        window.location.href = `/order-details/${order.order_no}`;

      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save shipment");
    }
  };

  if (!order) return <h3 className="text-center mt-5">Loading Order...</h3>;

  // ================================
  // 4️⃣ UI RENDER
  // ================================
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        Prepare Shipment – {order.order_no}
      </h2>

      {/* CUSTOMER DETAILS (AUTO FILLED) */}
      <div className="card mb-4 p-3">
        <h5>Customer Details</h5>
        <p><b>Name:</b> {order.name}</p>
        <p><b>Address:</b> {order.address}</p>
        <p><b>City:</b> {order.city}</p>
        <p><b>State:</b> {order.state}</p>
        <p><b>Country:</b> {order.country}</p>
        <p><b>Pin:</b> {order.pin}</p>
        <p><b>Phone:</b> {order.phone}</p>
        <p><b>Mobile:</b> {order.mobile}</p>
        <p><b>Products:</b> {order.products}</p>
        <p><b>Quantity:</b> {order.quantity}</p>
        <p><b>Amount:</b> ₹{order.total_amount}</p>
        <p><b>Order Date:</b> {order.order_date}</p>
      </div>

      {/* SHIPMENT ENTRY FORM */}
      <div className="card p-4">
        <h5>Shipment Details</h5>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Waybill (Optional)</label>
            <input
              name="waybill"
              className="form-control"
              value={form.waybill}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Weight (gm)</label>
            <input
              name="weight"
              className="form-control"
              value={form.weight}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Length (cm)</label>
            <input
              name="shipment_length"
              className="form-control"
              value={form.shipment_length}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Breadth (cm)</label>
            <input
              name="shipment_breadth"
              className="form-control"
              value={form.shipment_breadth}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Height (cm)</label>
            <input
              name="shipment_height"
              className="form-control"
              value={form.shipment_height}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Payment Mode</label>
            <select
              name="payment_mode"
              className="form-select"
              value={form.payment_mode}
              onChange={handleChange}
            >
              <option value="Pre-paid">Pre-paid</option>
              <option value="COD">COD</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>COD Amount</label>
            <input
              name="cod_amount"
              className="form-control"
              value={form.cod_amount}
              onChange={handleChange}
              disabled={form.payment_mode !== "COD"}
            />
          </div>

          <div className="col-md-8 mb-3">
            <label>Product Description</label>
            <textarea
              name="products_desc"
              className="form-control"
              value={form.products_desc}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Shipping Mode</label>
            <select
              name="shipping_mode"
              className="form-select"
              value={form.shipping_mode}
              onChange={handleChange}
            >
              <option value="S">Surface</option>
              <option value="E">Express</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Fragile Item</label>
            <select
              name="fragile_item"
              className="form-select"
              value={form.fragile_item}
              onChange={handleChange}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>

        <button className="btn btn-success mt-3" onClick={saveShipment}>
          Save Shipment
        </button>
      </div>
    </div>
  );
}

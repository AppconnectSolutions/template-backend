import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const today = new Date().toISOString().split("T")[0];

  const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
  ];

  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    country: "India",
    address: "",
    pin: "",
    email: "",
    mobile: "",
    quantity: 0,
    total_amount: 0,
    order_date: today,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

    setForm((prev) => ({
      ...prev,
      quantity: totalQty,
      total_amount: getSubtotal(),
    }));
  }, [cart, getSubtotal]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.country) newErrors.country = "Country is required";

    if (!/^\d{6}$/.test(form.pin)) newErrors.pin = "PIN must be 6 digits";

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "Mobile must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // 🔥 SUBMIT HANDLER — guest + logged-in both allowed
  // ======================================================
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // read user *now* (might be null for guest)
      const user = JSON.parse(localStorage.getItem("vitalimes_user") || "null");
      const user_id = user?.id || null;

      // ✅ Prepare product JSON with title + weight + units + qty
      const productPayload = cart.map((p) => ({
        id: p.id,
        title: p.title,
        weight: p.weight,
        units: p.units,
        qty: p.qty,
        price: p.price,
        sale_price: p.sale_price || p.price,
        img: p.img,
      }));

      // ⭐ 1️⃣ Save order as PENDING (user_id may be null for guest)
      const pendingRes = await axios.post(
        `${API_URL}/api/orders/create-order-pending`,
        {
          user_id,
          ...form,
          products: productPayload,
        }
      );

      if (!pendingRes.data.success) {
        alert(pendingRes.data.error || "Error saving order");
        return;
      }

      const order_no = pendingRes.data.order_no;

      // ⭐ 2️⃣ Create Razorpay order
      const res = await axios.post(
        `${API_URL}/api/payment/create-payment`,
        { amount: form.total_amount }
      );

      if (!res.data.success) {
        alert("Payment server error.");
        return;
      }

      const { order, key } = res.data;

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Vitalimes",
        description: "Order Payment",
        order_id: order.id,

        // ⭐ 3️⃣ After payment success → update DB
        handler: async function (response) {
          try {
            await axios.post(
              `${API_URL}/api/orders/update-payment`,
              {
                order_no: order_no,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              }
            );

            clearCart();
            navigate("/products");
          } catch (err) {
            console.error("Payment update error:", err);
            alert("Payment updated but order sync failed. Please contact support.");
          }
        },

        prefill: {
          name: form.name,
          contact: form.mobile,
          email: form.email || undefined,
        },

        theme: { color: "#5C3A1E" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Checkout</h2>

      <div className="row">
        {/* LEFT FORM */}
        <div className="col-md-7">
          <div className="p-4 border rounded bg-white shadow-sm">
            <h4 className="fw-bold mb-3">Customer Details</h4>

            {errors.name && <p className="text-danger">{errors.name}</p>}
            <label className="form-label">Name *</label>
            <input
              name="name"
              className="form-control mb-3"
              value={form.name}
              onChange={handleChange}
            />

            {errors.address && <p className="text-danger">{errors.address}</p>}
            <label className="form-label">Address *</label>
            <textarea
              name="address"
              className="form-control mb-3"
              rows="2"
              value={form.address}
              onChange={handleChange}
            />

            <div className="row">
              <div className="col-md-4">
                {errors.city && <p className="text-danger">{errors.city}</p>}
                <label className="form-label">City *</label>
                <input
                  name="city"
                  className="form-control mb-3"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                {errors.state && <p className="text-danger">{errors.state}</p>}
                <label className="form-label">State *</label>
                <select
                  name="state"
                  className="form-select mb-3"
                  value={form.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Country *</label>
                <input
                  name="country"
                  className="form-control mb-3"
                  value={form.country}
                  readOnly
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                {errors.pin && <p className="text-danger">{errors.pin}</p>}
                <label className="form-label">PIN *</label>
                <input
                  name="pin"
                  className="form-control mb-3"
                  value={form.pin}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                {errors.email && <p className="text-danger">{errors.email}</p>}
                <label className="form-label">Email (Optional)</label>
                <input
                  name="email"
                  className="form-control mb-3"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                {errors.mobile && (
                  <p className="text-danger">{errors.mobile}</p>
                )}
                <label className="form-label">Mobile *</label>
                <input
                  name="mobile"
                  className="form-control mb-3"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h4 className="fw-bold mt-4 mb-3">Order Summary</h4>

            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Quantity</label>
                <input
                  className="form-control mb-3"
                  value={form.quantity}
                  readOnly
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Total Amount</label>
                <input
                  className="form-control mb-3"
                  value={"₹" + form.total_amount}
                  readOnly
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Order Date</label>
                <input
                  type="date"
                  name="order_date"
                  className="form-control mb-3"
                  value={form.order_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="btn w-100 py-3"
              style={{
                background: "#5C3A1E",
                color: "white",
                fontSize: "18px",
              }}
              onClick={handleSubmit}
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE ORDER SUMMARY */}
        <div className="col-md-5 mt-4 mt-md-0">
          <div className="p-4 border rounded bg-white shadow-sm">
            <h4 className="fw-bold mb-3">Your Order</h4>

            {cart.map((item) => (
              <div
                key={item.id + "-" + (item.weight || "")}
                className="d-flex mb-3 pb-3 border-bottom"
              >
                <img
                  src={item.img}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <div className="ms-3">
                  <h6 className="fw-bold">{item.title}</h6>
                  {item.weight && (
                    <p className="text-muted mb-1">Size: {item.weight}</p>
                  )}
                  <p className="text-muted mb-1">
                    ₹{item.price} × {item.qty}
                  </p>
                  <p className="fw-bold">₹{item.price * item.qty}</p>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>₹{getSubtotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

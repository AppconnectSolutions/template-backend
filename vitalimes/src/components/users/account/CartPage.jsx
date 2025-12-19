import React from "react";
import { useCart } from "../CartContext.jsx";

import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, getSubtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty 😕</h4>
          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="row">
          {/* ================= LEFT SIDE - CART ITEMS ================= */}
          <div className="col-lg-8">
            <div className="card p-3 shadow-sm">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center border-bottom pb-3 mb-3"
                >
                  {/* PRODUCT IMAGE */}
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  {/* PRODUCT DETAILS */}
                  <div className="ms-3 flex-grow-1">
                    <h5 className="fw-bold mb-1">{item.title}</h5>
                    <p className="text-muted mb-1">Weight: {item.weight}</p>
                    <h6 className="fw-bold">₹{item.price}</h6>

                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-sm btn-dark"
                        onClick={() =>
                          updateQty(item.id, item.weight, item.qty - 1)
                        }
                      >
                        -
                      </button>

                      <span className="mx-3">{item.qty}</span>

                      <button
                        className="btn btn-sm btn-dark"
                        onClick={() =>
                          updateQty(item.id, item.weight, item.qty + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.id, item.weight)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ================== RIGHT SIDE - SUMMARY ================== */}
          <div className="col-lg-4">
            <div className="card p-4 shadow-sm">
              <h4 className="fw-bold mb-3">Order Summary</h4>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>₹{getSubtotal().toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <strong className="text-success">Free</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <h5>Total</h5>
                <h5 className="fw-bold">₹{getSubtotal().toFixed(2)}</h5>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                className="btn btn-warning w-100 py-3 fw-bold"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

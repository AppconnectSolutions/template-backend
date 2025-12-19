import React from "react";
import { useCart } from "../CartContext";

export default function CartSidebar() {
  const {
    cart,
    cartOpen,
    closeCart,
    removeFromCart,
    updateQty,
    getTotalItems,
    getSubtotal,
  } = useCart();

  return (
    <div
      className="position-fixed top-0 bg-white shadow"
      style={{
        right: cartOpen ? 0 : "-420px",
        width: "420px",
        height: "100vh",
        zIndex: 2000,
        transition: "right 250ms ease",
        padding: "1rem",
        overflowY: "auto",
        borderLeft: "1px solid #dee2e6",
      }}
    >

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h5 className="fw-bold mb-0">Your Cart ({getTotalItems()})</h5>
        <button className="btn btn-sm btn-outline-dark" onClick={closeCart}>
          <i className="bi bi-x-lg"></i> ✕
        </button>
      </div>

      {/* Empty Cart */}
      {cart.length === 0 && (
        <div className="text-center text-muted mt-5">Your cart is empty</div>
      )}

      {/* Cart Items */}
      {cart.map((item) => (
        <div
          key={item.id}
          className="d-flex gap-3 border-bottom pb-3 mb-3"
        >
          <img
            src={item.img}
            alt={item.title}
            className="rounded"
            style={{ width: "70px", height: "70px", objectFit: "cover" }}
          />

          <div className="flex-grow-1">
            {/* Title + Price Row */}
            <div className="d-flex justify-content-between">
              <strong className="small">{item.title}</strong>
              <strong>₹{(item.price * item.qty).toFixed(2)}</strong>
            </div>

            {/* Small MRP row */}
            <div className="small text-muted">
              ₹{item.price} × {item.qty}
            </div>

            {/* Qty Buttons */}
            <div className="mt-2 d-flex align-items-center gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => updateQty(item.id, item.qty - 1)}
              >
                -
              </button>

              <span className="fw-bold">{item.qty}</span>

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => updateQty(item.id, item.qty + 1)}
              >
                +
              </button>

              <button
                className="btn btn-sm btn-link text-danger ms-auto"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Subtotal */}
      {cart.length > 0 && (
        <>
          <div className="p-3 bg-light border rounded mb-3">
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Total:</span>
              <span className="fw-bold">₹{getSubtotal().toFixed(2)}</span>
            </div>
            <small className="text-muted">
              Taxes & shipping calculated at checkout
            </small>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2">
            <button className="btn btn-success btn-lg fw-semibold">
              Proceed to Checkout
            </button>

            <button className="btn btn-outline-dark fw-semibold">
              View Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

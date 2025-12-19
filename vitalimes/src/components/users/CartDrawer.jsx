import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQty,
    getSubtotal,
    cartOpen,
    closeCart,
    addToCart,
  } = useCart();

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [recommend, setRecommend] = useState([]);
  const [canvasInstance, setCanvasInstance] = useState(null);

  /* ================= LOAD RECOMMENDED PRODUCTS ================= */
  useEffect(() => {
    loadRecommended();
  }, []);

  const loadRecommended = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/products?status=Active&limit=6`
      );
      console.log("Recommended:", res.data);
      setRecommend(res.data.products || []);
    } catch (err) {
      console.error("Failed to load recommended products", err);
      setRecommend([]);
    }
  };

  /* ================= OPEN OFFCANVAS AUTOMATICALLY ================ */
  useEffect(() => {
  const drawer = document.getElementById("cartDrawer");

  if (drawer && !canvasInstance) {
    const instance = new window.bootstrap.Offcanvas(drawer);
    setCanvasInstance(instance);
  }
}, []);

useEffect(() => {
  if (canvasInstance) {
    if (cartOpen) {
      canvasInstance.show();
    } else {
      canvasInstance.hide();
    }
  }
}, [cartOpen, canvasInstance]);

  /* ========== INLINE CSS FOR LOVE-THIS-TOO SECTION ========== */
  const recommendCardStyle = {
    display: "flex",
    gap: "12px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    alignItems: "center",
    minHeight: "90px",
  };

  const recommendImgStyle = {
    width: "65px",
    height: "65px",
    borderRadius: "6px",
    objectFit: "cover",
  };

  const priceStyle = {
    color: "#5C3A1E",
    fontWeight: "600",
  };

  const addBtnStyle = {
    background: "#5C3A1E",
    color: "white",
    width: "30px",
    height: "30px",
    borderRadius: "5px",
    fontWeight: "bold",
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      id="cartDrawer"
      tabIndex="-1"
      aria-labelledby="cartDrawerLabel"
      style={{ width: "100%", maxWidth: "600px" }}
    >
      {/* ================= HEADER ================= */}
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title fw-bold">Your Cart ({cart.length})</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={closeCart}
        ></button>
      </div>

      {/* ================= BODY ================= */}
      <div className="offcanvas-body d-flex flex-column flex-md-row gap-4">
        {/* ======== CART ITEMS (LEFT) ======== */}
        <div className="flex-grow-1 w-100">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.weight}`}
              className="d-flex gap-3 border-bottom pb-3 mb-4"
            >
              <img
                src={item.img}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between mb-1">
                  <strong className="small">{item.title}</strong>
                  <strong>₹{(item.price * item.qty).toFixed(2)}</strong>
                </div>

                <small className="text-muted">
                  ₹{item.price} × {item.qty}
                </small>

                <div className="d-flex align-items-center gap-2 mt-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      updateQty(item.id, item.weight, item.qty - 1)
                    }
                  >
                    -
                  </button>

                  <strong>{item.qty}</strong>

                  <button
                    className="btn btn-sm fw-bold"
                    style={{
                      background: "#5C3A1E",
                      color: "white",
                      width: "32px",
                      height: "32px",
                      borderRadius: "5px",
                    }}
                    onClick={() =>
                      updateQty(item.id, item.weight, item.qty + 1)
                    }
                  >
                    +
                  </button>

                  <button
                    className="btn btn-sm text-danger ms-auto"
                    onClick={() => removeFromCart(item.id, item.weight)}
                  >
                    <i className="bi bi-trash fs-5"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* ========== TOTAL BOX & CHECKOUT ========== */}
          {cart.length > 0 && (
            <>
              <div className="p-3 bg-light border rounded mb-4">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold">
                    ₹{getSubtotal().toFixed(2)}
                  </span>
                </div>
                <small className="text-muted">
                  Taxes & shipping calculated at checkout
                </small>
              </div>

              <button
                className="btn fw-semibold py-2 w-100 mb-3"
                style={{ background: "#5C3A1E", color: "white", fontSize: "17px" }}
                onClick={() => {
                  try {
                    const el = document.getElementById("cartDrawer");
                    if (el) {
                      const offcanvas =
                        window.bootstrap.Offcanvas.getInstance(el) ||
                        new window.bootstrap.Offcanvas(el);
                      offcanvas.hide();
                    }

                    closeCart();

                    setTimeout(() => navigate("/checkout"), 350);
                  } catch {
                    navigate("/checkout");
                  }
                }}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>

        {/* ======== YOU'LL LOVE THIS TOO ======== */}
        <div className="w-100 w-md-50">
          <h6 className="fw-bold mb-3">You'll love this too</h6>

          <div className="d-flex flex-column gap-3">
            {recommend.length > 0 ? (
              recommend.map((p) => {
                // Price fetching logic: check variants for price or sale price
                const validPrice = p.variants?.length > 0 
                  ? p.variants[0].sale_price || p.variants[0].price 
                  : 0; // Use sale_price or price, fallback to 0 if both are missing

                return (
                  <div key={p.id} style={recommendCardStyle}>
                    <img
                      src={`${API_URL}/uploads/${p.image1 || "default_image.png"}`}
                      alt={p.title}
                      style={recommendImgStyle}
                    />

                    <div className="flex-grow-1">
                      <div className="small fw-semibold">{p.title}</div>

                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <span style={priceStyle}>
                          ₹{validPrice > 0 ? validPrice : "Price Not Available"}
                        </span>

                        <button
  className="btn btn-sm"
  style={addBtnStyle}
  onClick={() =>
    addToCart(
      {
        id: p.id,
        title: p.title,
        price: validPrice,
        img: `${API_URL}/uploads/${p.image1}`,
        weight: p.variants?.[0]?.weight || "1unit", // Provide default weight
      },
      1,
      { openCart: true } // optional, to control cart drawer opening
    )
  }
>
  +
</button>

                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


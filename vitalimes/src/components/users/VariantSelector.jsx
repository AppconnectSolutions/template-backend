
// src/components/product/VariantSelector.jsx
import React from "react";
import "./variant.css";

export default function VariantSelector({ variants, selected, onSelect }) {
  return (
    <div className="variant-container">
      {variants.map((v, idx) => {
        const offer =
          v.price > v.sale_price
            ? (((v.price - v.sale_price) / v.price) * 100).toFixed(0)
            : 0;

        return (
          <button
            key={idx}
            className={`variant-box ${selected === idx ? "active" : ""}`}
            onClick={() => onSelect(idx)}
          >
            <div className="variant-weight">{v.weight}</div>

            <div className="variant-price">
              {v.price !== v.sale_price && (
                <span className="mrp">₹{v.price}</span>
              )}
              <span className="sale">₹{v.sale_price}</span>
            </div>

            {offer > 0 && <div className="offer-badge">{offer}% OFF</div>}
          </button>
        );
      })}
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("vitalimes_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("vitalimes_cart", JSON.stringify(cart));
  }, [cart]);

  /* ===========================
       ADD TO CART
     =========================== */
  const addToCart = (product, qty = 1, options = { openCart: true }) => {
  setCart(prev => {
    const exist = prev.find(p => p.id === product.id && p.weight === product.weight);

    if (exist) {
      return prev.map(p =>
        p.id === product.id && p.weight === product.weight
          ? { ...p, qty: p.qty + qty }
          : p
      );
    }

    return [...prev, { ...product, qty }];
  });

  // Only open cart if options.openCart is true
  if (options.openCart) {
    setCartOpen(true);
  }
};


  /* ===========================
       REMOVE ITEM
     =========================== */
  const removeFromCart = (id, weight) => {
    setCart(prev => prev.filter(p => !(p.id === id && p.weight === weight)));
  };

  /* ===========================
       UPDATE QTY
     =========================== */
  const updateQty = (id, weight, qty) => {
    if (qty <= 0) return removeFromCart(id, weight);

    setCart(prev =>
      prev.map(p =>
        p.id === id && p.weight === weight ? { ...p, qty } : p
      )
    );
  };

  /* ===========================
       CLEAR CART
     =========================== */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("vitalimes_cart");
  };

  const getTotalItems = () => cart.reduce((sum, p) => sum + (p.qty || 0), 0);

  const getSubtotal = () =>
    cart.reduce((sum, p) => sum + (p.price || 0) * (p.qty || 0), 0);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        getTotalItems,
        getSubtotal,
        cartOpen,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);


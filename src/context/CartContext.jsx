import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(
        (p) =>
          p.id === product.id &&
          p.selectedSize?.id === product.selectedSize?.id &&
          p.selectedColor?.id === product.selectedColor?.id
      );

      if (exists) {
        return prev.map((p) =>
          p.id === product.id &&
            p.selectedSize?.id === product.selectedSize?.id &&
            p.selectedColor?.id === product.selectedColor?.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, sizeId, colorId) => {
    setCart((prev) =>
      prev.filter(
        (p) =>
          !(
            p.id === id &&
            p.selectedSize?.id === sizeId &&
            p.selectedColor?.id === colorId
          )
      )
    );
  };

  const updateQuantity = (id, sizeId, colorId, qty) => {
    if (qty < 1) return;

    setCart((prev) =>
      prev.map((p) =>
        p.id === id &&
          p.selectedSize?.id === sizeId &&
          p.selectedColor?.id === colorId
          ? { ...p, quantity: qty }
          : p
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
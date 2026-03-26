import React, { createContext, useContext, useState, useCallback } from "react";
import type { MenuItem } from "@/data/menuData";
import type { Restaurant } from "@/data/restaurants";

export type CartItem = MenuItem & { quantity: number };

type CartContextType = {
  items: CartItem[];
  restaurant: Restaurant | null;
  setRestaurant: (r: Restaurant | null) => void;
  addItem: (item: MenuItem, restaurant: Restaurant) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  const addItem = useCallback((item: MenuItem, fromRestaurant: Restaurant) => {
    setRestaurant((prev) => {
      // If switching restaurants, clear cart
      if (prev && prev.id !== fromRestaurant.id) {
        setItems([{ ...item, quantity: 1 }]);
        return fromRestaurant;
      }
      if (!prev) return fromRestaurant;
      return prev;
    });

    setItems((prev) => {
      // If restaurant changed, this was already handled above
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      if (next.length === 0) setRestaurant(null);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== id);
        if (next.length === 0) setRestaurant(null);
        return next;
      });
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setRestaurant(null);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, restaurant, setRestaurant, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

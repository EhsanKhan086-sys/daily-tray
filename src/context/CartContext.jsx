import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "daily-tray:cart:v1";
export const MAX_PER_ITEM = 10;

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * One source of truth for the cart. The header badge, item page,
 * menu bar and cart screen all read from here, so they can't disagree.
 */
export function CartProvider({ children }) {
  const [lines, setLines] = useState(readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable: the cart still works for this session */
    }
  }, [lines]);

  const addItem = useCallback((item, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.id === item.id ? { ...l, qty: Math.min(l.qty + qty, MAX_PER_ITEM) } : l
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          tone: item.tone,
          qty: Math.min(qty, MAX_PER_ITEM),
        },
      ];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_PER_ITEM) } : l))
    );
  }, []);

  const removeItem = useCallback((id) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const clearCart = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const total = lines.reduce((sum, l) => sum + l.qty * l.price, 0);
    const qtyOf = (id) => lines.find((l) => l.id === id)?.qty ?? 0;
    return { lines, count, total, qtyOf, addItem, setQty, removeItem, clearCart };
  }, [lines, addItem, setQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

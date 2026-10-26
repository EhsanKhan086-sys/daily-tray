import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../components/Cart.jsx";
import DataGate from "../components/DataGate.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useMenu } from "../context/MenuContext.jsx";
import { formatPrice, plural } from "../utils/format.js";

function Receipt({ order, currency }) {
  return (
    <section className="receipt" aria-labelledby="receipt-h">
      <div className="receipt__ticket">
        <p className="receipt__label">Your token number</p>
        <p className="receipt__token" aria-label={`Token ${order.token}`}>{order.token}</p>
        <div className="ticket__tear" aria-hidden="true" />
        <p className="receipt__line">{order.count} {plural(order.count, "item", "items")}, {formatPrice(order.total, currency)}</p>
        <p className="receipt__line">Pickup: {order.slot}</p>
        {order.note && <p className="receipt__line">Note: {order.note}</p>}
      </div>
      <h1 id="receipt-h">Order placed</h1>
      <p>Show this token at the counter and pay when you collect your tray.</p>
      <Link to="/" className="btn btn--primary">Order something else</Link>
    </section>
  );
}

function CartContent() {
  const { lines, count, total, setQty, removeItem, clearCart } = useCart();
  const { currency } = useMenu();
  const [order, setOrder] = useState(null);

  function checkout({ slot, note }) {
    const token = `T-${Math.floor(100 + Math.random() * 900)}`;
    setOrder({ token, slot, note: note.trim(), count, total });
    clearCart();
  }

  if (order) return <Receipt order={order} currency={currency} />;

  if (lines.length === 0) {
    return (
      <div className="notice">
        <h1>Your tray is empty</h1>
        <p>Add a dish from today's menu and it will show up here.</p>
        <Link to="/" className="btn btn--primary">Browse the menu</Link>
      </div>
    );
  }

  return (
    <Cart
      lines={lines}
      count={count}
      total={total}
      currency={currency}
      onQty={setQty}
      onRemove={removeItem}
      onClear={clearCart}
      onCheckout={checkout}
    />
  );
}

export default function CartPage() {
  return (
    <DataGate>
      <CartContent />
    </DataGate>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import QtyStepper from "./QtyStepper.jsx";
import { TrashIcon } from "./Icons.jsx";
import { formatPrice, plural } from "../utils/format.js";

const SLOTS = ["As soon as ready (about 10 min)", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm"];

export default function Cart({ lines, count, total, currency, onQty, onRemove, onClear, onCheckout }) {
  const [slot, setSlot] = useState(SLOTS[0]);
  const [note, setNote] = useState("");

  return (
    <div className="cart">
      <section className="cart__lines" aria-labelledby="cart-heading">
        <div className="cart__head">
          <h1 id="cart-heading">Your tray</h1>
          <button type="button" className="link-btn" onClick={onClear}>Empty tray</button>
        </div>

        <ul className="lines">
          {lines.map((line) => (
            <li className="line" key={line.id} style={{ "--tone": line.tone }}>
              <Link to={`/item/${line.id}`} className="line__thumb" aria-label={`View ${line.name}`}>
                <span aria-hidden="true">{line.emoji}</span>
              </Link>
              <div className="line__info">
                <Link to={`/item/${line.id}`} className="line__name">{line.name}</Link>
                <span className="line__unit">{formatPrice(line.price, currency)} each</span>
              </div>
              <QtyStepper
                value={line.qty}
                min={1}
                label={`Quantity of ${line.name}`}
                onChange={(q) => onQty(line.id, q)}
              />
              <span className="line__total">{formatPrice(line.price * line.qty, currency)}</span>
              <button type="button" className="icon-btn" onClick={() => onRemove(line.id)} aria-label={`Remove ${line.name}`}>
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <aside className="ticket" aria-label="Order summary">
        <div className="ticket__top">
          <p className="ticket__title">Order ticket</p>
          <dl className="ticket__rows">
            <div>
              <dt>{count} {plural(count, "item", "items")}</dt>
              <dd>{formatPrice(total, currency)}</dd>
            </div>
            <div>
              <dt>Service charge</dt>
              <dd>{formatPrice(0, currency)}</dd>
            </div>
          </dl>
        </div>

        <div className="ticket__tear" aria-hidden="true" />

        <div className="ticket__bottom">
          <div className="ticket__total">
            <span>Total to pay</span>
            <strong data-testid="cart-total">{formatPrice(total, currency)}</strong>
          </div>

          <label className="field">
            <span>Pickup time</span>
            <select value={slot} onChange={(e) => setSlot(e.target.value)}>
              {SLOTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>

          <label className="field">
            <span>Note for the kitchen</span>
            <textarea
              rows="2"
              maxLength="120"
              placeholder="Less spicy, no onions"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>

          <button type="button" className="btn btn--primary btn--block" onClick={() => onCheckout({ slot, note })}>
            Place order
          </button>
        </div>
      </aside>
    </div>
  );
}

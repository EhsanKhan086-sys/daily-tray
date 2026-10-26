import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DataGate from "../components/DataGate.jsx";
import QtyStepper from "../components/QtyStepper.jsx";
import { BackIcon, ClockIcon, HeartIcon, PlusIcon, CheckIcon } from "../components/Icons.jsx";
import { useMenu } from "../context/MenuContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useFavourites } from "../context/FavouritesContext.jsx";
import { formatPrice } from "../utils/format.js";

function SpiceMeter({ level }) {
  const labels = ["Not spicy", "Mild", "Medium", "Hot"];
  return (
    <span className="spice" role="img" aria-label={`Spice level: ${labels[level]}`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`spice__pip ${n <= level ? "spice__pip--on" : ""}`} />
      ))}
      <span className="spice__text">{labels[level]}</span>
    </span>
  );
}

function ItemContent() {
  const { id } = useParams();
  const { items, currency } = useMenu();
  const { addItem, qtyOf } = useCart();
  const { isFavourite, toggle } = useFavourites();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const item = items.find((i) => String(i.id) === id);

  if (!item) {
    return (
      <div className="notice">
        <h1>We couldn't find that dish</h1>
        <p>It may have been taken off today's menu.</p>
        <Link className="btn btn--primary" to="/">Back to the menu</Link>
      </div>
    );
  }

  const fav = isFavourite(item.id);
  const inCart = qtyOf(item.id);
  const related = items.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 3);

  function handleAdd() {
    addItem(item, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <>
      <Link to="/" className="back"><BackIcon /> Back to the menu</Link>

      <article className="detail" style={{ "--tone": item.tone }}>
        <div className="detail__media">
          <span aria-hidden="true">{item.emoji}</span>
        </div>

        <div className="detail__body">
          <p className="detail__cat">{item.category}</p>
          <div className="detail__titlerow">
            <h1>{item.name}</h1>
            <button
              type="button"
              className={`fav fav--inline ${fav ? "fav--on" : ""}`}
              aria-pressed={fav}
              aria-label={fav ? "Remove from favourites" : "Add to favourites"}
              onClick={() => toggle(item.id)}
            >
              <HeartIcon filled={fav} />
            </button>
          </div>

          <p className="detail__desc">{item.description}</p>

          <dl className="facts">
            <div><dt>Ready in</dt><dd><ClockIcon width={15} height={15} /> {item.prepMinutes} min</dd></div>
            <div><dt>Energy</dt><dd>{item.calories} kcal</dd></div>
            <div><dt>Diet</dt><dd>{item.veg ? "Vegetarian" : "Contains meat or egg"}</dd></div>
            <div><dt>Heat</dt><dd><SpiceMeter level={item.spice} /></dd></div>
          </dl>

          {item.tags?.length > 0 && (
            <ul className="tags">
              {item.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          )}

          <div className="buy">
            <p className="buy__price">{formatPrice(item.price * qty, currency)}</p>
            {item.soldOut ? (
              <p className="sold-note" role="status">Sold out today. Check back tomorrow.</p>
            ) : (
              <div className="buy__actions">
                <QtyStepper value={qty} onChange={setQty} label="Quantity to add" />
                <button type="button" className={`btn btn--primary ${added ? "btn--done" : ""}`} onClick={handleAdd}>
                  {added ? <CheckIcon width={18} height={18} /> : <PlusIcon width={18} height={18} />}
                  {added ? "Added to tray" : "Add to tray"}
                </button>
              </div>
            )}
            {inCart > 0 && (
              <p className="buy__incart">
                {inCart} already in your tray. <Link to="/cart">Open tray</Link>
              </p>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="related" aria-labelledby="related-h">
          <h2 id="related-h">More from {item.category}</h2>
          <ul className="related__list">
            {related.map((r) => (
              <li key={r.id}>
                <Link to={`/item/${r.id}`} className="related__item" style={{ "--tone": r.tone }}>
                  <span className="related__emoji" aria-hidden="true">{r.emoji}</span>
                  <span>
                    <span className="related__name">{r.name}</span>
                    <span className="related__price">{formatPrice(r.price, currency)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default function ItemPage() {
  const { id } = useParams();
  // key resets quantity/added state when moving between dishes
  return (
    <DataGate>
      <ItemContent key={id} />
    </DataGate>
  );
}

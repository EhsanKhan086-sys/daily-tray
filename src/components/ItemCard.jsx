import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, PlusIcon, CheckIcon, ClockIcon } from "./Icons.jsx";
import { formatPrice } from "../utils/format.js";

export default function ItemCard({ item, currency, isFavourite, onToggleFavourite, onAdd, inCart = 0 }) {
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleAdd() {
    onAdd(item);
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1100);
  }

  return (
    <article className={`card ${item.soldOut ? "card--sold" : ""}`} style={{ "--tone": item.tone }}>
      <Link to={`/item/${item.id}`} className="card__media" aria-label={`View details for ${item.name}`}>
        <span className="card__emoji" aria-hidden="true">{item.emoji}</span>
        <span className={`diet ${item.veg ? "diet--veg" : "diet--non"}`}>
          <span className="diet__dot" aria-hidden="true" />
          {item.veg ? "Veg" : "Non-veg"}
        </span>
        {item.soldOut && <span className="sold-tag">Sold out today</span>}
      </Link>

      <button
        type="button"
        className={`fav ${isFavourite ? "fav--on" : ""}`}
        aria-pressed={isFavourite}
        aria-label={isFavourite ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`}
        onClick={() => onToggleFavourite(item.id)}
      >
        <HeartIcon filled={isFavourite} />
      </button>

      <div className="card__body">
        <h3 className="card__title">
          <Link to={`/item/${item.id}`}>{item.name}</Link>
        </h3>
        <p className="card__meta">
          <ClockIcon width={14} height={14} /> {item.prepMinutes} min
          <span className="card__sep" aria-hidden="true" />
          {item.calories} kcal
        </p>

        <div className="card__foot">
          <span className="price">{formatPrice(item.price, currency)}</span>
          <button
            type="button"
            className={`btn btn--add ${justAdded ? "btn--done" : ""}`}
            onClick={handleAdd}
            disabled={item.soldOut}
            aria-label={`Add ${item.name} to tray`}
          >
            {justAdded ? <CheckIcon width={16} height={16} /> : <PlusIcon width={16} height={16} />}
            {item.soldOut ? "Unavailable" : justAdded ? "Added" : inCart > 0 ? `Add (${inCart})` : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}

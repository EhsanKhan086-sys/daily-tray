import ItemCard from "./ItemCard.jsx";

export default function MenuList({ items, currency, isFavourite, onToggleFavourite, onAdd, qtyOf }) {
  if (items.length === 0) {
    return (
      <div className="notice" role="status">
        <h2>Nothing matches those filters</h2>
        <p>Try a different word, or clear the category and diet filters.</p>
      </div>
    );
  }

  return (
    <ul className="grid" aria-label="Menu items">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard
            item={item}
            currency={currency}
            isFavourite={isFavourite(item.id)}
            onToggleFavourite={onToggleFavourite}
            onAdd={onAdd}
            inCart={qtyOf(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}

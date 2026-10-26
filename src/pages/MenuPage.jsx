import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DataGate from "../components/DataGate.jsx";
import FilterBar from "../components/FilterBar.jsx";
import MenuList from "../components/MenuList.jsx";
import { useMenu } from "../context/MenuContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useFavourites } from "../context/FavouritesContext.jsx";
import { formatPrice, plural, todayLabel } from "../utils/format.js";

function MenuContent() {
  const { items, currency } = useMenu();
  const { addItem, qtyOf, count, total } = useCart();
  const { isFavourite, toggle } = useFavourites();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [favsOnly, setFavsOnly] = useState(false);

  const categories = useMemo(() => ["All", ...new Set(items.map((i) => i.category))], [items]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (category !== "All" && i.category !== category) return false;
      if (vegOnly && !i.veg) return false;
      if (favsOnly && !isFavourite(i.id)) return false;
      if (!q) return true;
      return [i.name, i.category, i.description, ...(i.tags ?? [])].join(" ").toLowerCase().includes(q);
    });
  }, [items, query, category, vegOnly, favsOnly, isFavourite]);

  return (
    <>
      <FilterBar
        query={query}
        onQuery={setQuery}
        categories={categories}
        category={category}
        onCategory={setCategory}
        vegOnly={vegOnly}
        onVegOnly={setVegOnly}
        favsOnly={favsOnly}
        onFavsOnly={setFavsOnly}
      />

      <p className="result-count" role="status">
        Showing {visible.length} of {items.length} dishes
      </p>

      <MenuList
        items={visible}
        currency={currency}
        isFavourite={isFavourite}
        onToggleFavourite={toggle}
        onAdd={addItem}
        qtyOf={qtyOf}
      />

      {count > 0 && (
        <Link to="/cart" className="tray-bar">
          <span>{count} {plural(count, "item", "items")} in your tray</span>
          <strong>{formatPrice(total, currency)}</strong>
        </Link>
      )}
    </>
  );
}

export default function MenuPage() {
  return (
    <>
      <section className="hero">
        <p className="hero__date">{todayLabel()}</p>
        <h1 className="hero__title">What's on the counter today</h1>
        <p className="hero__lede">Pick your dishes, check them out, then collect your tray when it's ready.</p>
      </section>
      <DataGate>
        <MenuContent />
      </DataGate>
    </>
  );
}

import { SearchIcon, HeartIcon } from "./Icons.jsx";

export default function FilterBar({
  query,
  onQuery,
  categories,
  category,
  onCategory,
  vegOnly,
  onVegOnly,
  favsOnly,
  onFavsOnly,
}) {
  return (
    <section className="filters" aria-label="Filter the menu">
      <div className="search">
        <SearchIcon />
        <label htmlFor="menu-search" className="visually-hidden">Search the menu</label>
        <input
          id="menu-search"
          type="search"
          placeholder="Search biryani, chai, samosa"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="chips" role="group" aria-label="Category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${c === category ? "chip--active" : ""}`}
            aria-pressed={c === category}
            onClick={() => onCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="toggles">
        <button
          type="button"
          className={`toggle ${vegOnly ? "toggle--on" : ""}`}
          aria-pressed={vegOnly}
          onClick={() => onVegOnly(!vegOnly)}
        >
          <span className="veg-dot" aria-hidden="true" /> Vegetarian only
        </button>
        <button
          type="button"
          className={`toggle ${favsOnly ? "toggle--on" : ""}`}
          aria-pressed={favsOnly}
          onClick={() => onFavsOnly(!favsOnly)}
        >
          <HeartIcon filled={favsOnly} width={16} height={16} /> Favourites
        </button>
      </div>
    </section>
  );
}

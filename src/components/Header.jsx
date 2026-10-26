import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useMenu } from "../context/MenuContext.jsx";
import { TrayIcon } from "./Icons.jsx";
import { plural } from "../utils/format.js";

export default function Header() {
  const { count } = useCart();
  const { canteen, status } = useMenu();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="The Daily Tray, home">
          <span className="brand__mark" aria-hidden="true">🍛</span>
          <span className="brand__text">
            <span className="brand__name">The Daily Tray</span>
            <span className="brand__sub">{status === "ready" ? canteen : "Campus canteen"}</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          <NavLink to="/" end className="nav__link">Menu</NavLink>
          <NavLink to="/cart" className="nav__link nav__cart">
            <TrayIcon />
            <span className="nav__cart-label">My tray</span>
            <span
              className={`badge ${count > 0 ? "badge--on" : ""}`}
              aria-label={`${count} ${plural(count, "item", "items")} in your tray`}
              data-testid="cart-count"
            >
              {count}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

# The Daily Tray: campus canteen ordering

A phone-first React app where students browse today's menu, open a dish, and build an order.

## Run it

```bash
npm install
npm run dev        # opens http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build
```

Requires Node 18 or newer.

## What's inside

| Requirement | Where |
| --- | --- |
| Menu from a local JSON file | `public/menu.json`, fetched at runtime (edit it to change the menu) |
| `useEffect` + `fetch` + `async/await`, loading and error states | `src/context/MenuContext.jsx`, `src/components/DataGate.jsx` |
| Reusable components with props and `useState` | `ItemCard`, `MenuList`, `Cart`, `FilterBar`, `QtyStepper` in `src/components` |
| Search, category filter, veg filter, favourites toggle | `src/pages/MenuPage.jsx`, `src/components/FilterBar.jsx` |
| React Router: Menu, Item details, Cart | `src/App.jsx`, `src/pages/*` |
| Shared cart via Context (header count and total update instantly) | `src/context/CartContext.jsx` |
| Responsive layout (phone, tablet, desktop) | `src/styles.css` (CSS Grid, Flexbox, media queries at 640 / 900 / 1100 px) |

## Notes

- The cart and favourites are saved in `localStorage`, so they survive a refresh.
- The header count and the cart total are both derived from the same `lines` array in `CartContext`, so they cannot drift apart.
- A dish can be marked `"soldOut": true` in `menu.json` to disable ordering.
- To test the error state, rename `public/menu.json` and reload. Use "Try again" after restoring it.

## menu.json item shape

```json
{
  "id": 4, "name": "Chicken Biryani", "category": "Mains", "price": 350,
  "emoji": "🍛", "tone": "#ffe08a", "description": "...",
  "calories": 780, "prepMinutes": 6, "veg": false, "spice": 2,
  "tags": ["Bestseller"], "soldOut": false
}
```

## Screen recording checklist

1. Type "chai" in search, then clear it and pick the Snacks chip.
2. Tap the heart on a dish, then switch on the Favourites filter.
3. Open a dish, change the quantity, tap Add to tray. Watch the header badge.
4. Open My tray, change quantities, and watch the total update. Place the order.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { MenuProvider } from "./context/MenuContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuProvider>
        <CartProvider>
          <FavouritesProvider>
            <App />
          </FavouritesProvider>
        </CartProvider>
      </MenuProvider>
    </BrowserRouter>
  </React.StrictMode>
);

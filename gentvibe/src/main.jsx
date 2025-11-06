import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components.jsx/Context/Authcontext.jsx";
import { SearchProvider } from "./components.jsx/Context/Searchcontext.jsx";
import { CartProvider } from "./components.jsx/Context/Cartcontext.jsx";
import { WhishProvider } from "./components.jsx/Context/Wishcontext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <WhishProvider>

            <App />
            </WhishProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);

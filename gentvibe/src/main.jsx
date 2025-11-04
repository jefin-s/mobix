import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components.jsx/Context/Authcontext.jsx";
import { SearchProvider } from "./components.jsx/Context/Searchcontext.jsx";
import { CartProvider } from "./components.jsx/Context/Cartcontext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);

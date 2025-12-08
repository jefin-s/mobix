import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Context/Authcontext.jsx";
import { SearchProvider } from "./components/Context/Searchcontext.jsx";
import { CartProvider } from "./components/Context/Cartcontext.jsx";
import { WhishProvider } from "./components/Context/Wishcontext.jsx";
import { Userprovider } from "./Admin/context/Userscontext.jsx";
import { OrderProvider } from "./Admin/context/Oredercontext.jsx";
import { ProductProvider } from "./Admin/Productcontext.jsx";
import Modal from "react-modal";
Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <WhishProvider>
              <Userprovider>
                <OrderProvider>
                  <ProductProvider>
                    <App />
                  </ProductProvider>
                </OrderProvider>
              </Userprovider>
            </WhishProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);

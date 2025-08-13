import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { GlobalStyles } from "./styles/GlobalStyles";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Media } from "./pages/Media";
import { Merch } from "./pages/Merch";
import { ProductPage } from "./pages/ProductPage";
import { GalleryPage } from "./pages/GalleryPage";
import { CartProvider } from "./contexts/CartContext";
import { Cart } from "./pages/Cart";


export const App = () => {
  return (
    <>
      <CartProvider>
        {" "}
        {/* ⬅️ LÄGG TILL DENNA */}
        <GlobalStyles />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/media" element={<Media />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/media/:slug" element={<GalleryPage />} />
          </Routes>
        </Router>
      </CartProvider>{" "}
      {/* ⬅️ OCH DENNA */}
    </>
  );
};

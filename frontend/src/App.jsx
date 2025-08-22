import { CartProvider } from "./contexts/CartProvider";
import { GlobalStyles } from "./styles/GlobalStyles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MerchNavbar } from "./components/MerchNavbar"; // Lägg till import
import { Breadcrumbs } from "./components/Breadcrumbs";
import { Home } from "./pages/Home";
import { Media } from "./pages/Media";
import { Merch } from "./pages/Merch";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./pages/Cart";
import { GalleryPage } from "./pages/GalleryPage";

// Skapa en komponent som väljer rätt navbar
const AppContent = () => {
  const location = useLocation();

  // Kolla om vi är på shopping-sidor
  const isShoppingSite =
    location.pathname === "/merch" ||
    location.pathname.startsWith("/product") ||
    location.pathname === "/cart";

  return (
    <>
      {/* Visa rätt navbar beroende på var vi är */}
      {isShoppingSite ? <MerchNavbar /> : <Navbar />}

      {/* Breadcrumbs bara på shopping-sidor */}
      {isShoppingSite && <Breadcrumbs />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media" element={<Media />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/media/:slug" element={<GalleryPage />} />
      </Routes>
    </>
  );
};

export const App = () => {
  return (
    <CartProvider>
      <GlobalStyles />
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
};

import { CartProvider } from "./contexts/CartProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import CookieConsent from "./components/CookieConsent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MerchNavbar } from "./components/MerchNavbar"; // Lägg till import
import { Breadcrumbs } from "./components/Breadcrumbs";
import { TopBar } from "./components/TopBar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Media } from "./pages/Media";
import { Gigs } from "./pages/Gigs";
import { Merch } from "./pages/Merch";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./pages/Cart";
import { GalleryPage } from "./pages/GalleryPage";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Login } from "./pages/Login";
import { Favorites } from "./pages/Favorites";
import { AccountSettings } from "./pages/AccountSettings";

// Skapa en komponent som väljer rätt navbar
const AppContent = () => {
  const location = useLocation();

  // Kolla om vi är på shopping-sidor eller användarautentiserade sidor
  const isShoppingSite =
    location.pathname === "/merch" ||
    location.pathname.startsWith("/product") ||
    location.pathname === "/cart" ||
    location.pathname === "/favorites" ||
    location.pathname === "/settings" ||
    location.pathname === "/login";

  return (
    <>
      {/* Visa rätt navbar beroende på var vi är */}
      {isShoppingSite ? <MerchNavbar /> : <Navbar />}

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/media" element={<Media />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/media/:slug" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Navigate to="/login" replace />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<AccountSettings />} />
        </Routes>
      </main>
      
      <Footer />
      <CookieConsent />
    </>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <GlobalStyles />
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

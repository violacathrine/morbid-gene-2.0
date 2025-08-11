import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { GlobalStyles } from "./styles/GlobalStyles";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Media } from "./pages/Media";
import Merch from "./pages/Merch";
import { GalleryPage } from "./pages/GalleryPage";

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/media" element={<Media />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/media/:slug" element={<GalleryPage />} />
        </Routes>
      </Router>
    </>
  );
};

// src/pages/Home.jsx
import { HeroSection } from "../components/HeroSection";
import { InstagramFeed } from "../components/InstagramFeed";
import ScrollToTop from "../components/ScrollToTop";

export const Home = () => {
  return (
    <>
      <HeroSection />
      <InstagramFeed />
      <ScrollToTop />
    </>
  );
};

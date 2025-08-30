// src/pages/Media.jsx
import styled from "styled-components";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

// Import glob-bilder
const fryshusetImages = import.meta.glob(
  "/src/assets/images/fryshuset/*.{jpg,png,JPG}",
  { eager: true, import: "default" }
);
const fredagsmangelImages = import.meta.glob(
  "/src/assets/images/fredagsmangel/*.{jpg,png,JPG}",
  { eager: true, import: "default" }
);
const olearysImages = import.meta.glob(
  "/src/assets/images/olearys/*.{jpg,png,JPG}",
  { eager: true, import: "default" }
);

const galleries = [
  {
    id: "fryshuset",
    title: "Stockholm - Fryshuset 24.05.25",
    credit: "Photo © Marielle Tengström @ Tritone",
    images: Object.values(fryshusetImages),
  },
  {
    id: "fredagsmangel",
    title: "Jakobsberg - Fredagsmangel 15.11.24",
    credit: "Photo © Per Lenner",
    images: Object.values(fredagsmangelImages),
  },
  {
    id: "olearys",
    title: "Vällingby - O'learys - 26.10.24",
    credit: "Photo © Christoffer Wiklundh",
    images: Object.values(olearysImages),
  },
];

const Wrapper = styled.section`
  padding: 120px 2rem 2rem;
  background: #000;
  color: #fff;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
`;

const Card = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 4px;

  @media (max-width: 767px) {
    opacity: 1;
    background: rgba(0, 0, 0, 0.85);
    justify-content: flex-end;
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 767px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    background: rgba(0, 0, 0, 0.9);
    padding: 0.75rem;
    border-radius: 4px;
    font-weight: bold;
  }
`;

const Button = styled.span`
  background: #cc0000;
  color: #fff;
  padding: 0.5rem 1rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 4px;

  @media (max-width: 767px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
`;

export const Media = () => {
  return (
    <Wrapper>
      <Grid>
        {galleries.map((gallery) => (
          <Card key={gallery.id} to={`/media/${gallery.id}`}>
            <img src={gallery.images[0]} alt={gallery.title} />
            <Overlay className="overlay">
              <Title>{gallery.title}</Title>
              <Button>View More</Button>
            </Overlay>
          </Card>
        ))}
      </Grid>
      <ScrollToTop />
    </Wrapper>
  );
};

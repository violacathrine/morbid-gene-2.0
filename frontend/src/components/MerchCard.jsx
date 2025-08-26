// MerchCard.jsx
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice.js";
import { translateProductType } from "../utils/translations";
import FavoriteButton from "./FavoriteButton";

const MerchCard = ({ item }) => {
  console.log("MerchCard item FULL:", JSON.stringify(item, null, 2)); // More detailed debug log
  
  // Use the enriched productTypeName from backend
  const name = item.productTypeName || item.productType?.name || item.name || "Unknown Product";
  const imageUrl = item.previewImage?.url;
  const priceAmount = item.price?.amount;
  const currencyId = item.price?.currencyId;
  const productId = item.sellableId;

  return (
    <div style={{
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        padding: "1rem",
        display: "block",
        transition: "box-shadow 0.2s",
        backgroundColor: "white",
        color: "black",
        position: "relative",
        paddingBottom: "3rem" // Extra space for heart button
      }}
    >
      {/* Link wrapping the main content */}
      <Link 
        to={`/product/${productId}`} 
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block"
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: "0.25rem",
              marginBottom: "0.5rem",
            }}
          />
        )}
        <div style={{ fontWeight: "500" }}>{translateProductType(name)}</div>
        {priceAmount != null && (
          <div style={{ fontSize: "0.875rem", opacity: "0.8" }}>
            {formatPrice(priceAmount, currencyId)}
          </div>
        )}
      </Link>
      
      {/* Favorite button in bottom right */}
      <div style={{ 
        position: "absolute", 
        bottom: "0.5rem", 
        right: "0.5rem", 
        zIndex: 10 
      }}>
        <FavoriteButton product={item} showTooltip={true} />
      </div>
    </div>
  );
};

export default MerchCard;

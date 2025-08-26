// MerchCard.jsx
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice.js";

const MerchCard = ({ item }) => {
  console.log("MerchCard item FULL:", JSON.stringify(item, null, 2)); // More detailed debug log
  
  // Use the enriched productTypeName from backend
  const name = item.productTypeName || item.productType?.name || item.name || "Unknown Product";
  const imageUrl = item.previewImage?.url;
  const priceAmount = item.price?.amount;
  const currencyId = item.price?.currencyId;
  const productId = item.sellableId;

  return (
    <Link to={`/product/${productId}`} style={{
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        padding: "1rem",
        display: "block",
        transition: "box-shadow 0.2s",
        backgroundColor: "white",
        color: "black",
        textDecoration: "none",
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
      <div style={{ fontWeight: "500" }}>{name}</div>
      {priceAmount != null && (
        <div style={{ fontSize: "0.875rem", opacity: "0.8" }}>
          {formatPrice(priceAmount, currencyId)}
        </div>
      )}
      </Link>
  );
};

export default MerchCard;

// MerchCard.jsx
import { formatPrice } from "../utils/formatPrice.js";

export default function MerchCard({ item }) {
  const name = item.name;
  const imageUrl = item.previewImage?.url;
  const priceAmount = item.price?.amount;
  const currencyId = item.price?.currencyId;

  const shopUrl = "https://morbid-gene.myspreadshop.se";
  const productUrl = `${shopUrl}/${name.replaceAll(" ", "-")}-${
    item.sellableId.split("-")[0]
  }?productType=${item.productTypeId}`;

  return (
    <a
      href={productUrl}
      target="_blank"
      rel="noreferrer"
      style={{
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
    </a>
  );
}

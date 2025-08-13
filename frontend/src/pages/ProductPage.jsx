import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";

export const ProductPage = () => {
  const { productId } = useParams();
  const { product, loading, error } = useProduct(productId);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log("Trying to add product:", product.name); // ⬅️ LÄGG TILL
    if (product.name) {
      addToCart(product.name);
      console.log("Product added to cart"); // ⬅️ LÄGG TILL
      alert(`${product.name} lades till i kundkorgen`);
    } else {
      console.log("No product to add"); // ⬅️ LÄGG TILL
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading product..</div>;

  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>Error: {error}</div>;

  if (!product)
    return <div style={{ padding: "2rem" }}>Product not found.</div>;

  return (
    <div
      style={{
        padding: "5rem",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
      }}
    >
      {/*Product image*/}
      <div>
        {product.previewImage?.url && (
          <img
            src={product.previewImage.url}
            alt={product.name}
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          />
        )}
      </div>

      {/*Product details*/}
      <div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "white",
          }}
        >
          {product.name}
        </h1>

        {product.description && (
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "1.5rem",
              lineHeight: "1.6",
              color: "#ccc",
            }}
          >
            {product.description}
          </p>
        )}
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#4ade80",
          }}
        >
          {formatPrice(product.price?.amount, product.price?.currencyId)}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "white", marginBottom: "0.5rem" }}>Tags:</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#374151",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Lägg i kundkorg knapp */}
        <button
          onClick={handleAddToCart}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "8px",
            border: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#dc2626")}
        >
          Lägg i kundkorg
        </button>

        {/* Debug info */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#1f2937",
            borderRadius: "4px",
            fontSize: "0.875rem",
            color: "#9ca3af",
          }}
        >
          <strong>Debug info:</strong>
          <br />
          Product ID: {productId}
          <br />
          Sellable ID: {product.sellableId}
          <br />
          Product Type: {product.productTypeId}
        </div>
      </div>
    </div>
  );
};

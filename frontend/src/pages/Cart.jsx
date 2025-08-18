import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";
import { Link } from "react-router-dom";

export const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  // ⬅️ LÄGG TILL DESSA DEBUG-RADER:
  console.log("💰 Cart items for total:", cartItems);
  console.log("💰 Total price calculation:", getTotalPrice());
  console.log(
    "💰 Each item price:",
    cartItems.map((item) => ({
      name: item.name,
      price: item.price?.amount,
      quantity: item.quantity,
      total: (item.price?.amount || 0) * item.quantity,
    }))
  );

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white", marginBottom: "1rem" }}>
          Your cart is empty
        </h1>
        <p style={{ color: "#ccc", marginBottom: "2rem" }}>
          It looks like you haven't added any items to your cart yet. Start
          shopping now!
        </p>
        <Link
          to="/merch"
          style={{
            display: "inline-block",
            backgroundColor: "#dc2626",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ color: "white", margin: 0 }}>
          Shopping Cart ({getTotalItems()} items)
        </h1>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: "transparent",
            color: "#ef4444",
            border: "1px solid #ef4444",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Clear Cart
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {cartItems.map((item, index) => (
          <div
            key={`${item.sellableId}-${index}`}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              backgroundColor: "#1f2937",
              borderRadius: "8px",
              alignItems: "center",
            }}
          >
            {/* Produktbild */}
            <img
              src={item.previewImage?.url}
              alt={item.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />

            {/* Produktinfo */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  color: "white",
                  margin: "0 0 0.5rem 0",
                  fontSize: "1.1rem",
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  color: "#9ca3af",
                  margin: 0,
                  fontSize: "0.875rem",
                }}
              >
                {formatPrice(item.price?.amount, item.price?.currencyId)} per st
              </p>
            </div>

            {/* Quantity controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={() =>
                  updateQuantity(item.sellableId, item.quantity - 1)
                }
                style={{
                  backgroundColor: "#374151",
                  color: "white",
                  border: "none",
                  width: "32px",
                  height: "32px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                -
              </button>

              <span
                style={{
                  color: "white",
                  minWidth: "40px",
                  textAlign: "center",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  updateQuantity(item.sellableId, item.quantity + 1)
                }
                style={{
                  backgroundColor: "#374151",
                  color: "white",
                  border: "none",
                  width: "32px",
                  height: "32px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +
              </button>
            </div>

            {/* Totalpris för denna rad */}
            <div
              style={{
                color: "white",
                fontWeight: "bold",
                minWidth: "100px",
                textAlign: "right",
              }}
            >
              {formatPrice(
                (item.price?.amount || 0) * item.quantity,
                item.price?.currencyId
              )}
            </div>

            {/* Ta bort knapp */}
            <button
              onClick={() => removeFromCart(item.sellableId)}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                width: "32px",
                height: "32px",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Totalsumma och checkout */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "#1f2937",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span style={{ color: "white", fontSize: "1.2rem" }}>Totalt:</span>
          <span
            style={{
              color: "#4ade80",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {formatPrice(getTotalPrice(), "2")} {/* Assuming SEK/EUR */}
          </span>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Link
            to="/merch"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid #6b7280",
              padding: "1rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Continue shopping
          </Link>

          <button
            style={{
              flex: 1,
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              padding: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Go to Checkout 🤘
          </button>
        </div>
      </div>
    </div>
  );
};

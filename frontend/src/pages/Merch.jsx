import { useState } from "react";
import { useMerch } from "../hooks/useMerch";
import MerchCard from "../components/MerchCard";

export default function Merch() {
  const [q, setQ] = useState("");
  const { items, total, loading, error } = useMerch({ q, limit: 24 });

  return (
    <div style={{ padding: "1rem", maxWidth: "1280px", margin: "0 auto" }}>
      <h1
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Merch
      </h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          style={{
            border: "1px solid #ccc",
            padding: "0.5rem 0.75rem",
            borderRadius: "0.25rem",
            width: "100%",
            maxWidth: "28rem",
          }}
          placeholder="Sök merch…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {loading && <p>Loading merch…</p>}
      {error && (
        <p>
          We're sorry, but we couldn't load the merch right now. Please try
          again later or visit: https://morbid-gene.myspreadshop.se/
        </p>
      )}
      {!loading && !error && (
        <>
          <p
            style={{
              fontSize: "0.875rem",
              opacity: "0.7",
              marginBottom: "0.5rem",
            }}
          >
            {total} produkter
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {items.map((it) => (
              <MerchCard key={it.sellableId} item={it} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

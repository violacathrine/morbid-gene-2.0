import { useState, useEffect } from "react";
import { apiCall } from "../config/api.js";

export function useMerch({ q, limit, offset }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (limit) params.append("limit", limit);
    if (offset) params.append("offset", offset);
    if (q) params.append("q", q);

    apiCall(`/api/merch?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong while fetching products");
        return res.json();
      })
      .then((data) => {
        setItems(data.sellables || []);
        setTotal(data.count || 0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q, limit, offset]);

  return { items, total, loading, error };
}

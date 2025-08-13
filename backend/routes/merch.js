import express from "express";
import axios from "axios";

const router = express.Router();

// Route för att hämta alla produkter
router.get("/", async (req, res) => {
  const shopId = process.env.SPREADSHOP_ID;
  const apiKey = process.env.SPREADSHOP_API_KEY;
  const userAgent = process.env.SPREAD_USER_AGENT;

  const limit = req.query.limit || 24;
  const offset = 0;

  console.log("DEBUG: Miljövariabler:");
  console.log("SPREADSHOP_ID:", shopId);
  console.log("SPREADSHOP_API_KEY:", apiKey);
  console.log("SPREAD_USER_AGENT:", userAgent);

  if (!shopId || !apiKey || !userAgent) {
    console.error("Fel: En eller flera miljövariabler saknas.");
    return res
      .status(500)
      .json({ error: "Miljövariabler saknas för API-anrop." });
  }

  const apiDomain = "https://api.spreadshirt.net";
  const url = `${apiDomain}/api/v1/shops/${shopId}/sellables?limit=${limit}&offset=${offset}&fullData=true`;

  console.log("DEBUG: URL som anropas:", url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `SprdAuth apiKey="${apiKey}"`,
        "User-Agent": userAgent,
      },
    });

    console.log("DEBUG: API svar status:", response.status);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Fel vid hämtning av merch:",
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data || error.message });
  }
});

// Route för att hämta en specifik produkt
router.get("/:productId", async (req, res) => {
  const shopId = process.env.SPREADSHOP_ID;
  const apiKey = process.env.SPREADSHOP_API_KEY;
  const userAgent = process.env.SPREAD_USER_AGENT;
  const { productId } = req.params;

  console.log("Backend: Looking for productId:", productId); // ⬅️ LÄGG TILL

  console.log("DEBUG: Hämtar produkt med ID:", productId);

  if (!shopId || !apiKey || !userAgent) {
    return res
      .status(500)
      .json({ error: "Miljövariabler saknas för API-anrop." });
  }

  const apiDomain = "https://api.spreadshirt.net";
  const url = `${apiDomain}/api/v1/shops/${shopId}/sellables?limit=100&fullData=true`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `SprdAuth apiKey="${apiKey}"`,
        "User-Agent": userAgent,
      },
    });

    const product = response.data.sellables?.find(
      (item) => item.sellableId === productId
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("DEBUG: Produkt hittad:", product.name);
    res.json(product);
  } catch (error) {
    console.error(
      "Fel vid hämtning av produkt:",
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data || error.message });
  }
});

export default router;

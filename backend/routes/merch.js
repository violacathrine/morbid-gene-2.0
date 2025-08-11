import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  // Läs in miljövariabler för att få tillgång till API-nyckeln och butiks-ID
  const shopId = process.env.SPREADSHOP_ID;
  const apiKey = process.env.SPREADSHOP_API_KEY;
  const userAgent = process.env.SPREAD_USER_AGENT;

  // Hämta limit från query-parametern, annars sätt standardvärde
  const limit = req.query.limit || 24;
  const offset = 0;

  console.log("DEBUG: Miljövariabler:");
  console.log("SPREADSHOP_ID:", shopId);
  console.log("SPREADSHOP_API_KEY:", apiKey);
  console.log("SPREAD_USER_AGENT:", userAgent);

  // Kontrollera att alla nödvändiga variabler finns
  if (!shopId || !apiKey || !userAgent) {
    console.error("Fel: En eller flera miljövariabler saknas.");
    return res
      .status(500)
      .json({ error: "Miljövariabler saknas för API-anrop." });
  }

  // --- KORREKT URL-KONSTRUKTION ---
  // Använd den officiella API-domänen. I detta fall för Europa (.net)
  // Om din butik är i Nordamerika, använd .com istället.
  const apiDomain = "https://api.spreadshirt.net";
  const url = `${apiDomain}/api/v1/shops/${shopId}/sellables?limit=${limit}&offset=${offset}&fullData=true`;

  console.log("DEBUG: URL som anropas:", url);

try {
  const response = await axios.get(url, {
    headers: {
      // Testa med denna header istället
      Authorization: `SprdAuth apiKey="${apiKey}"`,
      "User-Agent": userAgent,
    },
  });

  console.log("DEBUG: API svar status:", response.status);
  res.json(response.data);
} catch (error) {
  // Logga detaljerad felinformation för felsökning
  console.error(
    "Fel vid hämtning av merch:",
    error.response?.data || error.message
  );

  // Skicka tillbaka ett passande felmeddelande till klienten
  res
    .status(error.response?.status || 500)
    .json({ error: error.response?.data || error.message });
}
});

export default router;

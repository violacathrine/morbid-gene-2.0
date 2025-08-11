import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const API_KEY = process.env.SPREAD_API_KEY;
const API_SECRET = process.env.SPREAD_API_SECRET;
const USER_AGENT = process.env.SPREAD_USER_AGENT;
const SHOP_ID = process.env.SPREAD_SHOP_ID;

function createSignature(method, url, timestamp) {
  const dataToSign = `${method} ${url} ${timestamp}`;
  return crypto
    .createHmac("sha1", API_SECRET)
    .update(dataToSign)
    .digest("base64");
}

export async function spreadshirtRequest(method, endpoint) {
  const timestamp = Date.now();
  const signature = createSignature(method, endpoint, timestamp);

  try {
    const res = await axios({
      method,
      url: `https://api.spreadshirt.net/api/v1/shops/${SHOP_ID}${endpoint}`,
      headers: {
        "User-Agent": USER_AGENT,
        Authorization: `SprdAuth apiKey="${API_KEY}", data="${timestamp}", sig="${signature}"`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Spreadshirt API error:", err.response?.data || err.message);
    throw err;
  }
}

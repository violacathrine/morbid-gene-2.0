export const formatPrice = (priceData) => {
  // Handle different price formats from Spreadshirt API
  let amount;

  if (typeof priceData === "object" && priceData !== null) {
    // Spreadshirt price object - use display value
    amount = priceData.display || priceData.vatIncluded || priceData.amount;
  } else {
    // Simple number
    amount = priceData;
  }

  if (!amount || amount === 0) return "0,00 €";

  // If amount is over 100, it's likely in cents
  // Convert from cents to euros by dividing by 100
  const euroAmount = amount > 100 ? amount / 100 : amount;

  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(euroAmount);
};

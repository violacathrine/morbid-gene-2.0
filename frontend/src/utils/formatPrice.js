export const formatPrice = (priceData) => {
  // Hantera olika prisformat från Spreadshirt API
  let amount;

  if (typeof priceData === "object" && priceData !== null) {
    // Spreadshirt prisobjekt - använd display-värdet
    amount = priceData.display || priceData.vatIncluded || priceData.amount;
  } else {
    // Enkelt nummer
    amount = priceData;
  }

  if (!amount || amount === 0) return "0,00 €";

  // Om amount är över 100, är det troligen i cents
  // Konvertera från cents till euro genom att dela med 100
  const euroAmount = amount > 100 ? amount / 100 : amount;

  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(euroAmount);
};

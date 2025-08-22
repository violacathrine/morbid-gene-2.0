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

  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
};

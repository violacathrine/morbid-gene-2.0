export const formatPrice = (amount, currencyId) => {
  // Säkerhetskontroll
  if (!amount || amount === 0) return "0,00 €";

  // Bestäm valuta baserat på currencyId
  let currency, locale;

  if (currencyId === "2") {
    currency = "EUR";
    locale = "sv-SE"; // Svensk formatering för EUR
  } else {
    // Fallback till SEK
    currency = "SEK";
    locale = "sv-SE";
  }

  // Formatera med rätt valuta
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
};

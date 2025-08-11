export function formatPrice(amount, currencyId) {
  // Mappa currencyId till valutasymboler
  let currencySymbol;
  if (currencyId === "2") {
    currencySymbol = "€"; // ID "2" motsvarar EUR
  } else {
    // Standardhantering om ID:et inte är känt
    currencySymbol = "SEK";
  }

  // Använd NumberFormat för att formatera priset
  const formattedAmount = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "EUR", // Använder EUR för att matcha symbolen
    minimumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
}

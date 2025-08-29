// Translation mappings for product-related Swedish terms from the API
const translations = {
  // Size translations
  'Liten': 'Small',
  'Mellan': 'Medium',
  'Stor': 'Large',
  'Extra stor': 'Extra Large',
  'Extra extra stor': '2X Large',
  
  // Color translations
  'svart': 'Black',
  'Svart': 'Black',
  'vit': 'White',
  'Vit': 'White',
  'grå': 'Gray',
  'Grå': 'Gray',
  'röd': 'Red',
  'Röd': 'Red',
  'blå': 'Blue',
  'Blå': 'Blue',
  'grön': 'Green',
  'Grön': 'Green',
  'gul': 'Yellow',
  'Gul': 'Yellow',
  'orange': 'Orange',
  'Orange': 'Orange',
  'rosa': 'Pink',
  'Rosa': 'Pink',
  'lila': 'Purple',
  'Lila': 'Purple',
  'brun': 'Brown',
  'Brun': 'Brown',
  'marinblå': 'Navy',
  'Marinblå': 'Navy',
  'mörkgrå': 'Dark Gray',
  'Mörkgrå': 'Dark Gray',
  'ljusgrå': 'Light Gray',
  'Ljusgrå': 'Light Gray',
  'heather grey': 'Heather Gray',
  'Heather Grey': 'Heather Gray',
  'charcoal': 'Charcoal',
  'Charcoal': 'Charcoal',
  'burgundy': 'Burgundy',
  'Burgundy': 'Burgundy',
  'vinröd': 'Wine Red',
  'Vinröd': 'Wine Red',
  'beige': 'Beige',
  'Beige': 'Beige',
  'khaki': 'Khaki',
  'Khaki': 'Khaki',
  
  // Product type translations
  'Huvtröja': 'Hoodie',
  'Luvtröja': 'Hoodie',
  'Tröja': 'Sweatshirt',
  'T-shirt': 'T-shirt',
  'T-tröja': 'T-shirt',
  'Linne': 'Tank Top',
  'Keps': 'Cap',
  'Mugg': 'Mug',
  'Väska': 'Bag',
  'Tygväska': 'Tote Bag',
  'Klistermärke': 'Sticker',
  'Poster': 'Poster',
  'Premiumluvtröja': 'Premium Hoodie',
  'Premium luvtröja': 'Premium Hoodie',
  'Premium T-shirt': 'Premium T-shirt',
  'Herr': "Men's",
  'Dam': "Women's",
  'Unisex': 'Unisex',
  
  // Common product terms
  'herr': "Men's",
  'dam': "Women's",
  'unisex': 'Unisex',
  'barn': "Kids'",
  'premium': 'Premium',
  'ekologisk': 'Organic',
  'klassisk': 'Classic',
};

// Simple translation function for product-related terms
const translate = (text) => {
  if (!text) return '';
  
  // Try direct translation first
  if (translations[text]) {
    return translations[text];
  }
  
  // Try case-insensitive match
  const lowerText = text.toLowerCase();
  const lowerKey = Object.keys(translations).find(
    key => key.toLowerCase() === lowerText
  );
  if (lowerKey) {
    return translations[lowerKey];
  }
  
  // Try partial matches for compound words
  let translatedText = text;
  Object.entries(translations).forEach(([swedish, english]) => {
    const regex = new RegExp(`\\b${swedish}\\b`, 'gi');
    translatedText = translatedText.replace(regex, english);
  });
  
  return translatedText;
};

// Translate size
export const translateSize = (size) => {
  if (!size) return '';
  
  // Size codes like S, M, L, XL stay as they are
  const sizeUpper = size.toUpperCase();
  if (/^(XXS|XS|S|M|L|XL|XXL|3XL|4XL|5XL)$/.test(sizeUpper)) {
    return sizeUpper;
  }
  
  return translate(size);
};

// Translate color
export const translateColor = (color) => {
  if (!color) return '';
  
  const translated = translate(color);
  
  // If no translation found, capitalize first letter
  if (translated === color) {
    return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
  }
  
  return translated;
};

// Translate product type/name
export const translateProductType = (type) => {
  if (!type) return '';
  
  // Split on spaces and dashes, translate each part
  const parts = type.split(/[\s-]/);
  const translatedParts = parts.map(part => translate(part) || part);
  
  return translatedParts.join(' ').replace(/\s+/g, ' ').trim();
};
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
  'vit': 'White',
  'grå': 'Gray',
  'röd': 'Red',
  'blå': 'Blue',
  'grön': 'Green',
  'gul': 'Yellow',
  'orange': 'Orange',
  'rosa': 'Pink',
  'lila': 'Purple',
  'brun': 'Brown',
  'marinblå': 'Navy',
  'mörkgrå': 'Dark Gray',
  'ljusgrå': 'Light Gray',
  'heather grey': 'Heather Gray',
  'charcoal': 'Charcoal',
  
  // Product type translations
  'Huvtröja': 'Hoodie',
  'Luvtröja': 'Hoodie',
  'Tröja': 'Sweatshirt',
  'Linne': 'Tank Top',
  'Keps': 'Cap',
  'Mugg': 'Mug',
  'Väska': 'Bag',
  'Tygväska': 'Tote Bag',
  'Klistermärke': 'Sticker',
  'Poster': 'Poster',
  
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
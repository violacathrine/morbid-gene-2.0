// Translation mappings for product-related Swedish terms from the API
// Using lowercase keys for case-insensitive lookup
const translations = {
  // Size translations
  'liten': 'Small',
  'mellan': 'Medium',
  'stor': 'Large',
  'extra stor': 'Extra Large',
  'extra extra stor': '2X Large',
  
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
  'burgundy': 'Burgundy',
  'vinröd': 'Wine Red',
  'beige': 'Beige',
  'khaki': 'Khaki',
  
  // Product type translations
  'huvtröja': 'Hoodie',
  'luvtröja': 'Hoodie',
  'tröja': 'Sweatshirt',
  't-shirt': 'T-shirt',
  't-tröja': 'T-shirt',
  'linne': 'Tank Top',
  'keps': 'Cap',
  'mugg': 'Mug',
  'väska': 'Bag',
  'tygväska': 'Tote Bag',
  'klistermärke': 'Sticker',
  'poster': 'Poster',
  'premiumluvtröja': 'Premium Hoodie',
  'premium luvtröja': 'Premium Hoodie',
  'premium t-shirt': 'Premium T-shirt',
  'herr': "Men's",
  'dam': "Women's",
  'unisex': 'Unisex',
  'barn': "Kids'",
  'premium': 'Premium',
  'ekologisk': 'Organic',
  'klassisk': 'Classic',
};

// Efficient case-insensitive translation function
const translate = (text) => {
  if (!text) return '';
  
  // Convert to lowercase for case-insensitive lookup
  const lowerText = text.toLowerCase();
  
  // Try direct translation
  if (translations[lowerText]) {
    return translations[lowerText];
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
import axios from "axios";

const apiDomain = "https://api.spreadshirt.net";

// Read environment variables with fallback
const getShopConfig = () => {
  const shopId = process.env.SPREADSHOP_ID;
  const apiKey = process.env.SPREADSHOP_API_KEY;
  const userAgent = process.env.SPREAD_USER_AGENT;

  // If variables are missing, throw an error with helpful info
  if (!shopId || !apiKey || !userAgent) {
    throw new Error(
      "Environment variables missing for API call (SPREADSHOP_ID, SPREADSHOP_API_KEY, SPREAD_USER_AGENT)"
    );
  }

  return { shopId, apiKey, userAgent };
};

// Smart "lazy-loaded" config - only get on first access
let config = null;
const getConfig = () => {
  if (!config) {
    config = getShopConfig();
  }
  return config;
};

// Common headers-configuration
const getHeaders = () => {
  const { apiKey, userAgent } = getConfig();
  return {
    Authorization: `SprdAuth apiKey="${apiKey}"`,
    "User-Agent": userAgent,
  };
};

// Get all products with enriched productType names
export const getAllProducts = async (limit = 24, offset = 0) => {
  const { shopId } = getConfig();
  const url = `${apiDomain}/api/v1/shops/${shopId}/sellables?limit=${limit}&offset=${offset}&fullData=true`;

  try {
    const response = await axios.get(url, {
      headers: getHeaders(),
    });

    const sellablesData = response.data;
    
    // Enrich each sellable with productType name
    if (sellablesData.sellables && sellablesData.sellables.length > 0) {
      const enrichedSellables = await Promise.all(
        sellablesData.sellables.map(async (sellable) => {
          try {
            if (sellable.productTypeId) {
              const productTypeInfo = await getProductTypeInfo(sellable.productTypeId);
              sellable.productTypeName = productTypeInfo.name;
            }
            return sellable;
          } catch (error) {
            return sellable; // Return original if productType fetch fails
          }
        })
      );
      
      sellablesData.sellables = enrichedSellables;
    }

    return sellablesData;
  } catch (error) {
    throw error;
  }
};

// Get product by ID
export const getProductById = async (productId) => {
  const { shopId } = getConfig();
  const url = `${apiDomain}/api/v1/shops/${shopId}/sellables?limit=100&fullData=true`;

  try {
    const response = await axios.get(url, {
      headers: getHeaders(),
    });

    const product = response.data.sellables?.find(
      (item) => item.sellableId === productId
    );

    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

// Get product type information
export const getProductTypeInfo = async (productTypeId) => {
  const { shopId } = getConfig();
  const url = `${apiDomain}/api/v1/shops/${shopId}/productTypes/${productTypeId}`;

  try {
    const response = await axios.get(url, {
      headers: getHeaders(),
    });

    // Extract comprehensive product information
    const { 
      name, 
      appearances, 
      sizes, 
      defaultValues, 
      stockStates,
      description,
      shortDescription,
      category,
      brand,
      weight,
      material,
      careInstructions,
      features
    } = response.data;

    return {
      name,
      appearances,
      sizes,
      defaultValues,
      stockStates,
      description,
      shortDescription,
      category,
      brand,
      weight,
      material,
      careInstructions,
      features
    };
  } catch (error) {
    throw error;
  }
};

export const getSellableImages = async (sellableId, appearanceId, ideaId) => {
  const { shopId } = getConfig();
  const url = `${apiDomain}/api/v1/shops/${shopId}/sellables/${sellableId}?appearanceId=${appearanceId}&ideaId=${ideaId}`;


  try {
    const response = await axios.get(url, {
      headers: getHeaders(),
    });


    const { images, sizeIds, name } = response.data;

    return {
      images,
      sizeIds,
      name,
    };
  } catch (error) {
    throw error;
  }
};

// Basket-functions

export const createBasket = async (basketItems) => {
  const { shopId } = getConfig();
  const url = `${apiDomain}/api/v1/baskets?mediaType=json`;

  try {
    const response = await axios.post(url, {
      basketItems: basketItems
    }, {
      headers: {
        ...getHeaders(),
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBasket = async (basketId) => {
  const url = `${apiDomain}/api/v1/baskets/${basketId}?mediaType=json&locale=sv_SE`;

  try {
    const response = await axios.get(url, {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const updateBasket = async (basketId, basketItems) => {
  const url = `${apiDomain}/api/v1/baskets/${basketId}?mediaType=json`;

  try {
    const response = await axios.put(url, {
      basketItems: basketItems
    }, {
      headers: {
        ...getHeaders(),
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBasket = async (basketId) => {
  const url = `${apiDomain}/api/v1/baskets/${basketId}`;
  
  try {
    await axios.delete(url, {
      headers: getHeaders(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const convertToBasketItem = (product, sizeName, colorName, quantity = 1) => {
  const { shopId } = getConfig();
  
  const sizeId = product.productType?.sizes?.find(s => s.name === sizeName)?.id;
  const appearanceId = product.productType?.appearances?.find(a => 
    a.name.toLowerCase() === colorName.toLowerCase()
  )?.id;

  if (!sizeId || !appearanceId) {
    throw new Error(`Could not find size ID for "${sizeName}" or appearance ID for "${colorName}"`);
  }

  return {
    quantity: quantity,
    element: {
      id: product.sellableId,
      type: "sprd:sellable",
      properties: [
        {
          key: "sellable",
          value: product.sellableId
        },
        {
          key: "size",
          value: sizeId.toString()
        },
        {
          key: "appearance",
          value: appearanceId.toString()
        },
        {
          key: "sizeLabel",
          value: sizeName
        }
      ],
      shop: {
        id: shopId
      }
    }
  };
};

// Get checkout URL for a basket
export const getCheckoutUrl = async (basketId) => {
  const { shopId } = getConfig();
  const url = `${apiDomain}/api/v1/baskets/${basketId}/checkout?mediaType=json`;

  try {
    const response = await axios.get(url, {
      headers: getHeaders(),
    });

    // Spreadshirt API returns checkout URL in the response
    return response.data.checkoutUrl || response.data.href;
  } catch (error) {
    throw error;
  }
};
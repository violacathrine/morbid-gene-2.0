import * as spreadshirtService from "../services/spreadshirtService.js";

// Controllers for merch-related endpoints

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 24;
    const offset = 0;
    const searchQuery = req.query.q || '';

    const products = await spreadshirtService.getAllProducts(limit, offset);
    
    // Filter products based on search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const filteredSellables = products.sellables.filter(item => {
        const name = (item.name || '').toLowerCase();
        const productTypeName = (item.productTypeName || '').toLowerCase();
        const tags = (item.tags || []).join(' ').toLowerCase();
        
        return name.includes(searchLower) || 
               productTypeName.includes(searchLower) ||
               tags.includes(searchLower);
      });
      
      res.json({
        ...products,
        sellables: filteredSellables,
        count: filteredSellables.length
      });
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Server error",
    });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await spreadshirtService.getProductById(productId);
    res.json(product);
  } catch (error) {
    console.error("Error in getProductById:", error);
    if (error.message === "Product not found") {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(error.response?.status || 500).json({
        error: error.message || "Server error",
      });
    }
  }
};

// Get product type information
export const getProductTypeInfo = async (req, res) => {
  try {
    const { productTypeId } = req.params;
    const productType = await spreadshirtService.getProductTypeInfo(
      productTypeId
    );
    res.json(productType);
  } catch (error) {
    console.error("Error in getProductTypeInfo:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Server error",
    });
  }
};

export const getSellableImages = async (req, res) => {
  try {
    const { sellableId, appearanceId, ideaId } = req.params;

    console.log("🎯 Controller got:", { sellableId, appearanceId, ideaId });

    const sellableData = await spreadshirtService.getSellableImages(
      sellableId,
      appearanceId,
      ideaId
    );
    res.json(sellableData);
  } catch (error) {
    console.error("Error in getSellableImages:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Server error",
    });
  }
};

// Basket Controllers

export const createBasket = async (req, res) => {
  try {
    const { basketItems } = req.body;

    if (!basketItems || !Array.isArray(basketItems)) {
      return res.status(400).json({ error: "basketItems array is required" });
    }

    const basket = await spreadshirtService.createBasket(basketItems);
    res.status(201).json(basket);
  } catch (error) {
    console.error("Error in createBasket:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Server error",
    });
  }
};

export const getBasket = async (req, res) => {
  try {
    const { basketId } = req.params;
    const basket = await spreadshirtService.getBasket(basketId);

    if (!basket) {
      return res.status(404).json({ error: "Basket not found" });
    }

    res.json(basket);
  } catch (error) {
    console.error("Error in getBasket:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Server error",
    });
  }
};

export const updateBasket = async (req, res) => {
  try {
    const { basketId } = req.params;
    const { basketItems } = req.body;

    if (!basketItems || !Array.isArray(basketItems)) {
      return res.status(400).json({ error: "basketItems array is required" });
    }

    const basket = await spreadshirtService.updateBasket(basketId, basketItems);
    res.json(basket);
  } catch (error) {
    console.error("Error in updateBasket:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Server error",
    });
  }
};

export const deleteBasket = async (req, res) => {
  try {
    const { basketId } = req.params;
    await spreadshirtService.deleteBasket(basketId);
    res.status(204).send();
  } catch (error) {
    console.error("Error in deleteBasket:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Server error",
    });
  }
};

export const convertToBasketItem = async (req, res) => {
  try {
    const { productId, sizeName, colorName, quantity } = req.body;

    const product = await spreadshirtService.getProductById(productId);
    const productType = await spreadshirtService.getProductTypeInfo(
      product.productTypeId
    );

    const enrichedProduct = { ...product, productType };

    const basketItem = spreadshirtService.convertToBasketItem(
      enrichedProduct,
      sizeName,
      colorName,
      quantity || 1
    );

    res.json(basketItem);
  } catch (error) {
    console.error("Error in convertToBasketItem:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Server error",
    });
  }
};

// HELT NY OCH KORRIGERAD CHECKOUT FUNKTION
export const getCheckoutUrl = async (req, res) => {
  try {
    const { basketId } = req.params;

    console.log("=== CHECKOUT DEBUG ===");
    console.log("Basket ID:", basketId);

    // Använd vår nya getCheckoutUrl funktion från service
    const checkoutUrl = await spreadshirtService.getCheckoutUrl(basketId);

    res.json({
      checkoutUrl: checkoutUrl,
      basketId: basketId,
    });
  } catch (error) {
    console.error("Error getting checkout URL:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Failed to get checkout URL",
    });
  }
};

// NY FUNKTION: Komplett add-to-basket och checkout i en operation
export const addToBasketAndCheckout = async (req, res) => {
  try {
    const { productId, sizeName, colorName, quantity = 1 } = req.body;

    console.log("=== ADD TO BASKET AND CHECKOUT ===");
    console.log("Product ID:", productId);
    console.log("Size:", sizeName);
    console.log("Color:", colorName);
    console.log("Quantity:", quantity);

    // Hämta produktdata med productType
    const product = await spreadshirtService.getProductById(productId);
    const productType = await spreadshirtService.getProductTypeInfo(
      product.productTypeId
    );
    const enrichedProduct = { ...product, productType };

    // Använd den nya funktionen från service
    const result = await spreadshirtService.addToBasketAndCheckout(
      enrichedProduct,
      sizeName,
      colorName,
      quantity
    );

    res.status(201).json(result);
  } catch (error) {
    console.error("Error in addToBasketAndCheckout:", error);
    res.status(error.response?.status || 500).json({
      error: error.message || "Server error",
    });
  }
};

import * as spreadshirtService from "../services/spreadshirtService.js";
import { handleControllerError } from "../utils/errorHandler.js";

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
    handleControllerError(error, res, "Error in getAllProducts");
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await spreadshirtService.getProductById(productId);
    res.json(product);
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ error: "Product not found" });
    } else {
      handleControllerError(error, res, "Error in getProductById");
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
    handleControllerError(error, res, "Error in getProductTypeInfo");
  }
};

export const getSellableImages = async (req, res) => {
  try {
    const { sellableId, appearanceId, ideaId } = req.params;


    const sellableData = await spreadshirtService.getSellableImages(
      sellableId,
      appearanceId,
      ideaId
    );
    res.json(sellableData);
  } catch (error) {
    handleControllerError(error, res, "Error in getSellableImages");
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
    handleControllerError(error, res, "Error in createBasket");
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
    handleControllerError(error, res, "Error in getBasket");
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
    handleControllerError(error, res, "Error in updateBasket");
  }
};

export const deleteBasket = async (req, res) => {
  try {
    const { basketId } = req.params;
    await spreadshirtService.deleteBasket(basketId);
    res.status(204).send();
  } catch (error) {
    handleControllerError(error, res, "Error in deleteBasket");
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
    handleControllerError(error, res, "Error in convertToBasketItem");
  }
};

// Corrected checkout function
export const getCheckoutUrl = async (req, res) => {
  try {
    const { basketId } = req.params;


    // Use our new getCheckoutUrl function from service
    const checkoutUrl = await spreadshirtService.getCheckoutUrl(basketId);

    res.json({
      checkoutUrl: checkoutUrl,
      basketId: basketId,
    });
  } catch (error) {
    handleControllerError(error, res, "Error getting checkout URL");
  }
};


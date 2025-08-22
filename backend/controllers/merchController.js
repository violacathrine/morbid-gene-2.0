import * as spreadshirtService from "../services/spreadshirtService.js";

// Controllers for merch-related endpoints

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 24;
    const offset = 0;

    const products = await spreadshirtService.getAllProducts(limit, offset);
    res.json(products);
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
    const { sellableId, appearanceId, ideaId } = req.params; // Alla från params nu

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

export const createCheckout = async (req, res) => {
  try {
    const { basketId } = req.params;

    // LÄGG TILL DESSA RADER:
    console.log("=== CHECKOUT DEBUG ===");
    console.log("Basket ID:", basketId);
    console.log("Shop ID:", process.env.SPREADSHOP_ID);
    console.log(
      "API Key:",
      process.env.SPREADSHOP_API_KEY ? "SET" : "NOT SET"
    );

    // Anropa Spreadshirt API för att skapa checkout-session
    const formData = new URLSearchParams();
    formData.append('locale', 'sv_SE');
    formData.append('returnUrls[success]', `${process.env.FRONTEND_URL}/order-success`);
    formData.append('returnUrls[cancel]', `${process.env.FRONTEND_URL}/cart`);
    formData.append('returnUrls[failure]', `${process.env.FRONTEND_URL}/cart?error=payment-failed`);

    const response = await fetch(
      `https://api.spreadshirt.net/api/v1/baskets/${basketId}/checkout`,
      {
        method: "POST",
        headers: {
          Authorization: `SprdAuth apiKey="${process.env.SPREADSHOP_API_KEY}"`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Spreadshirt checkout error:", errorData);
      return res.status(response.status).json({
        error: "Failed to create checkout session",
      });
    }

    const checkoutData = await response.json();

    res.json({
      checkoutUrl: checkoutData.href || checkoutData.url,
    });
  } catch (error) {
    console.error("Checkout creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

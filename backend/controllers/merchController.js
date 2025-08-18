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

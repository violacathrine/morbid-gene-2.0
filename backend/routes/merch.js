import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductTypeInfo,
  getSellableImages,
  createBasket,
  getBasket,
  updateBasket,
  deleteBasket,
  convertToBasketItem,
  createCheckout,
} from "../controllers/merchController.js";

const router = express.Router();

// Basket routes
router.post("/baskets", createBasket);
router.get("/baskets/:basketId", getBasket);
router.put("/baskets/:basketId", updateBasket);
router.delete("/baskets/:basketId", deleteBasket);
router.post("/baskets/convert", convertToBasketItem);
router.post("/baskets/:basketId/checkout", createCheckout);

// Routes - only URL definitions pointing to controller functions
router.get("/", getAllProducts);
router.get("/productType/:productTypeId", getProductTypeInfo);
router.get("/:productId", getProductById);
router.get("/sellable/:sellableId/:appearanceId/:ideaId", getSellableImages);

export default router;

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
  getCheckoutUrl, // Byt från createCheckout
  addToBasketAndCheckout, // NY funktion
} from "../controllers/merchController.js";

const router = express.Router();

// Basket routes
router.post("/baskets", createBasket);
router.get("/baskets/:basketId", getBasket);
router.put("/baskets/:basketId", updateBasket);
router.delete("/baskets/:basketId", deleteBasket);
router.post("/baskets/convert", convertToBasketItem);

// KORRIGERAD checkout route - använd GET istället för POST
router.get("/baskets/:basketId/checkout", getCheckoutUrl);

// NY ROUTE: Direkt add-to-basket + checkout i en operation
router.post("/checkout", addToBasketAndCheckout);

// Product routes
router.get("/", getAllProducts);
router.get("/productType/:productTypeId", getProductTypeInfo);
router.get("/:productId", getProductById);
router.get("/sellable/:sellableId/:appearanceId/:ideaId", getSellableImages);

export default router;

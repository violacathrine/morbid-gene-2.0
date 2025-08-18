import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductTypeInfo,
  getSellableImages,
} from "../controllers/merchController.js";

const router = express.Router();

// Routes - only URL definitions pointing to controller functions
router.get("/", getAllProducts);
router.get("/productType/:productTypeId", getProductTypeInfo);
router.get("/:productId", getProductById);
router.get("/sellable/:sellableId/:appearanceId/:ideaId", getSellableImages);


export default router;

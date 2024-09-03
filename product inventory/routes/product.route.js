import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/products", productController.createProduct);
router.get("/products", productController.getProductsByFilters);

export default router;
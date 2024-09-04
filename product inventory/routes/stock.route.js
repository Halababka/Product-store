import express from "express";
import stockController from "../controllers/stock.controller.js";

const router = express.Router()

router.post('/stocks', stockController.createStock);
router.patch('/stocks/increase', stockController.increaseStockController);
router.patch('/stocks/decrease', stockController.decreaseStockController);
router.get('/stocks', stockController.getStocksByFilters);

export default router
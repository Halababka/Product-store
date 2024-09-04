import express from "express";
import stockController from "../controllers/stock.controller.js";

const router = express.Router()

router.post('/stocks', stockController.createStock);
router.put('/stocks/increase', stockController.increaseStockController);
router.put('/stocks/decrease', stockController.decreaseStockController);
router.get('/stocks', stockController.getStocksByFilters);

export default router
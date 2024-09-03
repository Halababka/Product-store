import express from "express";
import stockController from "../controllers/stock.controller.js";

const router = express.Router()

router.post('/stocks', stockController.createStock);
router.put('/stocks/:id', stockController.updateStock);
router.get('/stocks', stockController.getStocksByFilters);

export default router
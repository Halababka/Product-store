import stockService from "../services/stock.service.js";

class StockController {
    async createStock(req, res) {
        try {
            const stock = await stockService.createStock(req.body);
            res.status(201).json(stock);
        } catch (error) {
            res.status(500).json({message: "Error creating stock", error});
        }
    }

    async increaseStockController(req, res) {
        try {
            const stock = await stockService.increaseStock(req.body);
            res.json(stock);
        } catch (error) {
            res.status(500).json({message: "Error updating stock", error});
        }
    }

    async decreaseStockController(req, res) {
        try {
            const stock = await stockService.decreaseStock(req.body);
            res.json(stock);
        } catch (error) {
            res.status(500).json({message: "Error updating stock", error});
        }
    }

    async getStocksByFilters(req, res) {
        try {
            const filters = req.query;
            const stocks = await stockService.getStocksByFilters(filters);
            res.json(stocks);
        } catch (error) {
            res.status(500).json({message: "Error fetching stocks", error});
        }
    }
}

export default new StockController();
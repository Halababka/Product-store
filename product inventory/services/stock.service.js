import {prisma} from "../prisma/prisma.js";

class StockService {
    async createStock(data) {
        return prisma.stock.create({
            data: {
                productId: data.productId,
                shopId: data.shopId,
                quantityOnShelf: data.quantityOnShelf,
                quantityInOrder: data.quantityInOrder,
            },
        });
    }

    async updateStock(id, data) {
        return prisma.stock.update({
            where: { id: Number(id) },
            data: {
                quantityOnShelf: data.quantityOnShelf,
                quantityInOrder: data.quantityInOrder,
            },
        });
    }

    async getStocksByFilters(filters) {
        return prisma.stock.findMany({
            where: {
                productId: filters.plu ? filters.plu : undefined,
                shopId: filters.shopId ? filters.shopId : undefined,
                quantityOnShelf: filters.quantityOnShelf ? { gte: filters.quantityOnShelf.from, lte: filters.quantityOnShelf.to } : undefined,
                quantityInOrder: filters.quantityInOrder ? { gte: filters.quantityInOrder.from, lte: filters.quantityInOrder.to } : undefined,
            },
        });
    }
}

export default new StockService()
import { prisma } from "../prisma/prisma.js";

class StockService {
    async createStock(data) {
        return prisma.stock.create({
            data: {
                Product: {connect: {id: data.productId}},
                Shop: {connect: {id: data.shopId}},
                quantityOnShelf: data.quantityOnShelf,
                quantityInOrder: data.quantityInOrder
            }
        });
    }

    async increaseStock(data) {
        return prisma.stock.update({
            where: {id: parseInt(data.id)},
            data: {
                quantityOnShelf: {increment: data.quantityOnShelf},
                quantityInOrder: {increment: data.quantityInOrder}
            }
        });
    }

    async decreaseStock(data) {
        return prisma.stock.update({
            where: {id: parseInt(data.id)},
            data: {
                quantityOnShelf: {decrement: data.quantityOnShelf},
                quantityInOrder: {decrement: data.quantityInOrder}
            }
        });
    }

    async getStocksByFilters(filters) {
        return prisma.stock.findMany({
            where: {
                Product: {plu: filters.plu ? filters.plu : undefined},
                shopId: filters.shopId ? parseInt(filters.shopId) : undefined,
                quantityOnShelf: filters.quantityOnShelf ? {
                    gte: parseInt(filters.quantityOnShelf.split("-")[0], 10),
                    lte: parseInt(filters.quantityOnShelf.split("-")[1], 10)
                } : undefined,
                quantityInOrder: filters.quantityInOrder ? {
                    gte: parseInt(filters.quantityInOrder.split("-")[0], 10),
                    lte: parseInt(filters.quantityInOrder.split("-")[1], 10)
                } : undefined
            }
        });
    }
}

export default new StockService();
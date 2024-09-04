import { prisma } from "../prisma/prisma.js";
import { sendMessage } from "../rabbitmq.js";

class StockService {
    async createStock(data) {
        const stock = await prisma.stock.create({
            data: {
                Product: {connect: {id: data.productId}},
                Shop: {connect: {id: data.shopId}},
                quantityOnShelf: data.quantityOnShelf,
                quantityInOrder: data.quantityInOrder
            }
        });

        const product = await prisma.product.findUnique({
            where: { id: stock.productId },
            select: { plu: true }
        });

        const message = JSON.stringify({
            action: 'STOCK_CREATE',
            productId: stock.productId,
            shopId: stock.shopId,
            date: new Date(),
            plu: product.plu
        });
        await sendMessage(message);

        return { ...stock, plu: product.plu }
    }

    async increaseStock(data) {
        const stock = await prisma.stock.update({
            where: {id: parseInt(data.id)},
            data: {
                quantityOnShelf: {increment: data.quantityOnShelf},
                quantityInOrder: {increment: data.quantityInOrder}
            }
        });

        const product = await prisma.product.findUnique({
            where: { id: stock.productId },
            select: { plu: true }
        });

        const message = JSON.stringify({
            action: 'STOCK_INCREASE',
            productId: stock.productId,
            shopId: stock.shopId,
            date: new Date(),
            plu: product.plu
        });
        await sendMessage(message);

        return { ...stock, plu: product.plu }
    }

    async decreaseStock(data) {
        const stock = await prisma.stock.update({
            where: {id: parseInt(data.id)},
            data: {
                quantityOnShelf: {decrement: data.quantityOnShelf},
                quantityInOrder: {decrement: data.quantityInOrder}
            }
        });

        const product = await prisma.product.findUnique({
            where: { id: stock.productId },
            select: { plu: true }
        });

        // Отправка сообщения в RabbitMQ
        const message = JSON.stringify({
            action: 'STOCK_DECREASE',
            productId: stock.productId,
            shopId: stock.shopId,
            date: new Date(),
            plu: product.plu
        });
        await sendMessage(message);

        return { ...stock, plu: product.plu }
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
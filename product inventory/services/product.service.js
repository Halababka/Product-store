import { prisma } from "../prisma/prisma.js";
import { sendMessage } from "../rabbitmq.js";

class ProductService {
    async createProduct(data) {
        const product = await prisma.product.create({
            data: {
                plu: data.plu,
                name: data.name
            }
        });

        if (product) {
            const message = JSON.stringify({
                action: "PRODUCT_CREATE",
                productId: product.id,
                date: new Date(),
                plu: product.plu
            });
            await sendMessage(message);
        }
        
        return product;
    }

    async getProductsByFilters(filters) {
        return prisma.product.findMany({
            where: {
                name: filters.name ? {contains: filters.name} : undefined,
                plu: filters.plu ? filters.plu : undefined
            }
        });
    }
}

export default new ProductService();
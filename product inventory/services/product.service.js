import { prisma } from "../prisma/prisma.js";

class ProductService {
    async createProduct(data) {
        return prisma.product.create({
            data: {
                plu: data.plu,
                name: data.name
            }
        });
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
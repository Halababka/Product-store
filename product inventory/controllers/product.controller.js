import productService from "../services/product.service.js";

class ProductController {
    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error creating product', error });
        }
    }

    async getProductsByFilters(req, res) {
        try {
            const filters = req.query;
            const products = await productService.getProductsByFilters(filters);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }
}

export default new ProductController()
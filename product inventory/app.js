import express from 'express';
import productRoutes from "./routes/product.route.js";
import stockRoutes from "./routes/stock.route.js";

const app = express()
const port = 3000

app.use('/api', productRoutes);
app.use('/api', stockRoutes);

app.listen(port, () => {
    console.log(`Product inventory app listening on port ${port}`)
})
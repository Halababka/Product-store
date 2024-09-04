import express from 'express';
import historyRoutes from "./routes/history.routes";

const app = express();
const port = 3000;

app.use(express.json());

// Роуты для истории
app.use('/history', historyRoutes);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
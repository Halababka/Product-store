import express from 'express';
import historyRoutes from "./routes/history.routes";
import {connectRabbitMQ} from "./rabbitmq";

const app = express();
const port = 3001;

app.use(express.json());

// Роуты для истории
app.use('/history', historyRoutes);

// Инициализация подключения к RabbitMQ
connectRabbitMQ().then(() => {
  console.log('Connected to RabbitMQ successfully');
}).catch(error => {
  console.error('Failed to connect to RabbitMQ:', error);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
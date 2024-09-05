"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_routes_1 = __importDefault(require("./routes/history.routes"));
const rabbitmq_1 = require("./rabbitmq");
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
// Роуты для истории
app.use('/history', history_routes_1.default);
// Инициализация подключения к RabbitMQ
(0, rabbitmq_1.connectRabbitMQ)().then(() => {
    console.log('Connected to RabbitMQ successfully');
}).catch(error => {
    console.error('Failed to connect to RabbitMQ:', error);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

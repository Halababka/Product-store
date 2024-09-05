"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const history_service_1 = __importDefault(require("./services/history.service"));
const connectRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
        const connection = yield amqplib_1.default.connect(url);
        const channel = yield connection.createChannel();
        yield channel.assertQueue('product_actions', { durable: true });
        channel.consume('product_actions', (message) => __awaiter(void 0, void 0, void 0, function* () {
            if (message) {
                const content = message.content.toString();
                const actionData = JSON.parse(content);
                const { action, productId, shopId, date, plu } = actionData;
                // Обработка сообщения и сохранение в базу данных
                yield history_service_1.default.createHistory({ action, productId, shopId, date, plu });
                channel.ack(message);
            }
        }));
        console.log('Listening for messages from RabbitMQ...');
    }
    catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
    }
});
exports.connectRabbitMQ = connectRabbitMQ;

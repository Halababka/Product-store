import amqp from "amqplib";
import historyService from "./services/history.service";

export const connectRabbitMQ = async () => {
  try {
    const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672'
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    await channel.assertQueue('product_actions', {durable: true});

    channel.consume('product_actions', async (message) => {
      if (message) {
        const content = message.content.toString();
        const actionData = JSON.parse(content);
        const {action, productId, shopId, date, plu} = actionData;

        // Обработка сообщения и сохранение в базу данных
        await historyService.createHistory({action, productId, shopId, date, plu})

        channel.ack(message);
      }
    });

    console.log('Listening for messages from RabbitMQ...');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
};
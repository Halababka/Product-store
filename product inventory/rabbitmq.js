import amqp from 'amqplib';
import 'dotenv/config'

let channel

export const connectRabbitMQ = async () => {
    try {
        const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672'
        const connection = await amqp.connect(url);
        channel = await connection.createChannel();
        await channel.assertQueue('product_actions', { durable: true });
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
    }
};

export const sendMessage = async (message) => {
    try {
        if (!channel) {
            throw new Error('RabbitMQ channel is not initialized');
        }
        channel.sendToQueue('product_actions', Buffer.from(message), {
            persistent: true,
        });
    } catch (error) {
        console.error('Failed to send message to RabbitMQ', error);
    }
};
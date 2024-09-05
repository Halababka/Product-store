# Укажите базовый образ с Node.js
FROM node:18

# Создайте директорию для приложения
WORKDIR /usr/src/app

# Скопируйте package.json и package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Установите зависимости
RUN npm install

ARG PRISMA_BINARY_TARGETS
ENV PRISMA_BINARY_TARGETS $PRISMA_BINARY_TARGETS

RUN npx prisma generate

# Скопируйте все файлы проекта в рабочую директорию
COPY . .

# Укажите команду для запуска приложения
CMD [ "sh", "-c", "npx prisma migrate dev --name init && npx prisma db seed && npm run start" ]

# Откройте порт, на котором будет работать приложение
EXPOSE 3000

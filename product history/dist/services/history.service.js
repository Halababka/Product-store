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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma/prisma");
// Создание записи в истории
const createHistory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return prisma_1.prisma.actionHistory.create({
        data: Object.assign(Object.assign({}, data), { shopId: (_a = data.shopId) !== null && _a !== void 0 ? _a : null }),
    });
});
// Получение истории по фильтрам с постраничной навигацией
const getHistory = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId, plu, startDate, endDate, action, skip, take } = filters;
    return prisma_1.prisma.actionHistory.findMany({
        where: {
            shopId: shopId,
            plu: plu,
            action: action,
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
        skip: skip,
        take: take,
        orderBy: {
            date: 'desc',
        },
    });
});
exports.default = {
    createHistory,
    getHistory,
};

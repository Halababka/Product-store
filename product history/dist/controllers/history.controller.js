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
const history_service_1 = __importDefault(require("../services/history.service"));
// Создание записи в истории
const createHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { action, productId, shopId, date, plu } = req.body;
        const history = yield history_service_1.default.createHistory({
            action,
            productId,
            shopId,
            date: new Date(date),
            plu, // Передаем PLU
        });
        res.status(201).json(history);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ error: errorMessage });
    }
});
// Получение истории по фильтрам
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shopId, plu, startDate, endDate, action, skip, take } = req.query;
        const filters = {
            shopId: shopId ? parseInt(shopId, 10) : undefined,
            plu: plu,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            action: action,
            skip: skip ? parseInt(skip, 10) : 0,
            take: take ? parseInt(take, 10) : 10,
        };
        const history = yield history_service_1.default.getHistory(filters);
        res.status(200).json(history);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ error: errorMessage });
    }
});
exports.default = {
    createHistory,
    getHistory,
};

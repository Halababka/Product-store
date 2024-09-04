import { Request, Response } from 'express';
import historyService from "../services/history.service";
// Создание записи в истории
const createHistory = async (req: Request, res: Response) => {
  try {
    const { action, productId, shopId, date, plu } = req.body;
    const history = await historyService.createHistory({
      action,
      productId,
      shopId,
      date: new Date(date),
      plu,  // Передаем PLU
    });
    res.status(201).json(history);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Получение истории по фильтрам
const getHistory = async (req: Request, res: Response) => {
  try {
    const { shopId, plu, startDate, endDate, action, skip, take } = req.query;
    const filters = {
      shopId: shopId ? parseInt(shopId as string, 10) : undefined,
      plu: plu as string,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      action: action as string,
      skip: skip ? parseInt(skip as string, 10) : 0,
      take: take ? parseInt(take as string, 10) : 10,
    };

    const history = await historyService.getHistory(filters);
    res.status(200).json(history);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

export default {
  createHistory,
  getHistory,
};
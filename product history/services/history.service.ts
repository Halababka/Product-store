import {prisma} from "../prisma/prisma";

// Тип для фильтров
type HistoryFilters = {
  shopId?: number;
  plu?: string;
  startDate?: Date;
  endDate?: Date;
  action?: string;
  skip?: number;
  take?: number;
};

// Создание записи в истории
const createHistory = async (data: {
  action: string;
  productId: number;
  date: Date;
  plu: string;
  shopId: number;
}) => {
  return prisma.actionHistory.create({
    data: {
      ...data,
      shopId: data.shopId ?? null,
    },
  });
};

// Получение истории по фильтрам с постраничной навигацией
const getHistory = async (filters: HistoryFilters) => {
  const { shopId, plu, startDate, endDate, action, skip, take } = filters;

  return prisma.actionHistory.findMany({
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
};

export default {
  createHistory,
  getHistory,
};
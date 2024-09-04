import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProblemsFlag(): Promise<number> {
    // Получаем количество пользователей с проблемами
    const usersWithProblemsCount = await this.prisma.user.count({
      where: {
        problems: true,
      },
    });

    // Обновляем флаг проблем у всех пользователей на false
    await this.prisma.user.updateMany({
      where: {
        problems: true,
      },
      data: {
        problems: false,
      },
    });

    return usersWithProblemsCount;
  }
}

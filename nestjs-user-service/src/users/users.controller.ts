import { Controller, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update-problems')
  @HttpCode(HttpStatus.OK)
  async updateProblemsFlag() {
    const count = await this.usersService.updateProblemsFlag();
    return { message: `Updated problems flag for ${count} users` };
  }
}

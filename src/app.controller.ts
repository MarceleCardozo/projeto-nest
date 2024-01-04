import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './auth/decorators/is-public-decorator';

@Controller('app')
export class AppController {
  @IsPublic()
  @Get()
  findAll() {
    return [];
  }
}

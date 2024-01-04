/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/constants/constants';

@Controller('app')
export class AppController {
  @Public()
  @Get()
  findAll() {
    return [];
  }
}

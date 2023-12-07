import {
  Controller,
  Get,
  Bind,
  Req,
  Post,
  HttpCode,
  Header,
  Body,
} from '@nestjs/common';
import { CreateCatDto } from './create-catDto';

@Controller('cats')
export class CatsController {
  @Get()
  @Bind(Req())
  findAll(): string {
    return 'This should return all cats';
  }

  @Post()
  @HttpCode(204)
  @Header('cache-control', 'none')
  create(@Body() catDto: CreateCatDto) {
    return 'Create post ';
  }
}

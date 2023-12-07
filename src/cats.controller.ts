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
import { CatService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatService) {}
  @Get()
  @Bind(Req())
  findAll() {
    return this.catService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() catDto: CreateCatDto) {
    return this.catService.create(catDto);
  }
}

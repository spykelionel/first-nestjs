import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './create-catDto';

@Injectable()
export class CatService {
  findAll(): string {
    return 'This should return all cats';
  }
  create(catDto: CreateCatDto): string {
    return `Create post ${JSON.stringify(catDto)}`;
  }
}

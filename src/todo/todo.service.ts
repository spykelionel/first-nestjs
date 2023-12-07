import { Injectable } from '@nestjs/common';

@Injectable()
export default class TodoService {
  getAll(): string {
    return 'get all todos';
  }
}

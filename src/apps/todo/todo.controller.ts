import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import TodoService from './todo.service';
import { CreateTodoDTO, UpdateTodoDTO } from './data/todo.dto';

@Controller('todo')
export default class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getAll() {
    return this.todoService.findAllTodos();
  }

  @Get(':id')
  getSingleTodo(@Param('id') id: number) {
    return this.todoService.getSingleTodo(id);
  }

  @Delete(':id')
  deleteSingleTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDTO) {
    return this.todoService.addTodo(createTodoDto);
  }

  @Put(':id')
  updateTodo(@Param('id') id: number, @Body() payload: UpdateTodoDTO) {
    return this.todoService.updateSingleTodo(id, payload);
  }
}

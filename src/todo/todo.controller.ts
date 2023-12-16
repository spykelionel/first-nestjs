import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import TodoService from './todo.service';
import CreateTodoDTO from './dto/create-todo.dto';
import { Todo } from './Todo';
import { UpdateTodoDTO } from './dto/update-todo.dto';

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

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDTO) {
    return this.todoService.addTodo(createTodoDto);
  }

  @Put(':id')
  updateTodo(@Param('id') id: number, payload: UpdateTodoDTO) {
    return this.todoService.updateSingleTodo(id, payload);
  }

  @Post('many')
  createMany() {
    return this.todoService.createMany();
  }
}

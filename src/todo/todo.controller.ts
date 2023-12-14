import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import TodoService from './todo.service';
import CreateTodoDTO from './dto/create-todo.dto';
import { Todo } from './Todo';

@Controller('todo')
export default class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getAll(): Todo[] {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  getSingleTodo(@Param('id') id: number): CreateTodoDTO {
    return this.todoService.getTodoById(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDTO) {
    return this.todoService.createTodo(createTodoDto);
  }
}

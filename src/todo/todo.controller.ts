import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import TodoService from './todo.service';
import CreateTodoDTO from './dto/create-todo.dto';
import { Todo } from './Todo';
import { UpdateTodoDTO } from './dto/update-todo.dto';

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
  createTodo(@Body() createTodoDto: CreateTodoDTO): Todo {
    return this.todoService.createTodo(createTodoDto);
  }

  @Put(':id')
  updateTodo(@Param('id') id: number, payload: UpdateTodoDTO): Todo | String {
    return this.todoService.updateTodo(id, payload);
  }
}

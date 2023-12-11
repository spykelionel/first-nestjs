import { Injectable } from '@nestjs/common';
import { Todo } from './Todo';
import CreateTodoDTO from './dto/create-todo.dto';

const init: Todo[] = [
  {
    title: 'A todo',
    status: 'pending',
    id: 1,
  },
  {
    title: 'A todo',
    status: 'pending',
    id: 2,
  },
  {
    title: 'A todo',
    status: 'pending',
    id: 3,
  },
];
@Injectable()
export default class TodoService {
  private readonly todos: Todo[] = init;
  getAll(): Todo[] {
    return this.todos;
  }

  creatTodo(createTodoDto: CreateTodoDTO): CreateTodoDTO {
    const newTodo = { ...createTodoDto, id: this.todos.length + 1 };
    this.todos.push(newTodo);
    return newTodo;
  }

  getSingleTodo(id: number): CreateTodoDTO {
    const todo: Todo = this.todos.find((t) => t.id === id);
    return todo;
  }
}

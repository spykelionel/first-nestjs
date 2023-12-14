import { Injectable } from '@nestjs/common';
import { Todo } from './Todo';
import CreateTodoDTO from './dto/create-todo.dto';
import { TodoDAO } from './dao/todo-dao';
import { UpdateTodoDTO } from './dto/update-todo.dto';

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
export default class TodoService implements TodoDAO {
  deleteTodo(todo: Todo): Todo {
    throw new Error('Method not implemented.');
  }
  updateTodo<K extends keyof UpdateTodoDTO>(
    id: number,
    payload: Pick<UpdateTodoDTO, K>,
  ): Todo | undefined | TypeError {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return undefined;

    try {
      for (const key in payload) {
        if (payload.hasOwnProperty(key)) {
          if (todo.hasOwnProperty(key)) {
            (todo as any)[key] = (payload as any)[key];
          }
        }
      }
    } catch (error: any) {
      throw new TypeError(error);
    }
  }
  private readonly todos: Todo[] = init;
  getAllTodos(): Todo[] {
    return this.todos;
  }

  createTodo(createTodoDto: CreateTodoDTO): CreateTodoDTO {
    const newTodo: Todo = {
      ...createTodoDto,
      status: 'pending',
      id: this.todos.length + 1,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  getTodoById(id: number): CreateTodoDTO | undefined {
    const todo: Todo = this.todos.find((t) => t.id === id);
    if (todo === undefined) {
      return undefined;
    }
    return todo;
  }
}

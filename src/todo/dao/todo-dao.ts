import { Todo } from '../Todo';
import CreateTodoDTO from '../dto/create-todo.dto';

export interface TodoDAO {
  getTodoById(id: number): Todo | undefined;
  createTodo(todo: CreateTodoDTO): CreateTodoDTO;
  deleteTodo(todo: Todo): Todo;
  updateTodo(todo: Todo): Todo;
  getAllTodos(): Todo[];
}

class TodoService implements TodoDAO {
  constructor() {}
  getTodoById(id: number): Todo {
    throw new Error('Method not implemented.');
  }
  createTodo(todo: CreateTodoDTO): Todo {
    throw new Error('Method not implemented.');
  }
  deleteTodo(todo: Todo): Todo {
    throw new Error('Method not implemented.');
  }
  updateTodo(todo: Todo): Todo {
    throw new Error('Method not implemented.');
  }
  getAllTodos(): Todo[] {
    throw new Error('Method not implemented.');
  }
}

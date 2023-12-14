import { Todo } from '../Todo';
import CreateTodoDTO from '../dto/create-todo.dto';
import { UpdateTodoDTO } from '../dto/update-todo.dto';

export interface ITodoDAO {
  getTodoById(id: number): Todo | undefined;
  createTodo(todo: CreateTodoDTO): CreateTodoDTO;
  deleteTodo(todo: Todo): Todo;
  updateTodo(id: number, payload: UpdateTodoDTO): Todo | undefined | string;
  getAllTodos(): Todo[];
}

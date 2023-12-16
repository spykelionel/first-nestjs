import { DeleteResult, InsertResult } from 'typeorm';
import { Todo } from '../Todo';
import CreateTodoDTO from '../dto/create-todo.dto';
import { UpdateTodoDTO } from '../dto/update-todo.dto';
import { Todo as ETodo } from '../todo.entity';

export interface ITodoDAO {
  getSingleTodo(id: number): Promise<ETodo> | undefined;
  addTodo(todo: CreateTodoDTO): Promise<InsertResult>;
  deleteTodo(id: number): Promise<DeleteResult>;
  updateTodo(id: number, payload: UpdateTodoDTO): Todo | undefined | string;
  findAllTodos(): Promise<ETodo[]>;
}

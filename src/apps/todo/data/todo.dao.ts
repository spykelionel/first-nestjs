import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Todo } from '../Todo';
import { CreateTodoDTO, UpdateTodoDTO } from './todo.dto';
import { Todo as ETodo } from './todo.entity';

export interface ITodoDAO {
  /**
   * A method to return a single todo from the database
   * @param id A unique integer representing the Id of the todo.
   * @returns (Todo) A single todo item from the database
   */
  getSingleTodo(id: number): Promise<ETodo> | undefined;

  /**
   *
   * @param createTodoDto The todo object to be created
   * @returns Insert results
   */
  addTodo(todo: CreateTodoDTO): Promise<InsertResult>;

  /**
   *
   * @param id The id of the todo to be deleted
   * @returns Delete results
   */
  deleteTodo(id: number): Promise<DeleteResult>;

  /**
   * This is a native implementation of the update(todo) method.
   * It updates just the fields specified in the payload.
   * @param id The id of the todo to be updated
   * @param payload The new todo object
   * @returns an updated Todo
   */
  updateTodo(id: number, payload: UpdateTodoDTO): Todo | undefined | string;

  /**
   *
   * @param id The id of the todo to be updated
   * @param payload The new todo object
   * @returns Promise<UpdateResult>
   */
  updateSingleTodo(id: number, payload: UpdateTodoDTO): Promise<UpdateResult>;

  /**
   * This method returns all todos from the database
   * @returns A promise that resolves to all Todos.
   */
  findAllTodos(): Promise<ETodo[]>;
}

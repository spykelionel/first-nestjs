import { Injectable } from '@nestjs/common';
import { Todo } from './Todo';
import { CreateTodoDTO, UpdateTodoDTO } from './data/todo.dto';
import { ITodoDAO } from './data/todo.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo as ETodo } from './data/todo.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

const init: CreateTodoDTO[] = [
  {
    title: 'Todo from my app 1',
    status: 'pending',
  },
  {
    title: 'A todo from my app 2',
    status: 'pending',
  },
  {
    title: 'Another todo from my app 3',
    status: 'pending',
  },
];
@Injectable()
export default class TodoService implements ITodoDAO {
  /**
   * A constructor responsible for injecting dependencies
   * of the TodoService.
   * @param todoRepository The database repository to inject
   */
  constructor(
    @InjectRepository(ETodo)
    private todoRepository: Repository<ETodo>,
  ) {}
  private readonly todos: Todo[] = init;

  /**
   *
   * @param id The id of the todo to be deleted
   * @returns Delete results
   */
  deleteTodo(id: number): Promise<DeleteResult> {
    return this.todoRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  /**
   * This is a native implementation of the update(todo) method.
   * It updates just the fields specified in the payload.
   * @param id The id of the todo to be updated
   * @param payload The new todo object
   * @returns an updated Todo
   */
  updateTodo<K extends keyof UpdateTodoDTO>(
    id: number,
    payload: Pick<UpdateTodoDTO, K>,
  ): Todo | undefined | string {
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
      return todo;
    } catch (error: any) {
      const updateError = new TypeError(error);
      return updateError.message;
    }
  }

  /**
   *
   * @param id The id of the todo to be updated
   * @param payload The new todo object
   * @returns Promise<UpdateResult>
   */
  updateSingleTodo(id: number, payload: UpdateTodoDTO): Promise<UpdateResult> {
    // Ensure that payload is an object with at least one field set
    if (Object.keys(payload).length === 0) {
      return Promise.reject(
        new Error('Update payload must have at least one field set.'),
      );
    }

    return this.todoRepository
      .createQueryBuilder()
      .update(ETodo)
      .set(payload)
      .where('id = :id', { id })
      .execute();
  }

  /**
   *
   * @returns A promise that resolves to all Todos.
   */
  findAllTodos(): Promise<ETodo[]> {
    return this.todoRepository.find();
  }

  /**
   *
   * @param createTodoDto The todo object to be created
   * @returns Insert results
   */
  addTodo(createTodoDto: CreateTodoDTO): Promise<InsertResult> {
    return this.todoRepository.insert(createTodoDto);
  }

  /**
   * This implementation doesn't work. Currently at least.
   * It is meant for transactions. Uploading several todos.
   */
  createMany() {
    return this.todoRepository.manager.transaction(async (manager) => {
      init.forEach(async (value) => await manager.save(value));
    });
  }

  /**
   * A method to return a single todo from the database
   * @param id A unique integer representing the Id of the todo.
   * @returns (Todo) A single todo item from the database
   */
  getSingleTodo(id: number): Promise<ETodo> | undefined {
    return this.todoRepository.findOneBy({ id: id });
  }
}

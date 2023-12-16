import { Injectable } from '@nestjs/common';
import { Todo } from './Todo';
import CreateTodoDTO from './dto/create-todo.dto';
import { ITodoDAO } from './dao/todo-dao';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo as ETodo } from './todo.entity';
import { Repository } from 'typeorm';

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
  constructor(
    @InjectRepository(ETodo)
    private todoRepository: Repository<ETodo>,
  ) {}
  private readonly todos: Todo[] = init;

  deleteTodo(todo: Todo): Todo {
    throw new Error('Method not implemented.');
  }

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

  updateSingleTodo(id: number, payload: UpdateTodoDTO) {
    return this.todoRepository.update({ id: id }, payload);
  }

  findAllTodos(): Promise<ETodo[]> {
    return this.todoRepository.find();
  }

  addTodo(createTodoDto: CreateTodoDTO) {
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

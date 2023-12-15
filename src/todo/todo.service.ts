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

  getAllTodos(): Todo[] {
    return this.todos;
  }

  findAllTodos(): Promise<ETodo[]> {
    return this.todoRepository.find();
  }

  addTodo(createTodoDto: CreateTodoDTO) {
    return this.todoRepository.insert(createTodoDto);
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

  /**
   * This implementation doesn't work. Currently at least.
   */
  createMany() {
    return this.todoRepository.manager.transaction(async (manager) => {
      manager.save(init);
    });
  }

  getSingleTodo(id: number): Promise<ETodo> | string {
    return this.todoRepository.findOneBy({ id: id });
  }
}

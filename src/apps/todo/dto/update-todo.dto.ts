import CreateTodoDTO from './create-todo.dto';

export class UpdateTodoDTO extends CreateTodoDTO {
  status: 'pending' | 'completed';
  title: string;
}

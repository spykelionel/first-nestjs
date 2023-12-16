export class CreateTodoDTO {
  title: string;
  status: 'pending' | 'completed' = 'pending';
}

export class UpdateTodoDTO extends CreateTodoDTO {
  status: 'pending' | 'completed';
  title: string;
}

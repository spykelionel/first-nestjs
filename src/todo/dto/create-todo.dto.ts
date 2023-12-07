export default class CreateTodoDTO {
  title: string;
  status: 'pending' | 'completed' = 'pending';
}

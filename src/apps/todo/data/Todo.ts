export interface Todo {
  title: string;
  status: 'pending' | 'completed';
  id?: number;
}

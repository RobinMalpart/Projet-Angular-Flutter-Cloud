export interface Task {
  id?: string;
  date?: Date;
  content: string;
  done: boolean;
  userId?: string;
}
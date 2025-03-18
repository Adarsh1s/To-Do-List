export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: Priority;
  completed: boolean;
  tags: string[];
  created_at: string;
  user_id: string;
  list_id?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  user_id: string;
}

export interface List {
  id: string;
  name: string;
  color: string;
  user_id: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}

export interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'created_at' | 'user_id'>) => void;
  availableTags: Tag[];
  availableLists: List[];
}
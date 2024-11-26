// src/app/models/toast.model.ts
export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}
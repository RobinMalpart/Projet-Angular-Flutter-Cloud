
// src/app/services/toast.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  private toastId = 0;

  getToasts(): Observable<Toast> {
    return this.toastSubject.asObservable();
  }

  showToast(type: 'success' | 'error' | 'info', message: string) {
    const toast: Toast = {
      id: this.toastId++,
      type,
      message
    };
    this.toastSubject.next(toast);
  }
}
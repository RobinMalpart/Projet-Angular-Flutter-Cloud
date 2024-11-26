// src/app/components/toast/toast.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../models/toast.model';

interface RenderedToast extends Toast {
  show: boolean;
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts: RenderedToast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToasts().subscribe(toast => {
      this.toasts.push({ ...toast, show: true });
      // Auto-dismiss 3 sec
      setTimeout(() => this.removeToast(toast.id), 2000);
    });
  }

  removeToast(id: number) {
    const index = this.toasts.findIndex(t => t.id === id);
    if (index !== -1) {
      this.toasts[index].show = false;
      // Wait end
      setTimeout(() => {
        this.toasts.splice(index, 1);
      }, 300);
    }
  }
}
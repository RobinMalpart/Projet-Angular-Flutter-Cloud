// src/app/task/task.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();
  @Output() toggle = new EventEmitter<Task>();

  onDelete() {
    this.delete.emit(this.task.id!);
  }

  onEdit() {
    this.edit.emit(this.task);
  }

  onToggle() {
    this.toggle.emit(this.task);
  }
}
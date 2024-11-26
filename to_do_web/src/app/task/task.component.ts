// to_do_web/src/app/task/task.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;

  @Output() deleteTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() toggleTask = new EventEmitter<Task>();

  onDelete() {
    this.deleteTask.emit(this.task.id!);
  }

  onEdit() {
    this.editTask.emit(this.task);
  }

  onToggle() {
    this.toggleTask.emit(this.task);
  }
}
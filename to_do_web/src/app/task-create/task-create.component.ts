// src/app/task-create/task-create.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  newTask: Task = { title: '', description: '', completed: false };

  addTask() {
    if (this.newTask.title.trim()) {
      this.taskAdded.emit(this.newTask);
      this.newTask = { title: '', description: '', completed: false };
    }
  }
}
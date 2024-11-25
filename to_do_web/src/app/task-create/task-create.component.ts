// to_do_web/src/app/task-create/task-create.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  newTaskContent: string = '';
  @Output() taskAdded = new EventEmitter<Task>();

  addTask() {
    if (this.newTaskContent.trim()) {
      const task: Task = {
        content: this.newTaskContent.trim(),
        done: false
      };
      this.taskAdded.emit(task);
      this.newTaskContent = '';
    }
  }
}
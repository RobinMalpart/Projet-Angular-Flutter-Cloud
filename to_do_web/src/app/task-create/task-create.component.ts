import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  @Output() taskAdded = new EventEmitter<Task>();

  addTask(newTask: string) {
    const task: Task = { title: newTask, description: '' };
    this.taskAdded.emit(task);
  }
}
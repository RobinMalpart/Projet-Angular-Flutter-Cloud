// app.component.ts
import { Component } from '@angular/core';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo_Web';
  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }
  ];

  // Propriétés pour le modal d'édition
  isEditModalOpen = false;
  currentTaskIndex: number | null = null;
  editedTask: Task = { title: '', description: '' };

  addTask(task: Task) {
    this.todo.push(task);
  }

  deleteTask(index: number) {
    this.todo.splice(index, 1);
  }

  openEditModal(index: number) {
    this.currentTaskIndex = index;
    this.editedTask = { ...this.todo[index] };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.currentTaskIndex = null;
  }

  saveTask() {
    if (this.currentTaskIndex !== null) {
      this.todo[this.currentTaskIndex] = { ...this.editedTask };
      this.closeEditModal();
    }
  }
}
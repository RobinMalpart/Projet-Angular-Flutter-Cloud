import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  newTaskContent: string = '';
  @Output() taskAdded = new EventEmitter<Task>();
  currentUser: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  addTask() {
    if (this.newTaskContent.trim()) {
      if (!this.currentUser) {
        console.error('No user connected');
        return;
      }
      const task: Task = {
        date: new Date(),
        content: this.newTaskContent.trim(),
        done: false,
        userId: this.currentUser.uid
      };
      this.taskAdded.emit(task);
      this.newTaskContent = '';
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Task } from 'src/app/components/task/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'ToDo_Web';
  currentUser: User | null = null;

  constructor(
    private firestore: Firestore,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        // Load tasks logic moved to TaskListComponent
        this.router.navigate(['/tasks']);
      } else {
        // Handle user not logged in
        this.toastService.showToast('info', 'Veuillez vous connecter pour voir vos tâches.');
      }
    });
  }

  ngOnInit() {}

  addTask(task: Task) {
    // Handle task added event
    this.toastService.showToast('success', 'Tâche ajoutée avec succès!');
  }
}
import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Task } from 'src/app/components/task/task';
import { collectionData } from '@angular/fire/firestore';
import { trigger, style, transition, animate, stagger } from '@angular/animations';
import { query as animQuery } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'ToDo_Web';
  currentUser: User | null = null;
  tasksCollection: CollectionReference;

  todo$!: Observable<Task[]>;
  isEditModalOpen: boolean = false;
  currentTaskIndex: number | null = null;
  editedTask: Task = { id: '', content: '', done: false };

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    // Initialize tasksCollection after firestore is available
    this.tasksCollection = collection(this.firestore, 'task');

    // Subscribe to user authentication changes
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.loadTasks();
      } else {
        // If not authenticated, set todo$ to an empty observable
        this.todo$ = new Observable<Task[]>((observer) => observer.next([]));
      }
    });
  }

  ngOnInit() {
    // Any additional initialization logic can go here
  }

  // Load Tasks
  loadTasks() {
    if (!this.currentUser) {
      this.toastService.showToast(
        'error',
        'Vous devez être connecté pour afficher les tâches.'
      );
      this.router.navigate(['/login']);
      return;
    }
    const q = query(
      this.tasksCollection,
      where('userId', '==', this.currentUser.uid),
      orderBy('date', 'desc')
    );
    this.todo$ = collectionData(q, { idField: 'id' }) as Observable<Task[]>;
  }

  // Add Task
  async addTask(task: Task) {
    if (!this.currentUser) {
      this.toastService.showToast(
        'error',
        'Vous devez être connecté pour ajouter une tâche.'
      );
      return;
    }
    try {
      const docRef = await addDoc(this.tasksCollection, {
        content: task.content,
        done: task.done,
        date: task.date,
        userId: this.currentUser.uid,
      });
      this.toastService.showToast('success', 'Tâche ajoutée avec succès!');
    } catch (e) {
      console.error("Erreur lors de l'ajout de la tâche : ", e);
      this.toastService.showToast('error', "Erreur lors de l'ajout de la tâche.");
    }
  }

  // Delete Task
  async deleteTask(id: string) {
    if (!this.currentUser) {
      this.toastService.showToast(
        'error',
        'Vous devez être connecté pour supprimer une tâche.'
      );
      return;
    }
    try {
      const taskDoc = doc(this.firestore, `task/${id}`);
      await deleteDoc(taskDoc);
      this.toastService.showToast('success', 'Tâche supprimée avec succès!');
    } catch (e) {
      console.error('Erreur lors de la suppression de la tâche : ', e);
      this.toastService.showToast(
        'error',
        'Erreur lors de la suppression de la tâche.'
      );
    }
  }

  // Open Edit
  openEditModal(task: Task) {
    this.isEditModalOpen = true;
    this.editedTask = { ...task };
  }

  // Save Task
  async saveTask() {
    if (this.editedTask.id) {
      try {
        const taskDoc = doc(this.firestore, `task/${this.editedTask.id}`);
        await updateDoc(taskDoc, {
          content: this.editedTask.content,
          done: this.editedTask.done,
        });
        this.toastService.showToast('success', 'Tâche mise à jour avec succès!');
        this.isEditModalOpen = false;
      } catch (e) {
        console.error('Erreur lors de la mise à jour de la tâche : ', e);
        this.toastService.showToast(
          'error',
          'Erreur lors de la mise à jour de la tâche.'
        );
      }
    }
  }

  // Close Edit
  closeEditModal() {
    this.isEditModalOpen = false;
    this.currentTaskIndex = null;
    this.toastService.showToast('info', 'Modification annulée.');
  }

  // Switch Task Status
  async toggleCompleted(task: Task) {
    if (task.id) {
      try {
        const taskDoc = doc(this.firestore, `task/${task.id}`);
        await updateDoc(taskDoc, {
          done: task.done,
        });
        this.toastService.showToast('info', 'Statut de la tâche mis à jour.');
      } catch (e) {
        console.error(
          'Erreur lors de la mise à jour du statut de la tâche : ',
          e
        );
        this.toastService.showToast(
          'error',
          'Erreur lors de la mise à jour du statut.'
        );
      }
    }
  }
}

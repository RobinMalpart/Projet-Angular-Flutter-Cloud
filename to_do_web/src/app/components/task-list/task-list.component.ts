import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task/task';
import { Firestore, collection, query, where, orderBy, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() currentUser: User | null = null;
  @Output() taskAdded = new EventEmitter<Task>();

  tasksCollection = collection(this.firestore, 'task');
  todo$!: Observable<Task[]>;
  isEditModalOpen: boolean = false;
  editedTask: Task = { id: '', content: '', done: false };

  constructor(
    private firestore: Firestore,
    private toastService: ToastService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    if (this.currentUser) {
      this.loadTasks();
    }
  }

  loadTasks() {
    if (!this.currentUser) {
      this.toastService.showToast('error', 'Vous devez être connecté pour afficher les tâches.');
      return;
    }
    const q = query(this.tasksCollection, where('userId', '==', this.currentUser.uid), orderBy('date', 'desc'));
    this.todo$ = collectionData(q, { idField: 'id' }) as Observable<Task[]>;
  }

  async addTask(task: Task) {
    if (!this.currentUser) {
      this.toastService.showToast('error', 'Vous devez être connecté pour ajouter une tâche.');
      return;
    }
    try {
      const docRef = await addDoc(this.tasksCollection, {
        content: task.content,
        done: task.done,
        date: task.date,
        userId: this.currentUser.uid
      });
      console.log('Tâche ajoutée avec ID : ', docRef.id);
      this.toastService.showToast('success', 'Tâche ajoutée avec succès!');
      this.taskAdded.emit(task);
    } catch (e) {
      console.error('Erreur lors de l\'ajout de la tâche : ', e);
      this.toastService.showToast('error', 'Erreur lors de l\'ajout de la tâche.');
    }
  }

  async deleteTask(id: string) {
    if (!this.currentUser) {
      this.toastService.showToast('error', 'Vous devez être connecté pour supprimer une tâche.');
      return;
    }
    try {
      const taskDoc = doc(this.firestore, `task/${id}`);
      await deleteDoc(taskDoc);
      console.log('Tâche supprimée avec ID : ', id);
      this.toastService.showToast('success', 'Tâche supprimée avec succès!');
    } catch (e) {
      console.error('Erreur lors de la suppression de la tâche : ', e);
      this.toastService.showToast('error', 'Erreur lors de la suppression de la tâche.');
    }
  }

  openEditModal(task: Task) {
    this.isEditModalOpen = true;
    this.editedTask = { ...task };
  }

  async saveTask() {
    if (this.editedTask.id) {
      try {
        const taskDoc = doc(this.firestore, `task/${this.editedTask.id}`);
        await updateDoc(taskDoc, {
          content: this.editedTask.content,
          done: this.editedTask.done
        });
        console.log('Tâche mise à jour avec ID : ', this.editedTask.id);
        this.toastService.showToast('success', 'Tâche mise à jour avec succès!');
        this.isEditModalOpen = false;
      } catch (e) {
        console.error('Erreur lors de la mise à jour de la tâche : ', e);
        this.toastService.showToast('error', 'Erreur lors de la mise à jour de la tâche.');
      }
    }
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  async toggleCompleted(task: Task) {
    if (task.id) {
      try {
        const taskDoc = doc(this.firestore, `task/${task.id}`);
        await updateDoc(taskDoc, {
          done: task.done
        });
        console.log('Statut de la tâche mis à jour pour ID : ', task.id);
        this.toastService.showToast('info', 'Statut de la tâche mis à jour.');
      } catch (e) {
        console.error('Erreur lors de la mise à jour du statut de la tâche : ', e);
        this.toastService.showToast('error', 'Erreur lors de la mise à jour du statut.');
      }
    }
  }
}
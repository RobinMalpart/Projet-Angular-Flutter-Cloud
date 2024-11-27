import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { where } from 'firebase/firestore';
import { RouterModule } from '@angular/router';
import { Task } from 'src/app/components/task/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
  
export class HomeComponent implements OnInit {
  title = 'ToDo_Web';
  currentUser: User | null = null;
  tasksCollection = collection(this.firestore, 'task');
  
  todo$!: Observable<Task[]>;
  isEditModalOpen: boolean = false;
  currentTaskIndex: number | null = null;
  editedTask: Task = { id: '', content: '', done: false };

  constructor(
    private firestore: Firestore,
    private toastService: ToastService,
    private authService: AuthService,
  ) {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadTasks();
      } else {
        this.todo$ = new Observable<Task[]>(observer => observer.next([]));
      }
    });
  }

  ngOnInit() {
  }

  // Load Tasks
  loadTasks() {
    if (!this.currentUser) {
      return;
    }
    console.log('Chargement des tâches pour l\'utilisateur : ', this.currentUser.uid);
    const q = query(this.tasksCollection,  where('userId', '==', this.currentUser.uid)
    );
    this.todo$ = new Observable<Task[]>(observer => {
      
      getDocs(q).then(snapshot => {
        const tasks: Task[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as Task;
          console.log('Tâche récupérée :', data);
          tasks.push({ id: docSnap.id, ...data });
        });
        observer.next(tasks);
        observer.complete();
      }).catch(error => {
        observer.error(error);
        this.toastService.showToast('error', 'Erreur lors du chargement des tâches.');
      });
    });
  }

  // Add Task
  async addTask(task: Task) {
    if (!this.currentUser) {
      this.toastService.showToast('error', 'Vous devez être connecté pour ajouter une tâche.');
      return;
    }
    try {
      const docRef = await addDoc(this.tasksCollection, {
        content: task.content,  
        done: task.done,
        userId: this.currentUser.uid
      });
      console.log('Tâche ajoutée avec ID : ', docRef.id);
      this.toastService.showToast('success', 'Tâche ajoutée avec succès!');
      this.loadTasks();
    } catch (e) {
      console.error('Erreur lors de l\'ajout de la tâche : ', e);
      this.toastService.showToast('error', 'Erreur lors de l\'ajout de la tâche.');
    }
  }

  // Delete Task
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
      this.loadTasks();
    } catch (e) {
      console.error('Erreur lors de la suppression de la tâche : ', e);
      this.toastService.showToast('error', 'Erreur lors de la suppression de la tâche.');
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
          done: this.editedTask.done
        });
        console.log('Tâche mise à jour avec ID : ', this.editedTask.id);
        this.toastService.showToast('success', 'Tâche mise à jour avec succès!');
        this.isEditModalOpen = false;
        this.loadTasks();
      } catch (e) {
        console.error('Erreur lors de la mise à jour de la tâche : ', e);
        this.toastService.showToast('error', 'Erreur lors de la mise à jour de la tâche.');
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
          done: task.done
        });
        console.log('Statut de la tâche mis à jour pour ID : ', task.id);
        this.toastService.showToast('info', 'Statut de la tâche mis à jour.');
        this.loadTasks();
      } catch (e) {
        console.error('Erreur lors de la mise à jour du statut de la tâche : ', e);
        this.toastService.showToast('error', 'Erreur lors de la mise à jour du statut.');
      }
    }
  }
}
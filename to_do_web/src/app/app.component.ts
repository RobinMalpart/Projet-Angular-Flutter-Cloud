// to_do_web/src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, orderBy } from '@angular/fire/firestore';
import { Task } from './task/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ToDo_Web';
  
  todo$!: Observable<Task[]>; // Observable pour les tâches
  isEditModalOpen: boolean = false;
  currentTaskIndex: number | null = null;
  editedTask: Task = { id: '', content: '', done: false };
  
  private tasksCollection = collection(this.firestore, 'task');

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.loadTasks();
    this.testFirestoreConnection();
  }

  // Charger les tâches depuis Firestore
  loadTasks() {
    const q = query(this.tasksCollection, orderBy('content'));
    this.todo$ = new Observable<Task[]>(observer => {
      getDocs(q).then(snapshot => {
        const tasks: Task[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as Task;
          tasks.push({ id: docSnap.id, ...data });
        });
        observer.next(tasks);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  // Tester la connexion à Firestore
  async testFirestoreConnection() {
    try {
      const tasksSnapshot = await getDocs(this.tasksCollection);
      tasksSnapshot.forEach(doc => {
        console.log(`${doc.id} =>`, doc.data());
      });
      console.log('Connexion à Firestore réussie.');
    } catch (error) {
      console.error('Erreur de connexion à Firestore :', error);
    }
  }

  // Ajouter une nouvelle tâche à Firestore
  async addTask(task: Task) {
    try {
      const docRef = await addDoc(this.tasksCollection, {
        content: task.content,
        done: task.done
      });
      console.log('Tâche ajoutée avec ID : ', docRef.id);
      this.loadTasks(); // Recharger les tâches
    } catch (e) {
      console.error('Erreur lors de l\'ajout de la tâche : ', e);
    }
  }

  // Supprimer une tâche de Firestore
  async deleteTask(id: string) {
    console.log('Launch delete task ID : ', id);
    try {
      // Correction du chemin d'accès au document
      const taskDoc = doc(this.tasksCollection, id);
      await deleteDoc(taskDoc);
      console.log('Tâche supprimée avec ID : ', id);
      this.loadTasks(); // Recharger les tâches
    } catch (e) {
      console.error('Erreur lors de la suppression de la tâche : ', e);
    }
  }

  // Ouvrir le modal d'édition
  openEditModal(task: Task) {
    this.isEditModalOpen = true;
    this.editedTask = { ...task };
  }

  // Sauvegarder la tâche modifiée dans Firestore
  async saveTask() {
    if (this.editedTask.id) {
      try {
        const taskDoc = doc(this.firestore, `task/${this.editedTask.id}`);
        await updateDoc(taskDoc, {
          content: this.editedTask.content,
          done: this.editedTask.done
        });
        console.log('Tâche mise à jour avec ID : ', this.editedTask.id);
        this.isEditModalOpen = false;
        this.loadTasks(); // Recharger les tâches
      } catch (e) {
        console.error('Erreur lors de la mise à jour de la tâche : ', e);
      }
    }
  }

  // Fermer le modal d'édition
  closeEditModal() {
    this.isEditModalOpen = false;
    this.currentTaskIndex = null;
  }

  // Basculer le statut de complétion de la tâche dans Firestore
  async toggleCompleted(task: Task) {
    if (task.id) {
      try {
        const taskDoc = doc(this.firestore, `task/${task.id}`);
        await updateDoc(taskDoc, {
          done: !task.done
        });
        console.log('Statut de la tâche mis à jour pour ID : ', task.id);
        this.loadTasks(); // Recharger les tâches
      } catch (e) {
        console.error('Erreur lors de la mise à jour du statut de la tâche : ', e);
      }
    }
  }
}
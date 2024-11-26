import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { HeaderComponent } from './header/header.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskCreateComponent,
    HeaderComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

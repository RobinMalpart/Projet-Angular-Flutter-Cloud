// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
    try {
      await this.authService.signUp(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription :', error);
      this.errorMessage = error.message;
    }
  }
}
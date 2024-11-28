import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  signInForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  showPassword: boolean = false; 

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; 
  }
  async onSubmit() {
    if (this.signInForm.valid) {
      const email = this.signInForm.get('email')?.value;
      const password = this.signInForm.get('password')?.value;

      if (email && password) {
        this.loading = true;
        this.error = '';

        try {
          await this.authService.signIn(email, password);
          this.router.navigate(['/home']);
        } catch (error: any) {
          console.error('Sign-In error:', error);

          if (error?.code === 'auth/invalid-credential') {
            this.error = 'No account found with this email or password.';
          } else {
            this.error = error?.message || 'An unexpected error occurred.';
          }
        } finally {
          this.loading = false;
        }
      }
    } else {
      this.error = 'Please fill out the form correctly.';
    }
  }
}

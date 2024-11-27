import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  signUpForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  error: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router) {
    this.signUpForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): null | { mismatch: boolean } {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;
  
      if (email && password) {
        this.loading = true;
        this.error = '';
        try {
          await this.authService.signUp(email, password);
          console.log('Sign-up successful');
          this.router.navigate(['/login']);

        } catch (error: any) {
          if (error?.code === 'auth/email-already-in-use') {
            this.error = 'Email already in use';
          } else if (error?.code === 'auth/weak-password') {
            this.error = 'Password is too weak';
          } else if (error?.code === 'auth/invalid-email') {
            this.error = 'Invalid email address';
          } else {
            this.error = error?.message || 'An unexpected error occurred.';
          }
          console.error('Sign-up error:', error);
        } finally {
          this.loading = false;
        }
      }
    } else {
      this.error = 'Please fill out the form correctly.';
    }
  }  
}
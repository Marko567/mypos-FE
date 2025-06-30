import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  standalone: true
})
export class Register {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    city: '',
    state: '',
    username: ['', Validators.required],
    password: ['', Validators.required],
    preferred_language: 'en',
    role_id: 2
  })

  onRegister() {
    const user = this.registerForm.getRawValue();

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/', 'login']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }
}

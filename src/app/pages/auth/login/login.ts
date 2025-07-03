import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { ICredentials } from '../../../models/auth.model';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { AuthStore } from '../../../core/auth/auth.store';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class Login {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  authStore = inject(AuthStore);
  sessionService = inject(SessionStorageService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  isError =  signal<boolean>(false);
  errorMessage = signal<string>('');
  errorResetEffect = effect(() => {
    if (this.isError()) {
      setTimeout(() => {
        this.isError.set(false);
        this.errorMessage.set('');
      }, 4000);
    }
  });

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.maxLength(64)]]
  });

  onLogin() {
    this.isLoading.set(true);
    const credentials: ICredentials = this.loginForm.getRawValue();

    this.authService.login(credentials).pipe(
      map(response => response.body),
      tap((body: any) => {
        const token = body.token;
        this.sessionService.store('access_token', token);
      }),
      switchMap(() => this.authStore.initUserFromAPI())
    )
    .subscribe({
      next: (user: IUser) => {
        this.isLoading.set(false);
        this.isError.set(false);
        this.authStore.setUser(user);
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.isError.set(true);
        this.errorMessage.set(error.error.error);
        this.authStore.logout();
      }
    });

  }

  togglePasswordVisibility() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }
}

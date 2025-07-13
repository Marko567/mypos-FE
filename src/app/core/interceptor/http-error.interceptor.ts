import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../auth/auth.store';
import { ToastService } from '../services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authStore.logout();
        toast.error(error.error.error ?? 'Unauthorized access. Please log in again.', 5000);
      }

      if (error.status > 401 && error.status < 600) {
        const message = error.error?.message || 'Unexpected error';
        toast.error(message);
      }

      return throwError(() => error);
    })
  );
};


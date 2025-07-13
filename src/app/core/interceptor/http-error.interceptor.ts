import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../auth/auth.store';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  // const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authStore.logout();
      }

      // if (error.status >= 400 && error.status < 600) {
      //   const message = error.error?.message || 'Unexpected error';
      //   toast.error(message);
      // }

      return throwError(() => error);
    })
  );
};


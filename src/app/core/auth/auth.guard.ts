import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(SessionStorageService);
  const router = inject(Router);

  const token = storage.retrieve('access_token');

  if (token) {
    return true;
  }

  // ako nije logovan, idi na /login i čuvaj gde je pokušao da ode
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};


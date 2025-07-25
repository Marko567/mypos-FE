import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage';
import { tokenInterceptor } from './core/auth/token.interceptor';
import { httpErrorInterceptor } from './core/interceptor/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([tokenInterceptor, httpErrorInterceptor])
    ),
    provideNgxWebstorage(
      withSessionStorage(),
      withLocalStorage()
    ),
    provideRouter(routes)
  ]
};

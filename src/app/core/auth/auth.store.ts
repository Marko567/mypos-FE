import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { IUser } from '../../models/user.model';
import { BASE_URL } from '../constants/api.constants';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(SessionStorageService);
  private readonly resourceUrl = BASE_URL + 'auth';

  private readonly _user = signal<IUser | null>(null);

  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => !!this._user());
  readonly router = inject(Router);

  constructor() {}

  initUserFromAPI() {
    // const token = this.storage.retrieve('access_token');
    // if (!token) return;

    return this.http.get<IUser>(`${this.resourceUrl}/me`);
    // .subscribe({
    //   next: (user) => this._user.set(user),
    //   error: () => {
    //     this._user.set(null);
    //     this.storage.clear('access_token');
    //     this.router.navigate(['/login']);
    //   }
    // });
  }

  setUser(user: IUser): void {
    this._user.set(user);
  }

  logout(): void {
    this._user.set(null);
    this.storage.clear('access_token');
    this.router.navigate(['/login']);
  }
}

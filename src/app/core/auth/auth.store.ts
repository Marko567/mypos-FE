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
  private readonly router = inject(Router);
  private readonly resourceUrl = BASE_URL + 'auth';

  private readonly _user = signal<IUser | null>(null);

  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => !!this._user());
  readonly initials = computed(() => this.getInitials(this.user()));

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

  getInitials(user: IUser | null) {
    const first = user?.first_name ? user.first_name.charAt(0).toUpperCase() : this.generateRandomLetter();
    const last = user?.last_name ? user.last_name.charAt(0).toUpperCase() : this.generateRandomLetter();
    return `${first}${last}`;
  }

  private generateRandomLetter(): string {
    const codeA = 'A'.charCodeAt(0);
    const randomInt = Math.floor(Math.random() * 26);
    return String.fromCharCode(codeA + randomInt);
  }

  logout(): void {
    this._user.set(null);
    this.storage.clear('access_token');
    // this.router.navigate(['/login']);
  }
}

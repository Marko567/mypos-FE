import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/layout/navbar/navbar';
import { AuthStore } from './core/auth/auth.store';
import { IUser } from './models/user.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'mypos';
  user = inject(AuthStore).user;

  constructor(private authStore: AuthStore) {
    this.authStore.initUserFromAPI().subscribe({
      next: (user: IUser) => {
        this.authStore.setUser(user);
      },
      error: () => {
        this.authStore.logout();
      }
    })
  }
}

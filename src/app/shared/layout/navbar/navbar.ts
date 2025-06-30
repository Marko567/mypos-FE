import { Component, inject, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IUser } from '../../../models/user.model';
import { AuthStore } from '../../../core/auth/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  authStore = inject(AuthStore);
  user: Signal<IUser | null> = inject(AuthStore).user;


  onLogout() {
    this.authStore.logout();
  }
}

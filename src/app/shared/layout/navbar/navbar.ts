import { Component, computed, inject, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../../../models/user.model';
import { AuthStore } from '../../../core/auth/auth.store';
import { CommonModule } from '@angular/common';
import { UserAvatar } from '../user-avatar/user-avatar';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, UserAvatar],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  authStore = inject(AuthStore);
  router = inject(Router);

  onLogout() {
    this.authStore.logout();
    // this.router.navigate(['/login']);
  }
}

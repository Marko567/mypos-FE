import { Component, computed, inject, input, signal } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { AuthStore } from '../../../core/auth/auth.store';
import { IPost } from '../../../models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-avatar',
  imports: [CommonModule],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss'
})
export class UserAvatar {
  user = input.required<IUser>();
  authStore = inject(AuthStore);
  isInteractive = input<boolean>(false);
  avatarSize = input<'large' | 'medium' | 'small'>('medium');
  isMe = computed(() => this.authStore.user()?.id === this.user().id);


  getInitials() {
    let firstInitial = '', secondInitial = '';

    if(this.user().first_name && this.user().last_name) {
      firstInitial = this.user().first_name.charAt(0).toUpperCase();
      secondInitial = this.user().last_name.charAt(0).toUpperCase();
    } else {
      const username = this.user().username;
      firstInitial = username.charAt(0).toUpperCase();
      secondInitial = username.charAt(0).toUpperCase();
    }
    return `${firstInitial}${secondInitial}`;
  }
}

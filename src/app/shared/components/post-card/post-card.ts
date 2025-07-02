import { Component, computed, inject, Input, signal, Signal } from '@angular/core';
import { IPost } from '../../../models/post.model';
import { Router, RouterModule } from '@angular/router';
import { DateTimePipe } from '../../pipes/date-time.pipe';
import { PostsService } from '../../../pages/posts/posts.service';
import { AuthStore } from '../../../core/auth/auth.store';

@Component({
  selector: 'app-post-card',
  imports: [RouterModule, DateTimePipe],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
  standalone: true
})
export class PostCard {
  @Input({ required: true })
  set postInput(post: IPost) {
    this.post.set(post);
  }
  // likesCount = signal<number>(this.post.likes.length);
  postService = inject(PostsService);
  authStore = inject(AuthStore);

  readonly post = signal<IPost | null>(null);

  readonly isLiked = computed(() => this.authStore.user() && this.post()?.likes.includes(this.authStore.user()!.username));
  readonly likeCount = computed(() => this.post()?.likes.length ?? 0);
  readonly myPost = computed(() => this.authStore.user()!.username === this.post()!.author);

  onLike() {
    const post = this.post();
    const user = this.authStore.user();
    if (!post || !user) return;

    const request$ = this.isLiked()
      ? this.postService.unlike(post.id)
      : this.postService.like(post.id);

    request$.subscribe(updatedPost => this.post.set(updatedPost));
  }

  getInitials(username: string) {
    const first = username.charAt(0).toUpperCase();
    const second = username.charAt(1).toUpperCase();
    return `${first}${second}`;
  }
}

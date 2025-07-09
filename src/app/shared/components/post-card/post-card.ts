import { Component, computed, inject, Input, signal } from '@angular/core';
import { IPost } from '../../../models/post.model';
import { DateTimePipe } from '../../pipes/date-time.pipe';
import { PostsService } from '../../../pages/posts/posts.service';
import { AuthStore } from '../../../core/auth/auth.store';
import { CommentList } from "../comments/comment-list/comment-list";
import { UserAvatar } from "../../layout/user-avatar/user-avatar";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [RouterModule, DateTimePipe, CommentList, UserAvatar],
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
  showComments = signal<boolean>(false);

  readonly post = signal<IPost | null>(null);

  readonly isLiked = computed(() => this.authStore.user() && this.post()?.likes.includes(this.authStore.user()!.username));
  readonly likeCount = computed(() => this.post()?.likes.length ?? 0);
  readonly myPost = computed(() => this.authStore.user()!.id === this.post()!.author.id);

  onLike() {
    const post = this.post();
    const user = this.authStore.user();
    if (!post || !user) return;

    const request$ = this.isLiked()
      ? this.postService.unlike(post.id)
      : this.postService.like(post.id);

    request$.subscribe(updatedPost => this.post.set(updatedPost));
  }

  toggleComments() {
    this.showComments.update(value => !value);
  }
}

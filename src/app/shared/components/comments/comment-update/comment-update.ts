import { Component, computed, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../../../../models/post.model';
import { AuthStore } from '../../../../core/auth/auth.store';
import { PostsService } from '../../../../pages/posts/posts.service';
import { IComment } from '../../../../models/comment.model';
import { CommentStore } from '../comment.store';
import { UserAvatar } from "../../../layout/user-avatar/user-avatar";


@Component({
  selector: 'app-comment-update',
  imports: [ReactiveFormsModule, UserAvatar],
  templateUrl: './comment-update.html',
  styleUrl: './comment-update.scss'
})
export class CommentUpdate {
  post = input.required<IPost>();
  replyId = input<string | null>(null);

  fb = inject(FormBuilder);
  authStore = inject(AuthStore);
  postsService = inject(PostsService);
  commentStore = inject(CommentStore);

  commentForm = computed(() => {
    const post = this.post();
    const reply_id = this.replyId();

    return this.fb.nonNullable.group({
        content: ['', Validators.required],
        reply_id: reply_id,
        username_to_reply: post.author.username
    })
  })



  onComment() {
    const comment = this.commentForm().getRawValue();

    this.postsService.createNewComment(this.post().id, comment).subscribe({
      next: (comment: IComment) => {
        this.commentForm().reset();
        this.commentStore.triggerRefresh(this.post().id);
      },
      error: () => {

      }
    })
  }
}

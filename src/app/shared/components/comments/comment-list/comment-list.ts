import { Component, effect, inject, input, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IComment, ICommentWithReplies } from '../../../../models/comment.model';
import { PostsService } from '../../../../pages/posts/posts.service';
import { IPost } from '../../../../models/post.model';
import { Comment } from '../comment/comment';
import { CommentStore } from '../comment.store';
import { CommentUpdate } from '../comment-update/comment-update';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [Comment, CommentUpdate],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.scss'
})
export class CommentList {
  post = input.required<IPost>();
  private readonly postsService = inject(PostsService);
  private readonly commentStore = inject(CommentStore);
  replyTo = signal<string | null>(null);

  readonly commentsWithReplies = signal<ICommentWithReplies[]>([]);

  constructor() {
    effect(() => {
      this.commentStore.getRefreshSignal(this.post().id)();

      this.postsService.getAllComments(this.post().id).subscribe({
        next: (comments: IComment[]) => {
          this.replyTo.set(null);
          this.commentsWithReplies.set(
            comments
              .filter(c => !c.reply_id)
              .map(comment => ({
                ...comment,
                replies: comments
                  .filter(reply => reply.reply_id === comment.id)
                  .sort((a, b) =>
                    new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
                  )
              }))
          );
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
    });
  }

  onReplyToComment(id: string) {
    this.replyTo.set(id);
  }

  shouldShowReplyForm(comment: ICommentWithReplies): boolean {
    const isReplyTarget = comment.id === this.replyTo();
    const isChildTarget = comment.replies.some(reply => reply.id === this.replyTo());
    return isReplyTarget || isChildTarget;
  }
}


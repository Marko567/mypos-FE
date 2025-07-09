import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { IComment } from '../../../../models/comment.model';
import { AuthStore } from '../../../../core/auth/auth.store';
import { DateTimePipe } from '../../../pipes/date-time.pipe';
import { UserAvatar } from "../../../layout/user-avatar/user-avatar";

@Component({
  selector: 'app-comment',
  imports: [DateTimePipe, UserAvatar],
  templateUrl: './comment.html',
  styleUrl: './comment.scss'
})
export class Comment {
  comment = input.required<IComment>();
  @Output() replyTo = new EventEmitter();

  authStore = inject(AuthStore);

  readonly isMyComment = computed(() => this.authStore.user()!.id === this.comment().created_by.id);

  onReply(id: string) {
    this.replyTo.emit(id);
  }
}

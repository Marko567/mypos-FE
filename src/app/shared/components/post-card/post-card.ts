import { Component, Input } from '@angular/core';
import { IPost } from '../../../models/post.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [RouterModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
  standalone: true
})
export class PostCard {
  @Input() post!: IPost;
}

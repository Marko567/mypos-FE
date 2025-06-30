import { Component, inject } from '@angular/core';
import { PostCard } from '../../shared/components/post-card/post-card';
import { PostsService } from '../posts/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, PostCard],
  templateUrl: './feed.html',
  styleUrl: './feed.scss'
})
export class Feed {
  postService = inject(PostsService);
  posts$ = this.postService.getAll();

  constructor() {}
}

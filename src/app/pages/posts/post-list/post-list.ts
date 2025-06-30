import { Component, inject, OnInit } from '@angular/core';
import { PostCard } from '../../../shared/components/post-card/post-card';
import { PostsService } from '../posts.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, RouterModule, PostCard],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss'
})
export class PostList implements OnInit {
  private readonly postsService = inject(PostsService);
  readonly posts$ = this.postsService.getByLoggedUser();

  constructor() {}

  ngOnInit(): void {}
}

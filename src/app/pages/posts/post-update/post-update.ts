import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { IPost } from '../../../models/post.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../../../models/user.model';
import { AuthStore } from '../../../core/auth/auth.store';

@Component({
  selector: 'app-post-update',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './post-update.html',
  styleUrl: './post-update.scss'
})
export class PostUpdate implements OnInit {
  fb = inject(FormBuilder);
  postService = inject(PostsService);
  router = inject(Router);
  authStore = inject(AuthStore);

  tagsArray = this.fb.array<FormControl<string>>([]);

  postForm = this.fb.nonNullable.group({
    author: '',
    title: ['', Validators.required],
    text: ['', Validators.required],
    tags: '',
    tags_count: 0
  })

  constructor() {}

  ngOnInit(): void {

  }

  onSubmit() {
    const post = this.postForm.getRawValue();
    const tagsArray = this.tagsArray.getRawValue();
    post.author = this.authStore.user()!.id as string;

    if(tagsArray.length) {
      post.tags = tagsArray.join(';');
      post.tags_count = tagsArray.length;
    }

    this.postService.create(post).subscribe({
      next: (post: IPost) => {
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  onEnter(event: any) {
    event.preventDefault();

    const tag: string = event.target.value;
    event.target.value = '';
    this.tagsArray.push(new FormControl(tag, { nonNullable: true }));
  }

  onRemove(index: number) {
    this.tagsArray.removeAt(index);
  }
}

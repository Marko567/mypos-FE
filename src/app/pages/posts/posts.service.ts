import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, NewPost } from '../../models/post.model';
import { BASE_URL } from '../../core/constants/api.constants';
import { IComment, NewComment } from '../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly resourceUrl = BASE_URL + "posts";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<IPost[]>(`${this.resourceUrl}`);
  }

  getByLoggedUser() {
    return this.http.get<IPost[]>(`${this.resourceUrl}/my`);
  }

  create(post: NewPost) {
    return this.http.post<IPost>(`${this.resourceUrl}`, post);
  }

  like(postId: string) {
    return this.http.post<IPost>(`${this.resourceUrl}/${postId}/like`, {});
  }

  unlike(postId: string) {
    return this.http.delete<IPost>(`${this.resourceUrl}/${postId}/like`);
  }

  getAllComments(postId: string) {
    return this.http.get<IComment[]>(`${this.resourceUrl}/${postId}/comments/all`);
  }

  createNewComment(postId: string, comment: NewComment) {
    return this.http.post<IComment>(`${this.resourceUrl}/${postId}/comments`, comment);
  }
}

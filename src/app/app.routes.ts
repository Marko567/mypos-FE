import { Routes } from '@angular/router';
import { PostList } from './pages/posts/post-list/post-list';
import { PostUpdate } from './pages/posts/post-update/post-update';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Feed } from './pages/feed/feed';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'my-posts',
    component: PostList,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: '',
    component: Feed,
    canActivate: [authGuard]
  },
  {
    path: 'posts/new',
    component: PostUpdate,
    canActivate: [authGuard]
  },
];

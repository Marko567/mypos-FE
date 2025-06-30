import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { ICredentials } from '../../models/auth.model';
import { IUser, NewUser } from '../../models/user.model';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'access_token';
  private readonly resourceUrl = BASE_URL + "auth";

  constructor(private http: HttpClient, private router: Router, private sessionStorage: SessionStorageService) { }

  login(credentials: ICredentials) {
    return this.http.post(`${this.resourceUrl}/login`, credentials, { observe: 'response' });
  }

  register(user: NewUser) {
    return this.http.post(`${this.resourceUrl}/register`, user, { observe: 'response'});
  }

  logout(): void {
    this.sessionStorage.clear(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.sessionStorage.retrieve(this.tokenKey) ? true : false;
  }

  getToken(): string | null {
    return this.sessionStorage.retrieve(this.tokenKey);
  }
}

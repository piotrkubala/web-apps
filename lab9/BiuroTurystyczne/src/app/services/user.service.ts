import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../utilities/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Group} from "../utilities/group";
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface LoginRefreshResponse {
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  onUserStatusChanged: EventEmitter<void> = new EventEmitter<void>();

  user: User | null = null;
  userGroups: Group[] = [];

  constructor(private http: HttpClient,
              private cookieService: CookieService) {}

  validateUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;

    return usernameRegex.test(username);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^[a-zA-Z0-9]{6,20}$/;

    return passwordRegex.test(password);
  }

  isUserLoggedIn(): boolean {
    return this.cookieService.check('Authorization');
  }

  logout(): void {
    if (this.cookieService.check('Authorization')) {
      this.cookieService.delete('Authorization', '/');

      this.user = null;
      this.onUserStatusChanged.emit();
    }
  }

  private setLoginState(response: LoginRefreshResponse): boolean {
    interface JwtUserPayload {
      username: string;
      email: string;
      groups: Group[];
    }

    const token = this.cookieService.get('Authorization');

    if (!token) {
      return false;
    }

    try {
      const payload = jwtDecode<any>(token);
      const userPayload = payload.user as JwtUserPayload;
      const userGroups = payload.userGroups as Group[];

      if (!userPayload) {
        return false;
      }

      this.userGroups = userGroups;
      this.user = new User(userPayload.username, userPayload.email, "");

      this.onUserStatusChanged.emit();

      return true;
    } catch (error) {
      return false;
    }
  }

  refreshSession(): void {
    const url = environment.backend.url + '/token-refresher/';

    this.http.post<LoginRefreshResponse>(url, {}, {
      withCredentials: true
    })
      .pipe(
        catchError(_ => {
          this.logout();
          return [];
        })
      )
      .subscribe(response => {
        this.setLoginState(response);
      });
  }

  register(user: User, repeatedPassword: string): void {
    const isUsernameValid = this.validateUsername(user.username);
    const isEmailValid = this.validateEmail(user.email);
    const isPasswordValid = this.validatePassword(user.password);
    const isRepeatedPasswordTheSame = user.password === repeatedPassword;

    if (!(isUsernameValid && isEmailValid && isPasswordValid && isRepeatedPasswordTheSame)) {
      alert('Invalid input!');
      return;
    }

    const url = environment.backend.url + '/register/';

    this.http.post(url, user)
      .pipe(
        catchError(_ => {
          alert('Registration failed!');
          return [];
        })
      )
      .subscribe(_ => {
        alert('Registration successful!');
        this.onUserStatusChanged.emit();
      });
  }

  login(username: string, password: string): void {
    const isUsernameValid = this.validateUsername(username);
    const isPasswordValid = this.validatePassword(password);

    if (!(isUsernameValid && isPasswordValid)) {
      alert('Invalid input!');
      return;
    }

    const url = environment.backend.url + '/login/';

    this.http.post<LoginRefreshResponse>(url, {username, password},
      {
        withCredentials: true
      }).pipe(
        catchError(_ => {
          alert('Login failed!');
          return [];
        })
      )
      .subscribe(response => {
        if(this.setLoginState(response)) {
          alert('Login successful!');
        } else {
          alert('Login failed!');
        }
      });
  }
}

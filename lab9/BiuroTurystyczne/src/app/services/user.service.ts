import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../utilities/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  onUserLoggedIn: EventEmitter<void> = new EventEmitter<void>();

  user: User | null = null;

  constructor(private http: HttpClient) {}

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
        tap(_ => {
          alert('Registration successful!');
          this.onUserLoggedIn.emit();
        }),
        catchError(_ => {
          alert('Registration failed!');
          return [];
        })
      )
      .subscribe();
  }
}

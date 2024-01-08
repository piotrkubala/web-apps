import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(public userService: UserService) {
    this.userService.onUserStatusChanged.subscribe(() => {
      this.clear();
    });
  }

  isUsernameValid(): boolean {
    return this.userService.validateUsername(this.username);
  }

  isPasswordValid(): boolean {
    return this.userService.validatePassword(this.password);
  }

  login() {
    this.userService.login(this.username, this.password);
  }

  clear() {
    this.username = '';
    this.password = '';
  }
}

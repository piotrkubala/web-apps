import { Component } from '@angular/core';
import {User} from "../../utilities/user";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = new User('', '', '');
  repeatedPassword: string = '';

  constructor(public userService: UserService) {
    this.userService.onUserLoggedIn
      .subscribe(() => {
        this.clear();
      });
  }

  isUsernameValid(): boolean {
    return this.userService.validateUsername(this.user.username);
  }

  isEmailValid(): boolean {
    return this.userService.validateEmail(this.user.email);
  }

  isPasswordValid(): boolean {
    return this.userService.validatePassword(this.user.password);
  }

  register() {
    this.userService.register(this.user, this.repeatedPassword);
  }

  clear() {
    this.user = new User('', '', '');
    this.repeatedPassword = '';
  }
}

import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {UserComponent} from "./user/user.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    NgForOf,
    UserComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  constructor(public userService: UserService) {
  }
}

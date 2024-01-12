import {Component, Input} from '@angular/core';
import {User} from "../../../utilities/user";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user!: User;

  constructor() {
  }

  banUser(): void {
    console.log('banUser');
  }
}

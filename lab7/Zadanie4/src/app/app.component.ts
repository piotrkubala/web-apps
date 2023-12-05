import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  friends_list = [
    {name: "X1", surname: "Y1", phone_number: "123456789", email: "X1.Y1@example.net", hidden: true, button_text: "Show"},
    {name: "X2", surname: "Y2", phone_number: "223456789", email: "X2.Y2@example.net", hidden: true, button_text: "Show"},
    {name: "X3", surname: "Y3", phone_number: "323456789", email: "X3.Y3@example.net", hidden: true, button_text: "Show"},
    {name: "X4", surname: "Y4", phone_number: "423456789", email: "X4.Y4@example.net", hidden: true, button_text: "Show"},
    {name: "X5", surname: "Y5", phone_number: "523456789", email: "X5.Y5@example.net", hidden: true, button_text: "Show"},
    {name: "X6", surname: "Y6", phone_number: "623456789", email: "X6.Y6@example.net", hidden: true, button_text: "Show"}
  ];

  toggle_hidden(friend: any) {
    friend.hidden = !friend.hidden;
    if (friend.hidden) {
      friend.button_text = "Show";
    } else {
      friend.button_text = "Hide";
    }
  }
}

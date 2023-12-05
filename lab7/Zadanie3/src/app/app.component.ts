import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tytuł Filmu';
  actor_name = "Imię Aktora";
  actor_surname = "Nazwisko Aktora";

  given_title = "";
  given_name = "";
  given_surname = "";

  onSubmit() {
    this.title = this.given_title;
    this.actor_name = this.given_name;
    this.actor_surname = this.given_surname;

    this.given_title = "";
    this.given_name = "";
    this.given_surname = "";
  }
}

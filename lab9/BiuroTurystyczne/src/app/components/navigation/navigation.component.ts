import { Component } from '@angular/core';
import {CurrencyMenuComponent} from "../currency-menu/currency-menu.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ReservationSummaryComponent} from "../reservation-summary/reservation-summary.component";
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CurrencyMenuComponent,
    RouterLink,
    RouterLinkActive,
    ReservationSummaryComponent,
    NgIf
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  constructor(private userService: UserService) {}

  isUserLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }

  getUsername(): string {
    return this.userService.user?.username ?? '';
  }

  logout(): void {
    this.userService.logout();
  }
}

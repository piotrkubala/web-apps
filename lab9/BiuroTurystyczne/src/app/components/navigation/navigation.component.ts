import { Component } from '@angular/core';
import {CurrencyMenuComponent} from "../currency-menu/currency-menu.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ReservationSummaryComponent} from "../reservation-summary/reservation-summary.component";
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";
import {ShoppingHistoryService} from "../../services/shopping-history.service";
import {TripAccountingService} from "../../services/trip-accounting.service";

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
  constructor(private userService: UserService,
              private tripAccountingService: TripAccountingService) {}

  isUserLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }

  isUserAdmin(): boolean {
    return this.userService.isAdmin();
  }

  isUserManager(): boolean {
    return this.userService.isManager();
  }

  isUserNormal(): boolean {
    return this.userService.isNormalUser();
  }

  getUsername(): string {
    return this.userService.user?.username ?? '';
  }

  logout(): void {
    this.userService.logout();

    const reservedTrips = this.tripAccountingService.getReservedTrips();

    reservedTrips.forEach(trip => {
      this.tripAccountingService.unreserveAllThisUserPlaces(trip.id);
    });
  }
}

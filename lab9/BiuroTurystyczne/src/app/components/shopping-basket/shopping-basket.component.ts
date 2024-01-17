import { Component } from '@angular/core';
import {TripAccountingService} from "../../services/trip-accounting.service";
import {TripLoaderService} from "../../services/trip-loader.service";
import {CurrencyExchangeService} from "../../services/currency-exchange.service";
import {BasketItemComponent} from "./basket-item/basket-item.component";
import {Trip} from "../../utilities/trip";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ShoppingHistoryService} from "../../services/shopping-history.service";

@Component({
  selector: 'app-shopping-basket',
  standalone: true,
  imports: [
    BasketItemComponent,
    NgForOf,
    NgIf,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './shopping-basket.component.html',
  styleUrl: './shopping-basket.component.css'
})
export class ShoppingBasketComponent {
  constructor(private tripAccountingService: TripAccountingService) {
  }

  getReservedTrips(): Trip[] {
    return this.tripAccountingService.getReservedTrips();
  }

  isBasketEmpty(): boolean {
    return this.tripAccountingService.getReservedTrips().length === 0;
  }

  buySelected(): void {
    const selectedTrips = this.tripAccountingService.getSelectedTrips();
    this.tripAccountingService.buyTrips(selectedTrips);
  }

  getTotalPriceForAllTripsString(): string {
    return this.tripAccountingService.getTotalReservationPriceForAllTripsString();
  }

  getTotalPriceForSelectedTripsString(): string {
    return this.tripAccountingService.getTotalReservationPriceForAllTripsString(true);
  }
}

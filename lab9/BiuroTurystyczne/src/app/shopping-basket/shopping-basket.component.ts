import { Component } from '@angular/core';
import {TripAccountingService} from "../trip-accounting.service";
import {TripLoaderService} from "../trip-loader.service";
import {CurrencyExchangeService} from "../currency-exchange.service";
import {BasketItemComponent} from "./basket-item/basket-item.component";
import {Trip} from "../trip";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

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
  constructor(private tripAccountingService: TripAccountingService,
              private currencyExchangeService: CurrencyExchangeService,
              private tripLoaderService: TripLoaderService) {
  }

  getReservedTrips(): Trip[] {
    return this.tripAccountingService.getReservedTrips();
  }

  isBasketEmpty(): boolean {
    return this.tripAccountingService.getReservedTrips().length === 0;
  }
}

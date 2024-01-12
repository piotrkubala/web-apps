import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";

import { TripAccountingService} from "../../services/trip-accounting.service";
import { Trip } from '../../utilities/trip';
import {CurrencyExchangeService} from "../../services/currency-exchange.service";
import {Money} from "../../utilities/money";
import {TripLoaderService} from "../../services/trip-loader.service";
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TripReserverComponent} from "../trip-reserver/trip-reserver.component";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [NgIf, UpperCasePipe, NgForOf, FormsModule, RouterLink, RouterLinkActive, TripReserverComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent {
  @Input() trip!: Trip;

  constructor(public tripAccountingService: TripAccountingService,
              private currencyExchangeService: CurrencyExchangeService,
              private tripLoaderService: TripLoaderService,
              public userService: UserService) {
  }

  getColorByLeftPlacesCount(): string {
    const leftPlacesCount = this.trip.maxParticipants - this.getReservedPlacesCount();

    if (leftPlacesCount <= 3) {
      return "lightcoral";
    }

    return "white";
  }

  isHighestPrice(): boolean {
    return this.tripAccountingService.isHighestPrice(this.trip.id);
  }

  isLowestPrice(): boolean {
    return this.tripAccountingService.isLowestPrice(this.trip.id);
  }

  getMoneyString(): string {
    return this.currencyExchangeService.getMoneyStringInBaseCurrency(
      new Money(this.trip.priceMinor, this.trip.currency)
    );
  }

  deleteTrip(): void {
    this.tripLoaderService.deleteTrip(this.trip.id);
  }

  getReservedPlacesCount(): number {
    return this.tripAccountingService.getCurrentUserReservedPlacesCount(this.trip.id);
  }
}

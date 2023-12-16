import {Component, Input} from '@angular/core';
import {NgIf, UpperCasePipe} from "@angular/common";

import { TripAccountingService} from "../trip-accounting.service";
import { Trip } from '../trip';
import {CurrencyExchangeService} from "../currency-exchange.service";
import {Money} from "../money";
import {TripLoaderService} from "../trip-loader.service";

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [NgIf, UpperCasePipe],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent {
  @Input() trip!: Trip;

  constructor(private tripAccountingService: TripAccountingService,
              private currencyExchangeService: CurrencyExchangeService,
              private tripLoaderService: TripLoaderService) {
  }

  _changeReservation(reservedPlacesCountDelta: number): void {
    this.tripAccountingService.changeReservation(this.trip.id, reservedPlacesCountDelta);
  }

  reservePlace(): void {
    this._changeReservation(1);
  }

  unreservePlace(): void {
    this._changeReservation(-1)
  }

  getReservedPlacesCount(): number {
    return this.tripAccountingService.getCurrentUserReservedPlacesCount(this.trip.id);
  }

  isFullyReserved(): boolean {
    return this.tripAccountingService.isFullyReserved(this.trip.id);
  }

  didUserReserve(): boolean {
    return this.tripAccountingService.currentUserDidReserve(this.trip.id);
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
}

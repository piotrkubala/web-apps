import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

import { Trip } from '../../../utilities/trip';
import { TripAccountingService } from "../../../services/trip-accounting.service";
import {CurrencyExchangeService} from "../../../services/currency-exchange.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-trip-creator',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './trip-creator.component.html',
  styleUrl: './trip-creator.component.css'
})
export class TripCreatorComponent {
  trip: Trip;
  price: number = 0;
  startDateString: string = '';
  endDateString: string = '';

  _validateFormAndUpdateTrip(): boolean {
    this.trip.priceMinor = Math.round(this.price * 100);
    const startDate = new Date(this.startDateString);
    const endDate = new Date(this.endDateString);

    if (this.trip.name === '') {
      alert('Name cannot be empty');
      return false;
    }

    if (this.trip.country === '') {
      alert('Country cannot be empty');
      return false;
    }

    if (this.trip.currency === '') {
      alert('Currency cannot be empty');
      return false;
    }

    if (this.trip.description === '') {
      alert('Description cannot be empty');
      return false;
    }

    if (this.trip.image === '') {
      alert('Image cannot be empty');
      return false;
    }

    if (!this.trip.startDate || !this.trip.endDate ||
        this.trip.startDate.toString() === 'Invalid Date' ||
        this.trip.endDate.toString() === 'Invalid Date') {
      alert('Start date and end date must be set');
      return false;
    }

    if (this.trip.priceMinor <= 0) {
      alert('Price must be positive');
      return false;
    }

    if (this.trip.maxParticipants <= 0) {
      alert('Max participants must be positive');
      return false;
    }

    if (startDate > endDate) {
      alert('Start date must be before end date or they must be equal');
      return false;
    }

    this.trip.startDate = startDate.toLocaleDateString().split('T')[0];
    this.trip.endDate = endDate.toLocaleDateString().split('T')[0];

    try {
      new URL(this.trip.image);
    } catch (_) {
      alert('Image must be a valid URL');
      return false;
    }

    return true;
  }

  constructor(public currencyExchangeService: CurrencyExchangeService,
              public tripAccountingService: TripAccountingService) {
    this.trip = this.tripAccountingService.tripLoaderService.getEmptyTrip();
  }

  createTrip(): void {
    if (!this._validateFormAndUpdateTrip()) {
      return;
    }

    this.tripAccountingService.tripLoaderService.createNewTrip(this.trip);

    this.trip = this.tripAccountingService.tripLoaderService.getEmptyTrip();
    this.price = 0;
    this.startDateString = '';
    this.endDateString = '';
  }
}

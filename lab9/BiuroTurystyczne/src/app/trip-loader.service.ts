import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Trip } from './trip';
import {Observable} from "rxjs";
import {CurrencyExchangeService} from "./currency-exchange.service";
import {Money} from "./money";

@Injectable({
  providedIn: 'root'
})
export class TripLoaderService {
  trips: Map<number, Trip> = new Map<number, Trip>();
  tripsLoaded: EventEmitter<void> = new EventEmitter<void>();
  _lastId: number = 0;


  constructor(private http: HttpClient,
              private currencyExchangeService: CurrencyExchangeService) {
     this.http.get<Trip[]>('assets/trips-definition.json')
       .subscribe(data => {
          this.trips.clear();

          data.forEach(trip => {
            this.trips.set(trip.id, trip);
            this._lastId = Math.max(this._lastId, trip.id);
          });

          this.tripsLoaded.emit();
       });
  }

  getEmptyTrip(): Trip {
    return {
      id: 0,
      name: '',
      country: '',
      startDate: '1970-01-01',
      endDate: '1970-01-01',
      priceMinor: 0,
      currency: '',
      maxParticipants: 0,
      reservedPlacesCount: 0,
      description: '',
      image: '',
      averageRating: 0,
      countOfRatings: 0
    };
  }

  getTrip(tripId: number): Trip | undefined {
    return this.trips.get(tripId);
  }

  getAllPricesInBaseCurrency(): number[] {
    return Array.from(this.trips.values()).map(trip => {
      return this.currencyExchangeService.getMoneyInBaseCurrency(
        new Money(trip.priceMinor, trip.currency)
      ).amountMinor;
    });
  }

  getHighestPrice(): number {
    return Math.max(...this.getAllPricesInBaseCurrency());
  }

  getLowestPrice(): number {
    return Math.min(...this.getAllPricesInBaseCurrency());
  }

  deleteTrip(tripId: number): boolean {
    if (this.trips.has(tripId)) {
      this.trips.delete(tripId);
      this.tripsLoaded.emit();

      return true;
    }
    return false;
  }

  createNewTrip(trip: Trip): boolean {
    trip.id = ++this._lastId;

    this.trips.set(trip.id, trip);
    this.tripsLoaded.emit();

    return true;
  }

  getAllUniqueCountriesSorted(): string[] {
    return Array.from(
      new Set(Array.from(this.trips.values())
        .map((trip) => trip.country))
        .values()
    ).sort();
  }

  getEarliestDate(): Date {
    return new Date(Math.min(...Array.from(this.trips.values())
      .map((trip) => new Date(trip.startDate).getTime())));
  }

  getLatestDate(): Date {
    return new Date(Math.max(...Array.from(this.trips.values())
      .map((trip) => new Date(trip.endDate).getTime())));
  }

  dateToString(date: Date): string {
    const formatterYear = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric'
    });
    const formatterMonth = new Intl.DateTimeFormat('en-GB', {
      month: '2-digit'
    });
    const formatterDay = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit'
    });

    if (date === undefined || date.toString() === 'Invalid Date') {
      return '1970-01-01';
    }

    const yearString = formatterYear.format(date);
    const monthString = formatterMonth.format(date);
    const dayString = formatterDay.format(date);

    return `${yearString}-${monthString}-${dayString}`;
  }
}

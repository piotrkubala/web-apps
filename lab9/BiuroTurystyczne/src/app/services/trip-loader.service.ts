import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Trip } from '../utilities/trip';
import {CurrencyExchangeService} from "./currency-exchange.service";
import {Money} from "../utilities/money";

@Injectable({
  providedIn: 'root'
})
export class TripLoaderService {
  trips: Map<number, Trip> = new Map<number, Trip>();
  tripsLoaded: EventEmitter<void> = new EventEmitter<void>();
  wereTripsLoaded: boolean = false;
  _lastId: number = 0;

  triggerTripsLoad(): void {
    const url: string = environment.backend.url + '/trips/';

    this.http.get<Trip[]>(url)
      .subscribe(data => {
        this.trips.clear();

        data.forEach(trip => {
          this.trips.set(trip.id, trip);
          this._lastId = Math.max(this._lastId, trip.id);
        });

        this.wereTripsLoaded = true;
        this.tripsLoaded.emit();
      });
  }

  constructor(private http: HttpClient,
              private currencyExchangeService: CurrencyExchangeService) {
    this.triggerTripsLoad();
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
      countOfRatings: 0,
      latitude: 0,
      longitude: 0,
      zoom: 1,
      tripPhotos: []
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
      const url = environment.backend.url + '/trips/' + tripId;

      this.http.delete(url).subscribe(() => {
        this.trips.delete(tripId);
        this.tripsLoaded.emit();
      });

      return true;
    }
    return false;
  }

  createNewTrip(trip: Trip): boolean {
    trip.id = ++this._lastId;

    this.http.post(environment.backend.url + '/trips/', trip).subscribe((response) => {
      try {
        const tripResponse = response as {
          newTripId: number
        };

        this.trips.set(tripResponse.newTripId, trip);
        this.tripsLoaded.emit();
      } catch (e) {
        console.error(e);
      }
    });

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

  getRating(tripId: number): number {
    return this.trips.get(tripId)?.averageRating ?? 0;
  }

  getCountOfRatings(tripId: number): number {
    return this.trips.get(tripId)?.countOfRatings ?? 0;
  }

  updateRating(tripId: number, rating: number): void {
    const trip = this.trips.get(tripId);
    if (trip) {
      const url = environment.backend.url + '/rating/';

      this.http.put(url, {
        username: 'test_user',
        tripId: tripId,
        rating: rating
      }).subscribe(() => {
        trip.averageRating = (trip.averageRating * trip.countOfRatings + rating) / (trip.countOfRatings + 1);
        trip.countOfRatings++;
      });
    }
  }

  removeOneRatingLocally(tripId: number, rating: number): void {
    const trip = this.trips.get(tripId);
    if (trip) {
      if (trip.countOfRatings === 1) {
        trip.averageRating = 0;
      } else {
        trip.averageRating = (trip.averageRating * trip.countOfRatings - rating) / (trip.countOfRatings - 1);
      }

      trip.countOfRatings--;
    }
  }

  removeOneRating(tripId: number, rating: number): void {
    const trip = this.trips.get(tripId);
    if (trip) {
      const username = 'test_user';
      const url = environment.backend.url + `/rating/${tripId}/${username}`;

      this.http.delete(url).subscribe(() => {
        this.removeOneRatingLocally(tripId, rating);
      });
    }
  }

  static dateToString(date: Date): string {
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

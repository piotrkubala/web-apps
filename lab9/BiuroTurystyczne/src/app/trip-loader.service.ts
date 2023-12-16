import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Trip } from './trip';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TripLoaderService {
  trips: Map<number, Trip> = new Map<number, Trip>();
  tripsLoaded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {
     this.http.get<Trip[]>('assets/trips-definition.json')
       .subscribe(data => {
          this.trips.clear();

          data.forEach(trip => {
            this.trips.set(trip.id, trip);
          });

          this.tripsLoaded.emit();
       });
  }

  getTrip(tripId: number): Trip | undefined {
    return this.trips.get(tripId);
  }

  _getTripWithHighestPriceMultiplied(multiplier: number = 1): Trip | undefined {
    let bestTrip: Trip | undefined = undefined;

    this.trips.forEach((trip, _) => {
      if (!bestTrip || trip.price * multiplier > bestTrip.price * multiplier) {
        bestTrip = trip;
      }
    });

    return bestTrip;
  }

  getTripWithHighestPrice(): Trip | undefined {
    return this._getTripWithHighestPriceMultiplied();
  }

  getTripWithLowestPrice(): Trip | undefined {
    return this._getTripWithHighestPriceMultiplied(-1);
  }
}

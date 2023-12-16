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

  getHighestPrice(): number {
    return Math.max(...Array.from(this.trips.values()).map(trip => trip.priceMinor));
  }

  getLowestPrice(): number {
    return Math.min(...Array.from(this.trips.values()).map(trip => trip.priceMinor));
  }
}

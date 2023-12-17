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
  _lastId: number = 0;


  constructor(private http: HttpClient) {
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
      image: ''
    };
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
}

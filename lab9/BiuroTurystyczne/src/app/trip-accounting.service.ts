import { Injectable } from '@angular/core';

import { TripLoaderService} from "./trip-loader.service";
import {TripAccountingState} from "./trip-accounting-state";
import {Trip} from "./trip";

@Injectable({
  providedIn: 'root'
})
export class TripAccountingService {
  tripAccountingStates: Map<number, TripAccountingState> = new Map<number, TripAccountingState>();

  _refreshTripAccountingStates(): void {
    const highestPrice = this.tripLoaderService.getHighestPrice();
    const lowestPrice = this.tripLoaderService.getLowestPrice();

    this.tripAccountingStates.clear();

    this.tripLoaderService.trips.forEach((trip, _) => {
      this.tripAccountingStates.set(trip.id,
        new TripAccountingState(trip.reservedPlacesCount,
                    trip.price === lowestPrice,
                    trip.price === highestPrice)
      );
    });

    console.log(this.tripAccountingStates);
  }

  constructor(private tripLoaderService: TripLoaderService) {
    this.tripLoaderService.tripsLoaded.subscribe(() => {
      this._refreshTripAccountingStates();
    });

    this._refreshTripAccountingStates();
  }

  changeReservation(tripId: number, reservedPlacesCountDelta: number): boolean {
    const tripAccountingState = this.tripAccountingStates.get(tripId);
    const trip = this.tripLoaderService.getTrip(tripId);

    if (tripAccountingState && trip) {
      const newReservedPlacesCount = tripAccountingState.totalReservedPlacesCount + reservedPlacesCountDelta;

      if (newReservedPlacesCount < trip.reservedPlacesCount || newReservedPlacesCount > trip.maxParticipants) {
        return false;
      }

      tripAccountingState.totalReservedPlacesCount = newReservedPlacesCount;
      return true;
    }
    return false;
  }

  getCurrentUserReservedPlacesCount(tripId: number): number {
    const tripAccountingState = this.tripAccountingStates.get(tripId);
    const trip = this.tripLoaderService.getTrip(tripId);

    if (tripAccountingState && trip) {
      return tripAccountingState.totalReservedPlacesCount - trip.reservedPlacesCount;
    }
    return 0;
  }

  isFullyReserved(tripId: number): boolean {
    const tripAccountingState = this.tripAccountingStates.get(tripId);
    const trip = this.tripLoaderService.getTrip(tripId);

    if (tripAccountingState && trip) {
      return tripAccountingState.totalReservedPlacesCount >= trip.maxParticipants;
    }
    return false;
  }

  currentUserDidReserve(tripId: number): boolean {
    return this.getCurrentUserReservedPlacesCount(tripId) > 0;
  }

  isHighestPrice(tripId: number): boolean {
    const tripAccountingState = this.tripAccountingStates.get(tripId);

    if (tripAccountingState) {
      return tripAccountingState.isHighestPrice;
    }
    return false;
  }

  isLowestPrice(tripId: number): boolean {
    const tripAccountingState = this.tripAccountingStates.get(tripId);

    if (tripAccountingState) {
      return tripAccountingState.isLowestPrice;
    }
    return false;
  }
}

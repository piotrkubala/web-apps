import { Injectable } from '@angular/core';

import { TripLoaderService} from "./trip-loader.service";
import {TripAccountingState} from "./trip-accounting-state";
import {Trip} from "./trip";
import {TotalReservedTripsCounterService} from "./total-reserved-trips-counter.service";

@Injectable({
  providedIn: 'root'
})
export class TripAccountingService {
  tripAccountingStates: Map<number, TripAccountingState> = new Map<number, TripAccountingState>();
  possibleRatingValues: number[] = [1, 2, 3, 4, 5];

  _refreshTripAccountingStates(): void {
    const highestPrice = this.tripLoaderService.getHighestPrice();
    const lowestPrice = this.tripLoaderService.getLowestPrice();

    this.tripAccountingStates.clear();
    this.totalReservedTripsCounterService.resetTotalReservedTripsCount();

    this.tripLoaderService.trips.forEach((trip, _) => {
      this.tripAccountingStates.set(trip.id,
        new TripAccountingState(trip.reservedPlacesCount,
                    trip.priceMinor === lowestPrice,
                    trip.priceMinor === highestPrice)
      );
      this.totalReservedTripsCounterService.updateTotalReservedTripsCount(trip.reservedPlacesCount);
    });
  }

  constructor(public tripLoaderService: TripLoaderService,
              private totalReservedTripsCounterService: TotalReservedTripsCounterService) {
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
      this.totalReservedTripsCounterService.updateTotalReservedTripsCount(reservedPlacesCountDelta);
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

  calculateTotalReservedTripsForCurrentUser(): number {
    let totalReservedTrips =
      Array.from(this.tripAccountingStates.values())
        .map((tripAccountingState) => tripAccountingState.totalReservedPlacesCount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let totalBookedTrips =
      Array.from(this.tripLoaderService.trips.values())
        .map((trip) => trip.reservedPlacesCount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return totalReservedTrips - totalBookedTrips;
  }

  rateTrip(tripId: number, rate: number): void {
    const tripAccountingState = this.tripAccountingStates.get(tripId);

    if (tripAccountingState) {
      tripAccountingState.rate = rate;
    }
  }
}

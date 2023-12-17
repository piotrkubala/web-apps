import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalReservedTripsCounterService {
  totalReservedTrips = 0;

  updateTotalReservedTripsCount(reservedPlacesCountDelta: number): void {
    this.totalReservedTrips += reservedPlacesCountDelta;
  }

  resetTotalReservedTripsCount(): void {
    this.totalReservedTrips = 0;
  }
}

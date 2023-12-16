import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalReservedTripsCounterService {
  totalReservedTrips = 0;

  constructor() { }

  updateTotalReservedTripsCount(reservedPlacesCountDelta: number): void {
    this.totalReservedTrips += reservedPlacesCountDelta;
  }
}

import { Component } from '@angular/core';
import {TripAccountingService} from "../trip-accounting.service";
import {Trip} from "../trip";
import {NgForOf, NgIf} from "@angular/common";
import {TripAccountingState} from "../trip-accounting-state";
import {ReservationComponent} from "./reservation/reservation.component";
import {TotalReservedTripsCounterService} from "../total-reserved-trips-counter.service";

@Component({
  selector: 'app-reservation-summary',
  standalone: true,
  imports: [
    NgForOf,
    ReservationComponent,
    NgIf
  ],
  templateUrl: './reservation-summary.component.html',
  styleUrl: './reservation-summary.component.css'
})
export class ReservationSummaryComponent {
  constructor(public tripAccountingService: TripAccountingService,
              private totalReservedTripsService: TotalReservedTripsCounterService) {}

  getReservedTrips(): Trip[] {
    return this.tripAccountingService.getReservedTrips();
  }

  getTotalReservedTripsCount(): number {
    return this.totalReservedTripsService.totalReservedTrips;
  }

  getTotalPriceString(): string {
    return this.tripAccountingService.getTotalReservationPriceForAllTripsString();
  }

  reservedTripExists(): boolean {
    return this.tripAccountingService.getReservedTrips().length > 0;
  }
}

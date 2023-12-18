import { Component } from '@angular/core';
import {TripLoaderService} from "../trip-loader.service";
import {TripComponent} from "../trip/trip.component";
import {CommonModule} from "@angular/common";
import {
  TotalReservedTripsCounterComponent
} from "../total-reserved-trips-counter/total-reserved-trips-counter.component";
import {TripCreatorComponent} from "./trip-creator/trip-creator.component";
import {ReservationSummaryComponent} from "../reservation-summary/reservation-summary.component";
import {TripFilterComponent} from "./trip-filter/trip-filter.component";

@Component({
  selector: 'app-trip-board',
  standalone: true,
  imports: [
    TripComponent,
    CommonModule,
    TotalReservedTripsCounterComponent,
    TripCreatorComponent,
    ReservationSummaryComponent,
    TripFilterComponent
  ],
  templateUrl: './trip-board.component.html',
  styleUrl: './trip-board.component.css'
})
export class TripBoardComponent {
  tripLoader: TripLoaderService;

  constructor(tripLoader: TripLoaderService) {
    this.tripLoader = tripLoader;
  }
}

import {Component} from '@angular/core';
import {TripLoaderService} from "../../services/trip-loader.service";
import {TripComponent} from "../trip/trip.component";
import {CommonModule} from "@angular/common";
import {
  TotalReservedTripsCounterComponent
} from "../total-reserved-trips-counter/total-reserved-trips-counter.component";
import {TripCreatorComponent} from "./trip-creator/trip-creator.component";
import {ReservationSummaryComponent} from "../reservation-summary/reservation-summary.component";
import {TripFilterComponent} from "./trip-filter/trip-filter.component";
import {TripFilterPipe} from "../../pipes/trip-filter.pipe";
import {TripFilterService} from "../../services/trip-filter.service";

@Component({
  selector: 'app-trip-board',
  standalone: true,
  imports: [
    TripComponent,
    CommonModule,
    TotalReservedTripsCounterComponent,
    TripCreatorComponent,
    ReservationSummaryComponent,
    TripFilterComponent,
    TripFilterPipe
  ],
  templateUrl: './trip-board.component.html',
  styleUrl: './trip-board.component.css'
})
export class TripBoardComponent {
  refreshState: boolean = false;

  constructor(public tripLoader: TripLoaderService, private tripFilterService: TripFilterService) {
    this.tripFilterService.filterChanged.subscribe(() => {
      this.refreshState = !this.refreshState;
    });
  }
}

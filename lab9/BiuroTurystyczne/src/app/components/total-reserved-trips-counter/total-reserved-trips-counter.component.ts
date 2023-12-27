import { Component } from '@angular/core';
import {TotalReservedTripsCounterService} from "../../services/total-reserved-trips-counter.service";

@Component({
  selector: 'app-total-reserved-trips-counter',
  standalone: true,
  imports: [],
  templateUrl: './total-reserved-trips-counter.component.html',
  styleUrl: './total-reserved-trips-counter.component.css'
})
export class TotalReservedTripsCounterComponent {
  constructor(public totalReservedTripsCounterService: TotalReservedTripsCounterService) {
  }

  getColorNameByTotalReservedTripsCount(): string {
    const totalReservedTripsCount = this.totalReservedTripsCounterService.totalReservedTrips;

    if (totalReservedTripsCount >= 10) {
      return 'green';
    }

    return 'red';
  }
}

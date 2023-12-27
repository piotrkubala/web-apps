import {Component, Input, OnInit} from '@angular/core';
import {Trip} from "../../../utilities/trip";
import {TripAccountingState} from "../../../utilities/trip-accounting-state";
import {TripAccountingService} from "../../../services/trip-accounting.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.css'
})
export class BasketItemComponent implements OnInit {
  @Input() trip!: Trip;
  tripAccountingState!: TripAccountingState;

  constructor(private tripAccountingService: TripAccountingService) {
  }

  ngOnInit(): void {
    this.tripAccountingState = this.tripAccountingService.getTripAccountingState(this.trip.id);
  }

  getReservationCount(): number {
    return this.tripAccountingService.getCurrentUserReservedPlacesCount(this.trip.id);
  }

  getTotalPriceString(): string {
    return this.tripAccountingService.getTotalReservationPriceString(this.trip.id);
  }

  reserveMorePlaces(): void {
    this.tripAccountingService.changeReservation(this.trip.id, 1);
  }

  reserveLessPlaces(): void {
    if (this.getReservationCount() <= 1) {
      return;
    }

    this.tripAccountingService.changeReservation(this.trip.id, -1);
  }

  removeFromBasket(): void {
    this.tripAccountingService.unreserveAllThisUserPlaces(this.trip.id);
  }
}

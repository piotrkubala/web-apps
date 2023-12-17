import {Component, Input, OnInit} from '@angular/core';
import {Trip} from "../../trip";
import {TripAccountingState} from "../../trip-accounting-state";
import {NgForOf} from "@angular/common";
import {TripAccountingService} from "../../trip-accounting.service";
import {CurrencyExchangeService} from "../../currency-exchange.service";
import {Money} from "../../money";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {
  @Input() trip!: Trip;
  tripAccountingState!: TripAccountingState;

  constructor(private tripAccountingService: TripAccountingService) {}

  ngOnInit(): void {
    this.tripAccountingState = this.tripAccountingService.getTripAccountingState(this.trip.id);
  }

  getReservedPlacesCount(): number {
    return this.tripAccountingService.getCurrentUserReservedPlacesCount(this.trip.id);
  }

  getTotalPriceString(): string {
    return this.tripAccountingService.getTotalReservationPriceString(this.trip.id);
  }
}

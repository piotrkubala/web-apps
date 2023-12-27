import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {TripAccountingService} from "../../services/trip-accounting.service";
import {Trip} from "../../utilities/trip";

@Component({
  selector: 'app-trip-reserver',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './trip-reserver.component.html',
  styleUrl: './trip-reserver.component.css'
})
export class TripReserverComponent {
  @Input() trip!: Trip;

  constructor(private tripAccountingService: TripAccountingService) {
  }

  _changeReservation(reservedPlacesCountDelta: number): void {
    this.tripAccountingService.changeReservation(this.trip.id, reservedPlacesCountDelta);
  }

  reservePlace(): void {
    this._changeReservation(1);
  }

  unreservePlace(): void {
    this._changeReservation(-1)
  }

  isFullyReserved(): boolean {
    return this.tripAccountingService.isFullyReserved(this.trip.id);
  }

  didUserReserve(): boolean {
    return this.tripAccountingService.currentUserDidReserve(this.trip.id);
  }
}

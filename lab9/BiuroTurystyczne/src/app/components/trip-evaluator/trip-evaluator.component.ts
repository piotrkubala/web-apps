import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {TripAccountingService} from "../../services/trip-accounting.service";
import {Trip} from "../../utilities/trip";
import {TripLoaderService} from "../../services/trip-loader.service";

@Component({
  selector: 'app-trip-evaluator',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf
    ],
  templateUrl: './trip-evaluator.component.html',
  styleUrl: './trip-evaluator.component.css'
})
export class TripEvaluatorComponent {
  @Input() trip!: Trip;
  ratingString: string = "0";

  constructor(public tripAccountingService: TripAccountingService,
              private tripLoaderService: TripLoaderService) {
  }

  rateTrip(): void {
    const rating = Number(this.ratingString);
    this.tripAccountingService.rateTrip(this.trip.id, rating);
  }

  wasTripRated(): boolean {
    return this.tripAccountingService.wasTripRated(this.trip.id);
  }

  getColorByRating(): string {
    const rating = this.tripAccountingService.getTripRating(this.trip.id);

    if (rating >= 4) {
      return "lightgreen";
    }

    if (rating <= 2) {
      return "red";
    }

    return "white";
  }

  getAverageRating(): number {
    return Math.round((this.tripLoaderService.getRating(this.trip.id) + Number.EPSILON) * 100) / 100;
  }

  getCountOfRatings(): number {
    return this.tripLoaderService.getCountOfRatings(this.trip.id);
  }
}

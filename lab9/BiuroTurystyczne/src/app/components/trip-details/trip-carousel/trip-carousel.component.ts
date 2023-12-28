import {Component, Input} from '@angular/core';
import {Trip} from "../../../utilities/trip";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-trip-carousel',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './trip-carousel.component.html',
  styleUrl: './trip-carousel.component.css'
})
export class TripCarouselComponent {
  @Input() trip!: Trip;

  getTripPhotos(): TripPhoto[] {
    return this.trip.tripPhotos.map((photoUrl, index) =>
      new TripPhoto(photoUrl, index === 0 ? 'active' : '')
    );
  }
}

class TripPhoto {
  constructor(public url: string, public extraClasses: string = '') {
  }
}

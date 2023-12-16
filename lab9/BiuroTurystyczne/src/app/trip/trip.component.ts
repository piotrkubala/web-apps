import {Component, Input} from '@angular/core';

import { TripAccountingService} from "../trip-accounting.service";
import { Trip } from '../trip';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent {
  @Input() trip!: Trip;

  constructor(private tripAccountingService: TripAccountingService) {
  }

  reservePlace(): void {

  }

  unreservePlace(): void {

  }
}

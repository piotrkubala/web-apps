import {Component, Input} from '@angular/core';

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

  reservePlace(): void {

  }

  unreservePlace(): void {

  }
}

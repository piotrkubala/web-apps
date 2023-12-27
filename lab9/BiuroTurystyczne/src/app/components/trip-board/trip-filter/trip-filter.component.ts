import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TripFilterService} from "../../../services/trip-filter.service";

@Component({
  selector: 'app-trip-filter',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './trip-filter.component.html',
  styleUrl: './trip-filter.component.css'
})
export class TripFilterComponent {
  constructor(public tripFilterService: TripFilterService) {
  }

}

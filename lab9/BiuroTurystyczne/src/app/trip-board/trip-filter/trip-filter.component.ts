import {Component} from '@angular/core';
import {TripAccountingService} from "../../trip-accounting.service";
import {TripLoaderService} from "../../trip-loader.service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CurrencyExchangeService} from "../../currency-exchange.service";
import {TripFilterService} from "../../trip-filter.service";

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

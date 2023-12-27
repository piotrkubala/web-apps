import {Component, Input, OnInit} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {Trip} from "../../utilities/trip";
import {Money} from "../../utilities/money";
import {CurrencyExchangeService} from "../../services/currency-exchange.service";
import {TripAccountingService} from "../../services/trip-accounting.service";
import {TripLoaderService} from "../../services/trip-loader.service";
import {TripEvaluatorComponent} from "../trip-evaluator/trip-evaluator.component";
import {TripReserverComponent} from "../trip-reserver/trip-reserver.component";

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [
    UpperCasePipe,
    TripEvaluatorComponent,
    TripReserverComponent
  ],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css'
})
export class TripDetailsComponent {
  trip: Trip;
  tripId: number = -1;

  loadTrip(): void {
    this.trip = this.tripLoaderService.getTrip(this.tripId) ?? this.tripLoaderService.getEmptyTrip();
  }

  constructor(private currencyExchangeService: CurrencyExchangeService,
              private tripAccountingService: TripAccountingService,
              private tripLoaderService: TripLoaderService) {

    this.trip = this.tripLoaderService.getEmptyTrip();

    this.tripLoaderService.tripsLoaded.subscribe(() => {
      this.loadTrip();
    });
  }

  @Input()
  set id(idString: string) {
    this.tripId = parseInt(idString);
    this.loadTrip();
  }

  getReservedPlacesCount(): number {
    return this.tripAccountingService.getCurrentUserReservedPlacesCount(this.trip.id);
  }

  getMoneyString(): string {
    return this.currencyExchangeService.getMoneyStringInBaseCurrency(
      new Money(this.trip.priceMinor, this.trip.currency)
    );
  }
}

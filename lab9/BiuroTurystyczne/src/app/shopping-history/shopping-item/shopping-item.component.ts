import {Component, Input, OnInit} from '@angular/core';
import {ShoppingHistoryItem} from "../../shopping-history-item";
import {TripAccountingState} from "../../trip-accounting-state";
import {TripAccountingService} from "../../trip-accounting.service";
import {TripLoaderService} from "../../trip-loader.service";
import {CurrencyExchangeService} from "../../currency-exchange.service";
import {Money} from "../../money";
import {HistoryItemState} from "../../history-item-state";

@Component({
  selector: 'app-shopping-item',
  standalone: true,
  imports: [],
  templateUrl: './shopping-item.component.html',
  styleUrl: './shopping-item.component.css'
})
export class ShoppingItemComponent implements OnInit {
  @Input() shoppingHistoryItem!: ShoppingHistoryItem;
  tripAccountingState!: TripAccountingState;

  constructor(private tripAccountingService: TripAccountingService,
              private tripLoaderService: TripLoaderService,
              private currencyExchangeService: CurrencyExchangeService) {}

  ngOnInit(): void {
    this.tripAccountingState = this.tripAccountingService.getTripAccountingState(this.shoppingHistoryItem.trip.id);
  }

  getTripPurchaseDate(): string {
    return this.tripLoaderService.dateToString(this.shoppingHistoryItem.timeOfPurchase);
  }

  getTripStartDate(): string {
    const startDate = new Date(this.shoppingHistoryItem.trip.startDate);
    return this.tripLoaderService.dateToString(startDate);
  }

  getTripEndDate(): string {
    const endDate = new Date(this.shoppingHistoryItem.trip.endDate);
    return this.tripLoaderService.dateToString(endDate);
  }

  getTripPrice(): string {
    return this.currencyExchangeService.getMoneyStringInBaseCurrency(
      new Money(this.shoppingHistoryItem.trip.priceMinor, this.shoppingHistoryItem.trip.currency)
    );
  }

  getTripCountOfTickets(): number {
    return this.shoppingHistoryItem.countOfTickets;
  }

  getTripStatusName(): string {
    const tripStatus = this.shoppingHistoryItem.currentTripState;
    switch (tripStatus) {
      case HistoryItemState.BeforeDeparture:
        return "Before departure";
      case HistoryItemState.DuringTrip:
        return "During trip";
      case HistoryItemState.Ended:
        return "Ended";
    }
  }

  getTripStatusColor(): string {
    const tripStatus = this.shoppingHistoryItem.currentTripState;
    switch (tripStatus) {
      case HistoryItemState.BeforeDeparture:
        return "yellow";
      case HistoryItemState.DuringTrip:
        return "green";
      case HistoryItemState.Ended:
        return "red";
    }
  }
}

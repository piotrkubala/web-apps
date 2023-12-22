import {EventEmitter, Injectable} from '@angular/core';
import {ShoppingHistoryItem} from "./shopping-history-item";
import {TripAccountingService} from "./trip-accounting.service";
import {Trip} from "./trip";

@Injectable({
  providedIn: 'root'
})
export class ShoppingHistoryService {
  onShoppingHistoryChanged: EventEmitter<void> = new EventEmitter<void>();
  shoppingHistoryItems: ShoppingHistoryItem[] = [];

  constructor(private tripAccountingService: TripAccountingService) {}

  buyTrip(trip: Trip): void {
    const countOfTickets = this.tripAccountingService.getCurrentUserReservedPlacesCount(trip.id);

    if (countOfTickets === 0) {
      return;
    }

    const newShoppingHistoryItem = new ShoppingHistoryItem(trip, countOfTickets, new Date());
    this.shoppingHistoryItems.push(newShoppingHistoryItem);
    this.tripAccountingService.markCurrentUserReservedPlacesAsBought(trip.id);

    this.onShoppingHistoryChanged.emit();
  }

  buyTrips(trips: Trip[]): void {
    trips.forEach(trip => this.buyTrip(trip));
  }

  isShoppingHistoryEmpty(): boolean {
    return this.shoppingHistoryItems.length === 0;
  }
}

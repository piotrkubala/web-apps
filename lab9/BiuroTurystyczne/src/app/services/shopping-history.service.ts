import {EventEmitter, Injectable} from '@angular/core';
import {ShoppingHistoryItem, ShoppingHistoryItemInterface} from "../utilities/shopping-history-item";
import {TripAccountingService} from "./trip-accounting.service";
import {Trip} from "../utilities/trip";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShoppingHistoryService {
  onShoppingHistoryChanged: EventEmitter<void> = new EventEmitter<void>();
  shoppingHistoryItems: ShoppingHistoryItem[] = [];

  /* TODO: get username from auth service */
  username: string = 'test_user';

  triggerHistoryUpdate(): void {
    const url = environment.backend.url + '/history/' + this.username;

    this.http.get<ShoppingHistoryItemInterface[]>(url).subscribe(shoppingHistoryItems => {
      this.shoppingHistoryItems = shoppingHistoryItems
        .map(shoppingHistoryItem => new ShoppingHistoryItem(
          shoppingHistoryItem.username,
          shoppingHistoryItem.trip,
          shoppingHistoryItem.countOfTickets,
          shoppingHistoryItem.timeOfPurchase
        ));

      this.onShoppingHistoryChanged.emit();
    });
  }

  constructor(private tripAccountingService: TripAccountingService,
              private http: HttpClient) {
    this.triggerHistoryUpdate();
  }

  buyTrip(trip: Trip): void {
    const countOfTickets = this.tripAccountingService.getCurrentUserReservedPlacesCount(trip.id);

    if (countOfTickets === 0) {
      return;
    }

    const url = environment.backend.url + '/history/';
    const newShoppingHistoryItem =
      new ShoppingHistoryItem(this.username, trip, countOfTickets, new Date().toISOString());

    this.http.post(url, newShoppingHistoryItem).subscribe(() => {
      this.shoppingHistoryItems.push(newShoppingHistoryItem);
      this.tripAccountingService.markCurrentUserReservedPlacesAsBought(trip.id);

      this.onShoppingHistoryChanged.emit();
    });
  }

  buyTrips(trips: Trip[]): void {
    trips.forEach(trip => this.buyTrip(trip));
  }

  isShoppingHistoryEmpty(): boolean {
    return this.shoppingHistoryItems.length === 0;
  }

  wasTripBoughtById(tripId: number): boolean {
    return this.shoppingHistoryItems
      .some(shoppingHistoryItem => shoppingHistoryItem.trip.id === tripId);
  }
}

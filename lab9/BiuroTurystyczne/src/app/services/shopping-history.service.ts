import {EventEmitter, Injectable} from '@angular/core';
import {ShoppingHistoryItem, ShoppingHistoryItemInterface} from "../utilities/shopping-history-item";
import {TripAccountingService} from "./trip-accounting.service";
import {Trip} from "../utilities/trip";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingHistoryService {
  onShoppingHistoryChanged: EventEmitter<void> = new EventEmitter<void>();
  shoppingHistoryItems: ShoppingHistoryItem[] = [];

  username: string = "test_user";

  triggerHistoryUpdate(): void {
    this.username = this.userService.user?.username ?? "test_user";
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

  constructor(private userService: UserService,
              private http: HttpClient) {
    this.triggerHistoryUpdate();

    this.userService.onUserStatusChanged.subscribe(() => {
      this.triggerHistoryUpdate();
    });
  }

  addShoppingHistoryItem(shoppingHistoryItem: ShoppingHistoryItem): void {
    this.shoppingHistoryItems.push(shoppingHistoryItem);
    this.onShoppingHistoryChanged.emit();
  }

  isShoppingHistoryEmpty(): boolean {
    return this.shoppingHistoryItems.length === 0;
  }

  wasTripBoughtById(tripId: number): boolean {
    return this.shoppingHistoryItems
      .some(shoppingHistoryItem => shoppingHistoryItem.trip.id === tripId);
  }
}

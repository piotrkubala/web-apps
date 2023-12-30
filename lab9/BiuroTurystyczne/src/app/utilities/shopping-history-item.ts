import {Trip} from "./trip";
import {HistoryItemState} from "./history-item-state";

export class ShoppingHistoryItem implements ShoppingHistoryItemInterface {
  username: string;
  trip: Trip;
  countOfTickets: number;
  timeOfPurchase: string;

  constructor(username: string, trip: Trip, countOfTickets: number, timeOfPurchase: string) {
    this.username = username;
    this.trip = trip;
    this.countOfTickets = countOfTickets;
    this.timeOfPurchase = timeOfPurchase;
  }

  getTimeOfPurchaseDate(): Date {
    return new Date(this.timeOfPurchase);
  }

  getCurrentTripState(): HistoryItemState {
    const currentDateTime = new Date();
    const tripStartDate = new Date(this.trip.startDate);
    const tripEndDate = new Date(this.trip.endDate);

    if (currentDateTime < tripStartDate) {
      return HistoryItemState.BeforeDeparture;
    }
    if (currentDateTime > tripEndDate) {
      return HistoryItemState.Ended;
    }

    return HistoryItemState.DuringTrip;
  }
}

export interface ShoppingHistoryItemInterface {
  username: string;
  trip: Trip;
  countOfTickets: number;
  timeOfPurchase: string;
}

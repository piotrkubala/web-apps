import {Trip} from "./trip";
import {HistoryItemState} from "./history-item-state";

export class ShoppingHistoryItem {
  trip: Trip;
  countOfTickets: number;
  timeOfPurchase: Date;

  constructor(trip: Trip, countOfTickets: number, timeOfPurchase: Date) {
    this.trip = trip;
    this.countOfTickets = countOfTickets;
    this.timeOfPurchase = timeOfPurchase;
  }

  get currentTripState(): HistoryItemState {
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

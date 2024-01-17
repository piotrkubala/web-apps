import {EventEmitter, Injectable} from '@angular/core';

import { TripLoaderService} from "./trip-loader.service";
import {TripAccountingState} from "../utilities/trip-accounting-state";
import {Trip} from "../utilities/trip";
import {TotalReservedTripsCounterService} from "./total-reserved-trips-counter.service";
import {Money} from "../utilities/money";
import {CurrencyExchangeService} from "./currency-exchange.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";
import {ShoppingHistoryService} from "./shopping-history.service";
import {ShoppingHistoryItem} from "../utilities/shopping-history-item";

@Injectable({
  providedIn: 'root'
})
export class TripAccountingService {
  thisUserRatingsLoaded: EventEmitter<void> = new EventEmitter<void>();

  tripAccountingStates: Map<number, TripAccountingState> = new Map<number, TripAccountingState>();
  possibleRatingValues: number[] = [1, 2, 3, 4, 5];

  private _loadThisUserRatings(): void {
    const username = this.userService.user?.username ?? "test_user";

    const url = environment.backend.url + '/rating/' + username;

    this.http.get<{tripId: number, rating: number, username: string}[]>(url).subscribe(ratings => {
      ratings.forEach(rating => {
        const tripAccountingState = this.tripAccountingStates.get(rating.tripId);

        if (tripAccountingState) {
          tripAccountingState.rate = rating.rating;
        }
      });

      this.thisUserRatingsLoaded.emit();
    });
  }

  private _refreshTripAccountingStates(): void {
    const highestPrice = this.tripLoaderService.getHighestPrice();
    const lowestPrice = this.tripLoaderService.getLowestPrice();

    const oldTripIds = new Set<number>(this.tripAccountingStates.keys());
    const newTripIds = new Set<number>(this.tripLoaderService.trips.keys());

    const removedTripIds = Array.from(oldTripIds.values())
      .filter((tripId) => !newTripIds.has(tripId));
    const addedTripIds = Array.from(newTripIds.values())
      .filter((tripId) => !oldTripIds.has(tripId));
    const notChangedTripIds = Array.from(newTripIds.values())
      .filter((tripId) => oldTripIds.has(tripId));

    removedTripIds.forEach((tripId) => {
      const tripAccountingState = this.tripAccountingStates.get(tripId);

      this.tripAccountingStates.delete(tripId);

      if (tripAccountingState) {
        this.totalReservedTripsCounterService
          .updateTotalReservedTripsCount(-tripAccountingState.totalReservedPlacesCount);
      }
    });

    addedTripIds.forEach((tripId) => {
      const trip = this.tripLoaderService.getTrip(tripId);

      if (trip) {
        const tripAccountingState =
          new TripAccountingState(
            trip.reservedPlacesCount,
            trip.priceMinor === lowestPrice,
            trip.priceMinor === highestPrice
          );

        this.tripAccountingStates.set(tripId, tripAccountingState);
      }
    });

    notChangedTripIds.forEach((tripId) => {
      const tripAccountingState = this.tripAccountingStates.get(tripId);
      const trip = this.tripLoaderService.getTrip(tripId);

      if (tripAccountingState && trip) {
        tripAccountingState.isLowestPrice = trip.priceMinor === lowestPrice;
        tripAccountingState.isHighestPrice = trip.priceMinor === highestPrice;
      }
    });

    this._loadThisUserRatings();
  }

  constructor(public tripLoaderService: TripLoaderService,
              private totalReservedTripsCounterService: TotalReservedTripsCounterService,
              private currencyExchangeService: CurrencyExchangeService,
              private http: HttpClient,
              private userService: UserService,
              private shoppingHistoryService: ShoppingHistoryService) {
    this.tripLoaderService.tripsLoaded.subscribe(() => {
      this._refreshTripAccountingStates();
    });

    this._refreshTripAccountingStates();
  }

  changeReservation(tripId: number, reservedPlacesCountDelta: number): boolean {
    const tripAccountingState = this.tripAccountingStates.get(tripId);
    const trip = this.tripLoaderService.getTrip(tripId);

    if (tripAccountingState && trip) {
      const newReservedPlacesCount = tripAccountingState.totalReservedPlacesCount + reservedPlacesCountDelta;

      if (newReservedPlacesCount < trip.reservedPlacesCount || newReservedPlacesCount > trip.maxParticipants) {
        return false;
      }

      tripAccountingState.totalReservedPlacesCount = newReservedPlacesCount;
      this.totalReservedTripsCounterService.updateTotalReservedTripsCount(reservedPlacesCountDelta);
      return true;
    }
    return false;
  }

  getCurrentUserReservedPlacesCount(tripId: number): number {
    const tripAccountingState = this.tripAccountingStates.get(tripId);
    const trip = this.tripLoaderService.getTrip(tripId);

    if (tripAccountingState && trip) {
      return tripAccountingState.totalReservedPlacesCount - trip.reservedPlacesCount;
    }
    return 0;
  }

  isFullyReserved(tripId: number): boolean {
    const tripAccountingState = this.tripAccountingStates.get(tripId);
    const trip = this.tripLoaderService.getTrip(tripId);

    if (tripAccountingState && trip) {
      return tripAccountingState.totalReservedPlacesCount >= trip.maxParticipants;
    }
    return false;
  }

  currentUserDidReserve(tripId: number): boolean {
    return this.getCurrentUserReservedPlacesCount(tripId) > 0;
  }

  isHighestPrice(tripId: number): boolean {
    const tripAccountingState = this.tripAccountingStates.get(tripId);

    if (tripAccountingState) {
      return tripAccountingState.isHighestPrice;
    }
    return false;
  }

  isLowestPrice(tripId: number): boolean {
    const tripAccountingState = this.tripAccountingStates.get(tripId);

    if (tripAccountingState) {
      return tripAccountingState.isLowestPrice;
    }
    return false;
  }

  calculateTotalReservedTripsForCurrentUser(): number {
    let totalReservedTrips =
      Array.from(this.tripAccountingStates.values())
        .map((tripAccountingState) => tripAccountingState.totalReservedPlacesCount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let totalBookedTrips =
      Array.from(this.tripLoaderService.trips.values())
        .map((trip) => trip.reservedPlacesCount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return totalReservedTrips - totalBookedTrips;
  }

  buyTrip(trip: Trip): void {
    const countOfTickets = this.getCurrentUserReservedPlacesCount(trip.id);

    if (countOfTickets === 0) {
      return;
    }

    const username = this.userService.user?.username ?? "test_user";

    const url = environment.backend.url + '/history/';
    const newShoppingHistoryItem =
      new ShoppingHistoryItem(username, trip, countOfTickets, new Date().toISOString());

    this.http.post(url, newShoppingHistoryItem).subscribe(() => {
      this.markCurrentUserReservedPlacesAsBought(trip.id);

      this.shoppingHistoryService.addShoppingHistoryItem(newShoppingHistoryItem);
    });
  }

  buyTrips(trips: Trip[]): void {
    trips.forEach(trip => this.buyTrip(trip));
  }

  rateTrip(tripId: number, rate: number): void {
    if(!this.shoppingHistoryService.wasTripBoughtById(tripId)) {
      return;
    }

    const tripAccountingState = this.tripAccountingStates.get(tripId);

    if (tripAccountingState) {
      const oldRate = tripAccountingState.rate;

      tripAccountingState.rate = rate;

      if (oldRate !== 0) {
        this.tripLoaderService.removeOneRatingLocally(tripId, oldRate);
      }

      if (rate !== 0) {
        this.tripLoaderService.updateRating(tripId, rate);
      }
    }
  }

  wasTripRated(tripId: number): boolean {
    const tripAccountingState = this.tripAccountingStates.get(tripId);

    if (tripAccountingState) {
      return tripAccountingState.rate > 0;
    }
    return false;
  }

  getTripRating(tripId: number): number {
    const tripAccountingState = this.tripAccountingStates.get(tripId);

    if (tripAccountingState) {
      return tripAccountingState.rate;
    }
    return 0;
  }

  getReservedTrips(): Trip[] {
    return Array.from(this.tripLoaderService.trips.values())
      .filter((trip) => this.getCurrentUserReservedPlacesCount(trip.id) > 0);
  }

  getTripAccountingState(tripId: number): TripAccountingState {
    const tripAccountingState = this.tripAccountingStates.get(tripId);

    if (tripAccountingState) {
      return tripAccountingState;
    }
    return new TripAccountingState(0, false, false);
  }

  getTotalReservationPriceString(tripId: number): string {
    const tripAccountingState = this.tripAccountingStates.get(tripId);
    const trip = this.tripLoaderService.getTrip(tripId);

    if (tripAccountingState && trip) {
      const totalPriceMinor = trip.priceMinor * this.getCurrentUserReservedPlacesCount(tripId);

      return this.currencyExchangeService.getMoneyStringInBaseCurrency(
        new Money(totalPriceMinor, trip.currency)
      );
    }
    return "";
  }

  getTotalReservationPriceForAllTripsString(onlySelected: boolean = false): string {
    const totalPriceMinorInBaseCurrency: number =
      Array.from(this.tripLoaderService.trips.values())
        .map((trip) => {
          const tripAccountingState = this.tripAccountingStates.get(trip.id);

          if (tripAccountingState) {
            if (onlySelected && !tripAccountingState.selectedToBeBought) {
              return 0;
            }

            const totalPriceMinor = trip.priceMinor * this.getCurrentUserReservedPlacesCount(trip.id);

            return this.currencyExchangeService.getMoneyInBaseCurrency(
              new Money(totalPriceMinor, trip.currency)
            ).amountMinor;
          }
          return 0;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return this.currencyExchangeService.getMoneyStringInBaseCurrency(
      new Money(totalPriceMinorInBaseCurrency, this.currencyExchangeService.baseCurrency)
    );
  }

  getSelectedTrips(): Trip[] {
    return Array.from(this.tripLoaderService.trips.values())
      .filter((trip) => {
        const tripAccountingState = this.tripAccountingStates.get(trip.id);

        if (tripAccountingState) {
          return tripAccountingState.selectedToBeBought;
        }
        return false;
      });
  }

  unreserveAllThisUserPlaces(tripId: number): void {
    this.changeReservation(tripId, -this.getCurrentUserReservedPlacesCount(tripId));
  }

  markCurrentUserReservedPlacesAsBought(tripId: number): void {
    const trip = this.tripLoaderService.getTrip(tripId);
    const tripAccountingState = this.tripAccountingStates.get(tripId);
    const reservedPlacesCount = this.getCurrentUserReservedPlacesCount(tripId);

    if (trip && tripAccountingState) {
      trip.reservedPlacesCount = tripAccountingState.totalReservedPlacesCount;
      this.totalReservedTripsCounterService.updateTotalReservedTripsCount(-reservedPlacesCount);
    }
  }
}

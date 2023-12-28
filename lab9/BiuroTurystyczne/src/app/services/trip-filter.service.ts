import {EventEmitter, Injectable} from '@angular/core';
import {TripAccountingService} from "./trip-accounting.service";
import {TripLoaderService} from "./trip-loader.service";
import {CurrencyExchangeService} from "./currency-exchange.service";
import {Trip} from "../utilities/trip";
import {Money} from "../utilities/money";

@Injectable({
  providedIn: 'root'
})
export class TripFilterService {
  filterChanged: EventEmitter<void> = new EventEmitter<void>();

  possibleCountries: string[] = [];
  possibleMinPrice: number = 0;
  possibleMaxPrice: number = 0;
  earliestDate: string = '';
  latestDate: string = '';
  possibleRatings: number[] = [];

  countries: Map<string, boolean> = new Map<string, boolean>();
  minPrice: number = 0;
  maxPrice: number = 0;
  minStartDate: string = '';
  maxStartDate: string = '';
  ratings: Map<number, boolean> = new Map<number, boolean>();

  _refreshPriceRanges(): void {
    this.possibleMinPrice = Math.floor(this.tripLoaderService.getLowestPrice() * 0.01);
    this.possibleMaxPrice = Math.ceil(this.tripLoaderService.getHighestPrice() * 0.01);

    this.minPrice = this.possibleMinPrice;
    this.maxPrice = this.possibleMaxPrice;
  }

  _refreshRanges(): void {
    this.possibleRatings = this.tripAccountingService.possibleRatingValues;
    this.possibleCountries = this.tripLoaderService.getAllUniqueCountriesSorted();
    this.earliestDate = TripLoaderService.dateToString(this.tripLoaderService.getEarliestDate());
    this.latestDate = TripLoaderService.dateToString(this.tripLoaderService.getLatestDate());

    this.possibleCountries.forEach((country) => {
      this.countries.set(country, true);
    });

    this.possibleRatings.forEach((rating) => {
      this.ratings.set(rating, true);
    });

    this.minStartDate = this.earliestDate;
    this.maxStartDate = this.latestDate;

    this._refreshPriceRanges();
  }

  constructor(public tripAccountingService: TripAccountingService,
              private tripLoaderService: TripLoaderService,
              private currencyExchangeService: CurrencyExchangeService) {
    this.tripLoaderService.tripsLoaded.subscribe(() => {
      this._refreshRanges();
    });

    this.currencyExchangeService.baseCurrencyChanged.subscribe(() => {
      this._refreshPriceRanges();
    });

    this._refreshRanges();
  }

  isCountrySelected(country: string): boolean {
    return this.countries.get(country) ?? false;
  }

  toggleCountry(country: string): void {
    this.countries.set(country, !this.countries.get(country));
  }

  isRatingSelected(rating: number): boolean {
    return this.ratings.get(rating) ?? false;
  }

  toggleRating(rating: number): void {
    this.ratings.set(rating, !this.ratings.get(rating));
  }

  onFilterChanged(): void {
    this.filterChanged.emit();
  }

  resetFilter(): void {
    this._refreshRanges();
  }

  check(trip: Trip): boolean {
    const tripPriceInBaseCurrency = this.currencyExchangeService.getMoneyInBaseCurrency(
      new Money(trip.priceMinor, trip.currency)
    ).amountMinor;

    const minStartDate = new Date(this.minStartDate);
    const maxStartDate = new Date(this.maxStartDate);

    const tripStartDate = new Date(trip.startDate);

    const tripRating = trip.averageRating;

    const minPriceMinor = this.minPrice * 100;
    const maxPriceMinor = this.maxPrice * 100;

    if (tripPriceInBaseCurrency < minPriceMinor || tripPriceInBaseCurrency > maxPriceMinor) {
      return false;
    }

    if (tripStartDate < minStartDate || tripStartDate > maxStartDate) {
      return false;
    }

    if (!this.countries.get(trip.country)) {
      return false;
    }

    return tripRating === 0 ||
      Array.from(this.ratings.entries())
        .filter((value, rating) => value[1])
        .map((value) => value[0])
        .some((rating) => Math.abs(rating - tripRating) <= 0.5);
  }
}

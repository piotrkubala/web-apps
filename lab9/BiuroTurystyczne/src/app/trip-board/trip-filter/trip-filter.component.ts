import {Component} from '@angular/core';
import {TripAccountingService} from "../../trip-accounting.service";
import {TripLoaderService} from "../../trip-loader.service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CurrencyExchangeService} from "../../currency-exchange.service";

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
    this.earliestDate = this.tripLoaderService.getEarliestDate().toLocaleDateString();
    this.latestDate = this.tripLoaderService.getLatestDate().toLocaleDateString();

    this.possibleCountries.forEach((country) => {
      this.countries.set(country, false);
    });

    this.possibleRatings.forEach((rating) => {
      this.ratings.set(rating, false);
    });

    this.minStartDate = this.earliestDate;
    this.maxStartDate = this.latestDate;

    this._refreshPriceRanges();

    console.log(this.minStartDate);
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
    return this.countries.get(country) || false;
  }

  toggleCountry(country: string): void {
    this.countries.set(country, !this.countries.get(country));
  }

  isRatingSelected(rating: number): boolean {
    return this.ratings.get(rating) || false;
  }

  toggleRating(rating: number): void {
    this.ratings.set(rating, !this.ratings.get(rating));
  }
}

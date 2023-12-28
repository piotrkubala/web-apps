import {Component, Input} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {Trip} from "../../utilities/trip";
import {Money} from "../../utilities/money";
import {CurrencyExchangeService} from "../../services/currency-exchange.service";
import {TripAccountingService} from "../../services/trip-accounting.service";
import {TripLoaderService} from "../../services/trip-loader.service";
import {TripEvaluatorComponent} from "../trip-evaluator/trip-evaluator.component";
import {TripReserverComponent} from "../trip-reserver/trip-reserver.component";
import {MapLeafletsService} from "../../services/map-leaflets.service";
import * as Leaflet from "leaflet";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {TripCarouselComponent} from "./trip-carousel/trip-carousel.component";
import {TripOpinionsComponent} from "./trip-opinions/trip-opinions.component";

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [
    UpperCasePipe,
    TripEvaluatorComponent,
    TripReserverComponent,
    LeafletModule,
    TripCarouselComponent,
    TripOpinionsComponent
  ],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css'
})
export class TripDetailsComponent {
  trip: Trip;
  tripId: number = -1;
  map: Leaflet.Map | undefined

  options: Leaflet.MapOptions = {
    zoom: 1,
    center: Leaflet.latLng(0, 0)
  };

  private loadTrip(): void {
    this.trip = this.tripLoaderService.getTrip(this.tripId) ?? this.tripLoaderService.getEmptyTrip();

    if (this.map) {
      this.map.setZoom(this.trip.zoom);
      this.map.panTo(new Leaflet.LatLng(this.trip.latitude, this.trip.longitude));

      const marker = Leaflet.marker([this.trip.latitude, this.trip.longitude]);
      marker.addTo(this.map);
    }
  }

  onMapReady(map: Leaflet.Map): void {
    this.map = map;
    this.loadTrip();
  }

  constructor(private currencyExchangeService: CurrencyExchangeService,
              private tripAccountingService: TripAccountingService,
              private tripLoaderService: TripLoaderService,
              private mapLeafletsService: MapLeafletsService) {

    this.trip = this.tripLoaderService.getEmptyTrip();

    this.tripLoaderService.tripsLoaded.subscribe(() => {
      this.loadTrip();
    });

    this.options = this.mapLeafletsService.getMapOptions(this.trip.zoom,
      new Leaflet.LatLng(this.trip.latitude, this.trip.longitude)
    );
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

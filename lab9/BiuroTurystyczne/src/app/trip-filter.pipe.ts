import { Pipe, PipeTransform } from '@angular/core';
import {TripFilterService} from "./trip-filter.service";
import {Trip} from "./trip";
import {KeyValue} from "@angular/common";

@Pipe({
  name: 'tripFilter',
  standalone: true
})
export class TripFilterPipe implements PipeTransform {
  constructor(private tripFilterService: TripFilterService) {
  }

  transform(trips: KeyValue<number, Trip>[]): KeyValue<number, Trip>[] {
    return trips.filter((trip) => {
      return this.tripFilterService.check(trip.value);
    });
  }
}

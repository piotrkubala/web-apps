import { Pipe, PipeTransform } from '@angular/core';
import {TripFilterService} from "../services/trip-filter.service";
import {Trip} from "../utilities/trip";
import {KeyValue} from "@angular/common";

@Pipe({
  name: 'tripFilter',
  standalone: true
})
export class TripFilterPipe implements PipeTransform {
  constructor(private tripFilterService: TripFilterService) {
  }

  transform(trips: KeyValue<number, Trip>[], refreshState: boolean): KeyValue<number, Trip>[] {
    return trips.filter((trip) => {
      return this.tripFilterService.check(trip.value);
    });
  }
}

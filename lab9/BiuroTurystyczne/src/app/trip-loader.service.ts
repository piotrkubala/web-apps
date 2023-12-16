import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Trip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class TripLoaderService {
  trips: Trip[] = [];

  constructor(private http: HttpClient) {
     this.http.get<Trip[]>('assets/trips-definition.json')
       .subscribe(data => {
          this.trips = data;
       });
  }
}

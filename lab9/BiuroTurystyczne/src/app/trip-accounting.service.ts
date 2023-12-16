import { Injectable } from '@angular/core';

import { TripLoaderService} from "./trip-loader.service";

@Injectable({
  providedIn: 'root'
})
export class TripAccountingService {


  constructor(private tripLoaderService: TripLoaderService) {}
}

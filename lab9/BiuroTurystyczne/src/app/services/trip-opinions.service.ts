import { Injectable } from '@angular/core';
import {TripOpinion} from "../utilities/trip-opinion";
import {HttpClient} from "@angular/common/http";

import { environment } from '../../environments/environment';
import {UserService} from "./user.service";
import {ShoppingHistoryService} from "./shopping-history.service";

@Injectable({
  providedIn: 'root'
})
export class TripOpinionsService {
  opinions: TripOpinion[] = [];

  triggerOpinionsLoad(): void {
    const url: string = environment.backend.url + '/opinions/';

    this.http.get<TripOpinion[]>(url)
      .subscribe(data => {
        this.opinions = data;
      });
  }

  constructor(private http: HttpClient,
              private userService: UserService,
              private shoppingHistoryService: ShoppingHistoryService) {
    this.triggerOpinionsLoad();
  }

  validateOpinion(opinion: TripOpinion): string {
    if (opinion.title.length < 5) {
      return 'Title is too short';
    }
    if (opinion.title.length > 50) {
      return 'Title is too long';
    }

    if (opinion.content.length < 51) {
      return 'Content is too short';
    }
    if (opinion.content.length > 499) {
      return 'Content is too long';
    }

    if (opinion.dateOfPurchase && opinion.dateOfPurchase.length > 0) {
      const dateOfPurchase = new Date(opinion.dateOfPurchase);
      const currentDate = new Date();

      if (dateOfPurchase.toString() === 'Invalid Date') {
        return 'Date of purchase is not a valid date';
      }

      if (dateOfPurchase > currentDate) {
        return 'Date of purchase cannot be in the future';
      }
    }

    return '';
  }

  createOpinion(opinion: TripOpinion): string {
    if (!this.shoppingHistoryService.wasTripBoughtById(opinion.tripId)) {
      return 'Trip was not bought';
    }

    const validationMessage = this.validateOpinion(opinion);

    if (validationMessage.length > 0) {
      return validationMessage;
    }

    const url: string = environment.backend.url + '/opinions/';

    opinion.username = "test_user";

    this.http.post(url, opinion).subscribe(() => {
      this.opinions.push(opinion);
    })

    return '';
  }
}

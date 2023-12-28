import { Injectable } from '@angular/core';
import {TripOpinion} from "../utilities/trip-opinion";

@Injectable({
  providedIn: 'root'
})
export class TripOpinionsService {
  opinions: TripOpinion[] = [];

  constructor() {}

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
    const validationMessage = this.validateOpinion(opinion);

    if (validationMessage.length > 0) {
      return validationMessage;
    }

    this.opinions.push(opinion);

    return '';
  }
}

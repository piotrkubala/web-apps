import {TripLoaderService} from "../services/trip-loader.service";

export class TripOpinion {
  tripId: number;
  username: string;
  title: string;
  content: string;
  dateOfPurchase: string | null;
  opinionCreationDate: string = '';

  constructor(tripId: number) {
    this.tripId = tripId;
    this.username = '';
    this.title = '';
    this.content = '';
    this.dateOfPurchase = null;

    this.setCurrentDate();
  }

  setCurrentDate(): void {
    this.opinionCreationDate = TripLoaderService.dateToString(new Date());
  }
}

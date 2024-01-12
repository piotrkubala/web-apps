import {Component, Input} from '@angular/core';
import {TripOpinionsService} from "../../../services/trip-opinions.service";
import {TripOpinion} from "../../../utilities/trip-opinion";
import {FormsModule} from "@angular/forms";
import {Trip} from "../../../utilities/trip";
import {NgForOf, NgIf} from "@angular/common";
import {OpinionComponent} from "./opinion/opinion.component";
import {TripLoaderService} from "../../../services/trip-loader.service";
import {UserService} from "../../../services/user.service";
import {ShoppingHistoryService} from "../../../services/shopping-history.service";

@Component({
  selector: 'app-trip-opinions',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    OpinionComponent,
    NgIf
  ],
  templateUrl: './trip-opinions.component.html',
  styleUrl: './trip-opinions.component.css'
})
export class TripOpinionsComponent {
  @Input() trip!: Trip;
  createdOpinion: TripOpinion;

  constructor(public tripOpinionsService: TripOpinionsService,
              private tripLoaderService: TripLoaderService,
              private userService: UserService,
              public shoppingHistoryService: ShoppingHistoryService) {
    this.createdOpinion = new TripOpinion(-1);

    this.tripLoaderService.tripsLoaded.subscribe(() => {
      this.createdOpinion.tripId = this.trip.id;
    });
  }

  createOpinion(): void {
    if (this.createdOpinion.tripId < 0) {
      return;
    }

    const message = this.tripOpinionsService.createOpinion(this.createdOpinion);

    if (message && message.length > 0) {
      alert(message);
    } else {
      this.createdOpinion = new TripOpinion(this.createdOpinion.tripId);
    }
  }
}

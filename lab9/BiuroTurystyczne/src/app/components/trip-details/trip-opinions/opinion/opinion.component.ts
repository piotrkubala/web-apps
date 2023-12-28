import {Component, Input} from '@angular/core';
import {TripOpinion} from "../../../../utilities/trip-opinion";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-opinion',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './opinion.component.html',
  styleUrl: './opinion.component.css'
})
export class OpinionComponent {
  @Input() opinion!: TripOpinion;
}

import { Component } from '@angular/core';
import {CurrencyMenuComponent} from "../currency-menu/currency-menu.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ReservationSummaryComponent} from "../reservation-summary/reservation-summary.component";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CurrencyMenuComponent,
    RouterLink,
    RouterLinkActive,
    ReservationSummaryComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}

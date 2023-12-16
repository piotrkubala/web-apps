import { Component } from '@angular/core';
import {CurrencyMenuComponent} from "../currency-menu/currency-menu.component";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CurrencyMenuComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}

import { Component } from '@angular/core';

import { CurrencyExchangeService } from '../../services/currency-exchange.service';
import {CurrencyOptionComponent} from "./currency-option/currency-option.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-currency-menu',
  standalone: true,
  imports: [
    CurrencyOptionComponent,
    NgForOf
  ],
  templateUrl: './currency-menu.component.html',
  styleUrl: './currency-menu.component.css'
})
export class CurrencyMenuComponent {
  constructor(public currencyExchangeService: CurrencyExchangeService) {}
}

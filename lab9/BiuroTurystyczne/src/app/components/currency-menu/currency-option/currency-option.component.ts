import {Component, Input} from '@angular/core';

import { CurrencyExchangeService } from '../../../services/currency-exchange.service';

@Component({
  selector: 'app-currency-option',
  standalone: true,
  imports: [],
  templateUrl: './currency-option.component.html',
  styleUrl: './currency-option.component.css'
})
export class CurrencyOptionComponent {
  @Input() currencyString: string = "EUR";

  constructor(private currencyExchangeService: CurrencyExchangeService) {
  }

  selectCurrency(): void {
    this.currencyExchangeService.setBaseCurrency(this.currencyString);
  }

  isSelected(): boolean {
    return this.currencyExchangeService.baseCurrency === this.currencyString;
  }
}

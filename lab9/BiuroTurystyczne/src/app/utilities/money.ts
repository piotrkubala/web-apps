import {CurrencyExchangeService} from "../services/currency-exchange.service";

export class Money {
  amountMinor: number;
  currencySymbol: string;

  constructor(amountMinor: number, currencySymbol: string) {
    this.amountMinor = amountMinor;
    this.currencySymbol = currencySymbol;
  }
}

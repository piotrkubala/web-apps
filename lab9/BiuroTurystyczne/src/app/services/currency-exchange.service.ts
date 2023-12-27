import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Money} from "../utilities/money";

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {
  baseCurrencyChanged: EventEmitter<void> = new EventEmitter<void>();

  exchangeRates: Map<string, number> = new Map<string, number>();
  baseCurrency: string = "EUR";

  possibleCurrencies: string[] = [
    "EUR",
    "USD",
    "GBP",
    "CHF",
    "PLN",
    "CZK"
  ];

  httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) {
    this.refreshExchangeRates();
  }

  refreshExchangeRates(): void {
    this.http.get(`/exchange/${this.baseCurrency}`, {
      headers: this.httpHeaders,
      withCredentials: false
    }).subscribe((data) => {
        this.exchangeRates.clear();

        this.exchangeRates.set(this.baseCurrency, 1.0);

        const currencyRates = data as CurrencyExchangeResponse;

        this.possibleCurrencies.forEach(currency => {
          this.exchangeRates.set(currency, currencyRates.rates[currency]);
        });

        this.baseCurrencyChanged.emit();
      });
  }

  setBaseCurrency(currency: string): void {
    if (this.possibleCurrencies.some(c => c === currency)) {
      this.baseCurrency = currency;
      this.refreshExchangeRates();
    }
  }

  getMoneyInBaseCurrency(money: Money): Money {
    const exchangeRate = this.exchangeRates.get(money.currencySymbol);

    if (exchangeRate) {
      return new Money(money.amountMinor / exchangeRate, this.baseCurrency);
    }

    return money;
  }

  getMoneyStringInBaseCurrency(money: Money): string {
    const moneyInBaseCurrency = this.getMoneyInBaseCurrency(money);

    return (moneyInBaseCurrency.amountMinor * 0.01).toFixed(2).toString() + " " + this.baseCurrency;
  }
}

interface CurrencyExchangeResponse {
  base_code: string;
  rates: {
    [key: string]: number;
  }
}

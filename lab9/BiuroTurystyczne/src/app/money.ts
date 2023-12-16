export class Money {
  amountMinor: number;
  currencySymbol: string;

  constructor(amountMinor: number, currencySymbol: string) {
    this.amountMinor = amountMinor;
    this.currencySymbol = currencySymbol;
  }
}

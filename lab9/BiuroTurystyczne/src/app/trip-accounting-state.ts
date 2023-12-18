export class TripAccountingState {
  totalReservedPlacesCount: number;
  rate: number;

  isLowestPrice: boolean;
  isHighestPrice: boolean;

  selectedToBeBought: boolean = false;

  constructor(totalReservedPlacesCount: number, isLowestPrice: boolean, isHighestPrice: boolean) {
    this.totalReservedPlacesCount = totalReservedPlacesCount;
    this.rate = 0;
    this.isLowestPrice = isLowestPrice;
    this.isHighestPrice = isHighestPrice;
  }
}

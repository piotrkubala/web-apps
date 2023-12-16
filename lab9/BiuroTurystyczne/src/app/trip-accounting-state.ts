export class TripAccountingState {
  totalReservedPlacesCount: number;

  isLowestPrice: boolean;
  isHighestPrice: boolean;

  constructor(totalReservedPlacesCount: number, isLowestPrice: boolean, isHighestPrice: boolean) {
    this.totalReservedPlacesCount = totalReservedPlacesCount;
    this.isLowestPrice = isLowestPrice;
    this.isHighestPrice = isHighestPrice;
  }
}

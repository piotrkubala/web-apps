export interface Trip {
  id: number;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  price: number;
  currency: string;
  maxParticipants: number;
  reservedPlacesCount: number;
  description: string;
  image: string;
}

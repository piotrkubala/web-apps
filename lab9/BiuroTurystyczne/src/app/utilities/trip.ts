export interface Trip {
  id: number;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  priceMinor: number;
  currency: string;
  maxParticipants: number;
  reservedPlacesCount: number;
  description: string;
  image: string;
  averageRating: number;
  countOfRatings: number;
  latitude: number;
  longitude: number;
  zoom: number;
}

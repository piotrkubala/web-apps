import {Money} from "./money";

export interface Trip {
  id: number;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  priceMinor: number;
  currency: string;
  maxParticipants: number;
  reservedPlacesCount: number;
  description: string;
  image: string;
}

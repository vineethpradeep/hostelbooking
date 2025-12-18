import { Review } from "./review.model";


export interface Rating {
  id: number;            // RoomId
  name: string;
  price: number;
  image: string;

  rating?: number;       // Average rating
  size: string;
  capacity: number;
  bed: string;
  services: string[];
  description?: string;

  reviews?: Review[];
}



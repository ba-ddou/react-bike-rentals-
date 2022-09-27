import { EntityStatus } from "./Global";

export interface Bike {
  id: string;
  model: string;
  price: number; // $/day
  color: string;
  image: string;
  storageRef: string;
  location: string; // city name
  rating: number; // 0-5
  ratingCount: number;
  createBy: string; // Manager id
  status: BikeStatus;
  entityStatus: EntityStatus;
}

export enum BikeStatus {
  AVAILABLE,
  UNAVAILABLE,
}

export type BikeCreationInput = Omit<
  Bike,
  "id" | "rating" | "ratingCount" | "createBy" | "status"
>;

export type ExtendedBikeCreationInput = Omit<Bike, "id" | "rating">;

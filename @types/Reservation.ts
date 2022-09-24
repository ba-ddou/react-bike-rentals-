import { Bike } from "./Bike";
import { User } from "./User";

export interface Reservation {
  id: string;
  start: Date;
  end: Date;
  user: string;
  bike: string;
  bikeSnapshot: {
    price: number;
    location: string;
  };
  rating?: number;
  status: ReservationStatus;
}

export enum ReservationStatus {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
}

export type ReservationCreationInput = Omit<Reservation, "id" | "rating" | "status">;

export type ReservationWithProjections = Omit<Reservation, "user" | "bike"> & {
  user: User;
  bike: Bike;
};

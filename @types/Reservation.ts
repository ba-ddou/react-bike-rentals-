import { Bike } from "./Bike";
import { User } from "./User";

export interface Reservation {
  id: string;
  from: Date;
  to: Date;
  user: string;
  bike: string;
  bikeSnapshot: {
    price: number;
    location: string;
  };
  rating?: number;
  status: ReservationStatus;
  reservedAt: Date;
}

export enum ReservationStatus {
  CANCELLED = -1,
  ACTIVE,
}

export enum ConceptualReservationStatus {
  CANCELLED = -1,
  PENDING,
  IN_PROGRESS,
  COMPLETED,
}

export type ReservationCreationInput = Omit<Reservation, "id" | "rating" | "reservedAt">;

export type ReservationWithProjections = Omit<
  Reservation,
  "user" | "bike" | "status"
> & {
  user: User;
  bike: Bike;
  numberOfDays: number;
  totalPrice: number;
  reservedAt: Date;
  status: ConceptualReservationStatus;
};

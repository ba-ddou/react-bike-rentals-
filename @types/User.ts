import { EntityStatus } from "./Global";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  entityStatus: EntityStatus;
}


export enum UserRole {
  MANAGER = "manager",
  USER = "user",
}

export type UserInput = Omit<User, "id" | "role" | "entityStatus"> & { password: string };


export type StrippedUser = Omit<User, "id" | "role">;

export interface SigninCredentials {
  email: string;
  password: string;
}
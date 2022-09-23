export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  MANAGER = "manager",
  USER = "user",
}

export type UserInput = Omit<User, "id" | "role"> & { password: string };


export type StrippedUser = Omit<User, "id" | "role">;

export interface SigninCredentials {
  email: string;
  password: string;
}
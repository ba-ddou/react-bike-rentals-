import { User } from "@types";

export const useAuth = (): {
  user: User | null;
  authenticated: boolean;
} => {
  return { user: null, authenticated: false };
};

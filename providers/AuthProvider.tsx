import { User, UserInput } from "@types";
import React, {
  useState,
  createContext,
  useContext,
  FunctionComponent,
  ComponentProps,
} from "react";

export const AuthContext = createContext<{
  loading: boolean;
  user: User | null;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  signup: (user: UserInput) => void;
  // @ts-ignore
}>(undefined);

export interface AuthProviderProps {}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signup = (user: UserInput) => {
    setLoading(true);

    setLoading(false);
  };
  const login = (credentials: { email: string; password: string }) => {
    setLoading(true);

    // setLoading(false);
  };
  return <AuthContext.Provider value={{
    loading,
    user: null,
    login,
    logout: () => { },
    signup,
  }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

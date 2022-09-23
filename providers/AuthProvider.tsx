import { User, UserInput } from "@types";
import React, {
  useState,
  createContext,
  useContext,
  FunctionComponent,
  ComponentProps,
  useEffect,
} from "react";

import firebaseApp from "config/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "hooks";
import { getUser } from "@root/services";
const auth = getAuth(firebaseApp);

export const AuthContext = createContext<{
  loading: boolean;
  currentUser: User | null;
  logout: () => void;
  // @ts-ignore
}>(undefined);

export interface AuthProviderProps {}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const { user, loading, error } = useAuthState();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    loadUser();
  }, [user]);

  const loadUser = async () => {
    if (user) {
      const { uid } = user;
      const currentUser = await getUser(uid);
      if (currentUser) {
        return setCurrentUser(currentUser.data() as User);
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        currentUser: currentUser,
        logout: () => auth.signOut(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

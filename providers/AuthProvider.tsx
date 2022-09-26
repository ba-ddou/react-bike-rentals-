import { User, UserInput, UserRole } from "@types";
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
import { getUser, signOut } from "services";
import { useRouter } from "next/router";
const auth = getAuth(firebaseApp);

export const AuthContext = createContext<{
  loading: boolean;
  currentUser: User | null;
  logout: () => void;
  
  // @ts-ignore
}>(undefined);

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const { user, loading, error } = useAuthState();
  const { push } = useRouter();

  // useEffect(() => {
  //   console.log(JSON.stringify(user,null,2));
  // }, [user])
  


  const logout = async () => {
    console.log(user);
    await signOut();
    if (user?.role == UserRole.MANAGER) push("/dashboard/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        currentUser: user,
        logout,
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

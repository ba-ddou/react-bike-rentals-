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
import { useRouter } from "next/router";
const auth = getAuth(firebaseApp);

export const AuthContext = createContext<{
  
  // @ts-ignore
}>(undefined);

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {


  return (
    <AuthContext.Provider
      value={{
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



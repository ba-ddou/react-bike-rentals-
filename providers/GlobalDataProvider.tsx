import { Bike, User, UserInput, UserRole } from "@types";
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
import { useAuthState, useBikesData } from "hooks";
import { getUser, signOut } from "services";
import { useRouter } from "next/router";
const auth = getAuth(firebaseApp);

export const GlobalDataContext = createContext<{
  bikes: Bike[] | null;
  bikesMap: Map<string, Bike>;
  // @ts-ignore
}>(undefined);

export interface GlobalDataProviderProps {
  children: React.ReactNode;
}

export const GlobalDataProvider: FunctionComponent<GlobalDataProviderProps> = ({
  children,
}) => {
  const { bikes, loading, error } = useBikesData();
  return (
    <GlobalDataContext.Provider
      value={{
        bikes,
        bikesMap: new Map(bikes?.map((bike) => [bike.id, bike])),
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export default GlobalDataProvider;

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);

  return context;
};

export const useBikes = () => {
  const { bikes } = useGlobalData();
  return { bikes };
};

export const useBike = (id: string) => {
  const { bikesMap } = useGlobalData();
  return { bike: bikesMap.get(id) };
};

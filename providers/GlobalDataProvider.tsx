import { Bike, ReservationWithProjections, User, UserInput, UserRole } from "@types";
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
import { useBikesData, useReservationsData,useUsersData,useManagersData, useAuth } from "hooks";
import { getUser } from "services";
import { useRouter } from "next/router";
const auth = getAuth(firebaseApp);

export const GlobalDataContext = createContext<{
  users: User[];
  managers: User[];
  reservations: ReservationWithProjections[];
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
  const { user } = useAuth();
  const { users } = useUsersData();
  const { managers } = useManagersData(user?.id);
  const { bikes, loading, error } = useBikesData();
  const { reservations } = useReservationsData();
  
  return (
    <GlobalDataContext.Provider
      value={{
        users,
        managers,
        reservations,
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

export const useUsers = () => {
  const { users } = useGlobalData();
  return { users };
}

export const useManagers = () => {
  const { managers } = useGlobalData();
  return { managers };
}

export const useReservations = () => {
  const { reservations } = useGlobalData();
  return { reservations };
}

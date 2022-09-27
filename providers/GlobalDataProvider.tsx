import {
  Bike,
  Reservation,
  ReservationWithProjections,
  User,
  UserInput,
  UserRole,
} from "@types";
import React, {
  useState,
  createContext,
  useContext,
  FunctionComponent,
  ComponentProps,
  useEffect,
  useMemo,
} from "react";

import firebaseApp from "config/firebase";
import { getAuth } from "firebase/auth";
import {
  useBikesData,
  useReservationsData,
  useUsersData,
  useManagersData,
  useAuth,
} from "hooks";
import { getUser } from "services";
import { useRouter } from "next/router";
import { getNumberOfDays } from "@helpers/dates";
import { EntityStatus } from "@root/@types/Global";
const auth = getAuth(firebaseApp);

export const GlobalDataContext = createContext<{
  users: User[] | null;
  managers: User[] | null;
  reservations: ReservationWithProjections[] | null;
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

  const formatedReservations = useMemo(() => {
    if (!reservations || !users || !bikes) return null;
    return formatReservations(reservations, users, bikes);
  }, [reservations, users, bikes]);

  return (
    <GlobalDataContext.Provider
      value={{
        users: users
          ? applyPropFilter<User>(users, {
              entityStatus: EntityStatus.DELETED,
            })
          : null,
        managers,
        reservations: formatedReservations,
        bikes: bikes
          ? applyPropFilter<Bike>(bikes, {
              entityStatus: EntityStatus.DELETED,
            })
          : null,
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
};

export const useManagers = () => {
  const { managers } = useGlobalData();
  return { managers };
};

export const useReservations = () => {
  const { reservations } = useGlobalData();
  return { reservations };
};

function formatReservations(
  reservations: Reservation[],
  users: User[],
  bikes: Bike[]
): ReservationWithProjections[] {
  return reservations.map((reservation) => {
    const { from, to, reservedAt } = reservation;
    const user = users.find((user) => user.id === reservation.user) as User;
    const bike = bikes.find((bike) => bike.id === reservation.bike) as Bike;

    const fromDate = from.toDate();
    const toDate = to.toDate();
    const numberOfDays = getNumberOfDays(fromDate, toDate);
    return {
      ...reservation,
      from: fromDate,
      to: fromDate,
      user,
      bike,
      numberOfDays,
      reservedAt: reservedAt.toDate(),
      totalPrice: numberOfDays * reservation.bikeSnapshot.price,
    };
  });
}

function applyPropFilter<T extends Record<string, any>>(
  items: T[],
  filters: Partial<T>
): T[] {
  return items.filter((item) => {
    return Object.keys(filters).every((key) => {
      return item[key] !== filters[key];
    });
  });
}

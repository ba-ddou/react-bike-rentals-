import {
  Bike,
  Filters,
  Reservation,
  ReservationWithProjections,
  User,
} from "@types";
import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useMemo,
} from "react";

import { useAuth, useBikesData, useReservationsData } from "hooks";
import { applyPropFilter } from "@helpers/filters";
import { DateRange, EntityStatus } from "@root/@types/Global";
import { checkDateRangeIntersection, getNumberOfDays } from "@helpers/dates";
import { inferConceptualStatus } from "@helpers/utils";

export const BikeContext = createContext<{
  allBikes: Bike[] | null;
  bikes: Bike[] | null;
  reservations: Reservation[] | null;
  models: string[];
  locations: string[];
  colors: string[];
  bikesMap: Map<string, Bike>;
  filters: Filters;
  applyFilters: (filters: Partial<Filters>) => void;
  // @ts-ignore
}>(undefined);

const DEFAULT_FILTERS: Filters = {
  dateRange: {
    from: new Date(),
    to: new Date(),
  },
};

export interface BikeProviderProps {
  children: React.ReactNode;
}

export const BikeProvider: FunctionComponent<BikeProviderProps> = ({
  children,
}) => {
  const [filters, setFilters] = React.useState<Filters>(DEFAULT_FILTERS);
  const { bikes, loading, error } = useBikesData();
  const { reservations } = useReservationsData();

  const applyFilters = (filters: Partial<Filters>) => {
    setFilters((previousFilters) => {
      return {
        ...previousFilters,
        ...filters,
      };
    });
  };

  const reservationOnSelectedDateRange = useMemo(() => {
    return applyDateRangeFilter(reservations, filters.dateRange);
  }, [reservations, filters.dateRange]);

  const bikesUnavailableInTheSelectedDateRange = useMemo(() => {
    return (
      reservationOnSelectedDateRange?.map((reservation) => reservation.bike) ||
      []
    );
  }, [reservationOnSelectedDateRange]);

  const availableBikes = useMemo(() => {
    if (!bikes) return null;
    const bikesWithDeletionFilter = applyPropFilter<Bike>(
      bikes,
      {
        entityStatus: EntityStatus.DELETED,
      },
      "exclusion"
    );
    return bikesWithDeletionFilter.filter(
      (bike) => !bikesUnavailableInTheSelectedDateRange.includes(bike.id)
    );
  }, [bikes, bikesUnavailableInTheSelectedDateRange]);

  return (
    <BikeContext.Provider
      value={{
        allBikes: bikes,
        bikes: availableBikes
          ? applyBikeFilters(availableBikes, filters)
          : null,
        reservations,
        colors: getUniqueProp(availableBikes, "color"),
        models: getUniqueProp(availableBikes, "model"),
        locations: getUniqueProp(availableBikes, "location"),
        bikesMap: new Map(bikes?.map((bike) => [bike.id, bike])),
        filters,
        applyFilters,
      }}
    >
      {children}
    </BikeContext.Provider>
  );
};

export default BikeProvider;

export const useBikes = () => {
  const context = useContext(BikeContext);

  return context;
};

export const useBike = (id: string) => {
  const { bikesMap } = useBikes();
  return { bike: bikesMap.get(id) };
};

export const useUserReservations = () => {
  const { reservations, allBikes } = useBikes();
  const { user } = useAuth();
  const userReservations = useMemo(() => {
    if (!reservations || !allBikes || !user) return null;
    const userReservations = reservations.filter(
      (reservation) => reservation.user === user.id
    );
    return formatReservations(userReservations, allBikes);
  }, [reservations, user, allBikes]);
  return {
    reservations: userReservations,
  };
};

export const getUniqueProp = (bikes: Bike[] | null, prop: string) => {
  return bikes
    ? Array.from(new Set(bikes.map((bike) => bike[prop])).values())
    : [];
};

const applyBikeFilters = (bikes: Bike[], filters: Filters) => {
  const { color, model, location } = filters;
  return applyPropFilter<Bike>(
    bikes,
    {
      color,
      model,
      location,
    },
    "inclusion"
  );
};

const applyDateRangeFilter = (
  reservations?: Reservation[],
  dateRange?: DateRange
) => {
  if (!dateRange || !reservations) return reservations;

  return reservations.filter((reservation) => {
    return checkDateRangeIntersection(
      {
        from: reservation.from.toDate(),
        to: reservation.to.toDate(),
      },
      dateRange
    );
  });
};

function formatReservations(
  reservations: Reservation[],
  bikes: Bike[]
): Omit<ReservationWithProjections, "user">[] {
  return reservations.map(({ user, status, ...reservation }) => {
    const { from, to, reservedAt } = reservation;
    const bike = bikes.find((bike) => bike.id === reservation.bike) as Bike;

    const fromDate = from.toDate();
    const toDate = to.toDate();
    const numberOfDays = parseInt(getNumberOfDays(fromDate, toDate));
    return {
      ...reservation,
      from: fromDate,
      to: toDate,
      user,
      bike,
      numberOfDays,
      reservedAt: reservedAt.toDate(),
      totalPrice: numberOfDays * reservation.bikeSnapshot.price,
      status: inferConceptualStatus(status, { from: fromDate, to: toDate }),
    };
  });
}

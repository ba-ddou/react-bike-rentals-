import { Bike, Filters } from "@types";
import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useMemo,
} from "react";

import { useBikesData, useReservationsData } from "hooks";

export const BikeContext = createContext<{
  bikes: Bike[] | null;
  bikesMap: Map<string, Bike>;
  filters: Filters;
  applyFilters: (filters: Filters) => void;
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
  const { reservations } = useReservationsData(filters.dateRange);

  

  const applyFilters = (filters: Filters) => {
    setFilters((previousFilters) => {
      return {
        ...previousFilters,
        ...filters,
      };
    });
  };

  const bikesUnavailableInTheSelectedDateRange = useMemo(() => {
    return reservations?.map((reservation) => reservation.bike) || [];
  }, [reservations]);

  const availableBikes = useMemo(() => {
    if (!bikes) return null;
    return bikes.filter(
      (bike) => !bikesUnavailableInTheSelectedDateRange.includes(bike.id)
    );
  }, [bikes, bikesUnavailableInTheSelectedDateRange]);

  return (
    <BikeContext.Provider
      value={{
        bikes: availableBikes,
        bikesMap: new Map(availableBikes?.map((bike) => [bike.id, bike])),
        filters,
        applyFilters,
      }}
    >
      {children}
    </BikeContext.Provider>
  );
};

export default BikeProvider;

const useGlobalData = () => {
  const context = useContext(BikeContext);

  return context;
};

export const useBikes = () => {
  const { bikes, filters, applyFilters } = useGlobalData();
  return { bikes, filters, applyFilters };
};

export const useBike = (id: string) => {
  const { bikesMap } = useGlobalData();
  return { bike: bikesMap.get(id) };
};

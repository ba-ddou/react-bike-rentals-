import { Bike, Filters } from "@types";
import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useMemo,
} from "react";

import { useBikesData, useReservationsData } from "hooks";
import { applyPropFilter } from "@helpers/filters";
import { EntityStatus } from "@root/@types/Global";

export const BikeContext = createContext<{
  bikes: Bike[] | null;
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
  const { reservations } = useReservationsData(filters.dateRange);

  const applyFilters = (filters: Partial<Filters>) => {
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
        bikes: availableBikes
          ? applyBikeFilters(availableBikes, filters)
          : null,
        colors: getUniqueProp(availableBikes, "color"),
        models: getUniqueProp(availableBikes, "model"),
        locations: getUniqueProp(availableBikes, "location"),
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

export const useBikes = () => {
  const context = useContext(BikeContext);

  return context;
};

export const useBike = (id: string) => {
  const { bikesMap } = useBikes();
  return { bike: bikesMap.get(id) };
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
      location
    },
    "inclusion"
  );
};

import { Bike } from "@types";
import React, {
  createContext,
  useContext,
  FunctionComponent,
} from "react";

import { useBikesData } from "hooks";

export const BikeContext = createContext<{
  bikes: Bike[] | null;
  bikesMap: Map<string, Bike>;
  // @ts-ignore
}>(undefined);

export interface BikeProviderProps {
  children: React.ReactNode;
}

export const BikeProvider: FunctionComponent<BikeProviderProps> = ({
  children,
}) => {
  const { bikes, loading, error } = useBikesData();

  return (
    <BikeContext.Provider
      value={{
        bikes,
        bikesMap: new Map(bikes?.map((bike) => [bike.id, bike])),
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
  const { bikes } = useGlobalData();
  return { bikes };
};

export const useBike = (id: string) => {
  const { bikesMap } = useGlobalData();
  return { bike: bikesMap.get(id) };
};

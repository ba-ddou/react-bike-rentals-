import { BikeCard } from "@components/moleculs";
import { Bike } from "@types";
import React, { FunctionComponent } from "react";
import { Grid } from "@mantine/core";

interface BikesGridProps {
  bikes: Bike[];
}

const BikesGrid: FunctionComponent<BikesGridProps> = ({ bikes }) => {
  return (
    <Grid gutter={20}>
      {bikes.map((bike,index) => (
        <BikeCard key={index} bike={bike} />
      ))}
    </Grid>
  );
};

export default BikesGrid;

import { BikeCard } from "@components/moleculs";
import { Bike } from "@types";
import React, { FunctionComponent } from "react";
import { Grid } from "@mantine/core";

interface BikesGridProps {
  bikes: Bike[];
}

const BikesGrid: FunctionComponent<BikesGridProps> = ({ bikes }) => {
  return (
    <Grid gutter="xl" justify="center" style={{
      padding: '20px 20px',
      margin: '0 auto'
    }}>
      {bikes.map((bike,index) => (
        <BikeCard key={index} bike={bike} />
      ))}
    </Grid>
  );
};

export default BikesGrid;

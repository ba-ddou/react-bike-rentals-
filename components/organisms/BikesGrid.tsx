import { BikeCard } from "@components/moleculs";
import { Bike } from "@types";
import React, { FunctionComponent } from "react";
import { Grid } from "@mantine/core";
import { LoaderOverlay } from "@components/atoms";

interface BikesGridProps {
  bikes: Bike[];
  onBikeClick: (bikeId: string) => void;
}

const BikesGrid: FunctionComponent<BikesGridProps> = ({
  bikes,
  onBikeClick,
}) => {
  if (!bikes) return <LoaderOverlay loading={true} />;
  return (
    <Grid
      gutter="xl"
      justify="center"
      style={{
        padding: "20px 20px",
        margin: "0 auto",
      }}
    >
      {bikes.map((bike, index) => (
        <BikeCard
          key={index}
          bike={bike}
          onClick={() => {
            onBikeClick(bike.id);
          }}
        />
      ))}
    </Grid>
  );
};

export default BikesGrid;

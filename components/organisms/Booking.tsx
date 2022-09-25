import { Container, Text } from "@mantine/core";
import { useBike } from "@root/providers";
import React, { FunctionComponent } from "react";

interface BookingProps {
  bikeId: string;
}

const Booking: FunctionComponent<BookingProps> = ({ bikeId }) => {
  const { bike } = useBike(bikeId);
  return (
    <Container>
      <Text>{bike?.model}</Text>
    </Container>
  );
};

export default Booking;

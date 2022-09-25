import { BikeBanner } from "@components/moleculs";
import { Button, Container, Text } from "@mantine/core";
import { useBike } from "@root/providers";
import React, { FunctionComponent } from "react";

interface BookingProps {
  bikeId: string;
}

const Booking: FunctionComponent<BookingProps> = ({ bikeId }) => {
  const { bike } = useBike(bikeId);
  if (!bike) {
    return null;
  }
  return (
    // <Container>
    //   <Text>{bike?.model}</Text>
    // </Container>
    <div>
      <BikeBanner bike={bike} />
      <Button size="md" sx={{
        width: "15rem",
      }}>
        Book now
      </Button>
    </div>
    
  );
};

export default Booking;

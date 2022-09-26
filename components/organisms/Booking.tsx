import { LoaderOverlay } from "@components/atoms";
import { BikeBanner } from "@components/moleculs";
import { Button, Container, Group, Text } from "@mantine/core";
import { useAuth } from "@root/hooks";
import { useBike } from "@root/providers";
import { createReservation } from "@root/services";
import React, { FunctionComponent } from "react";

interface DateRange {
  from: Date;
  to: Date;
}
interface BookingProps {
  bikeId: string;
  dateRange: DateRange;
  onResolve: () => void;
}

const Booking: FunctionComponent<BookingProps> = ({
  bikeId,
  dateRange,
  onResolve,
}) => {
  const { bike } = useBike(bikeId);
  const { user } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { from, to } = dateRange;
  const bookNow = async () => {
    if (!user || !bike) return;
    setLoading(true);
    const res = await createReservation({
      bike,
      user: user?.id,
      dateRange,
    });
    setLoading(false);
    onResolve();
  };
  if (!bike) {
    return null;
  }
  return (
    // <Container>
    //   <Text>{bike?.model}</Text>
    // </Container>
    <div
      style={{
        position: "relative",
      }}
    >
      <BikeBanner bike={bike} />
      <Text color="dimmed">
        {from.toLocaleDateString()} - {to.toLocaleDateString()}
      </Text>
      <Button
        size="md"
        sx={{
          width: "15rem",
        }}
        onClick={bookNow}
      >
        Book now
      </Button>
      <LoaderOverlay loading={loading} />
    </div>
  );
};

export default Booking;

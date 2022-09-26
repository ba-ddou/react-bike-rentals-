import { LoaderOverlay } from "@components/atoms";
import { BikeBanner } from "@components/moleculs";
import { Button, Container, Group, Text } from "@mantine/core";
import { UserRole } from "@root/@types";
import { useAuth } from "@root/hooks";
import { useBike } from "providers/BikeProvider";
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
        disabled={user?.role === UserRole.MANAGER}
      >
        Book now
      </Button>
      {user?.role === UserRole.MANAGER && (
        <Text size="xs" color="dimmed">{`You're logged in as a manager`}</Text>
      )}
      <LoaderOverlay loading={loading} />
    </div>
  );
};

export default Booking;

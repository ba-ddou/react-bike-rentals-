import { LoaderOverlay } from "@components/atoms";
import { BikeBanner } from "@components/moleculs";
import { Button, Container, Group, Text } from "@mantine/core";
import { UserRole } from "@root/@types";
import { useAuth } from "@root/hooks";
import { useBike } from "providers/BikeProvider";
import { createReservation } from "@root/services";
import React, { FunctionComponent } from "react";
import { IconArrowRight } from "@tabler/icons";
import { formatDateTime, getNumberOfDays } from "@helpers/dates";

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
  const numberOfDays = getNumberOfDays(from, to);
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
      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Group spacing={3}>
          <Text size="sm" weight={500}>
            {`${formatDateTime(from)}`}
          </Text>
          <IconArrowRight size={18} />
          <Text size="sm" weight={500}>
            {`${formatDateTime(to)}`}
          </Text>
        </Group>
        <Group>
          <Text weight={500} size="lg">
            {bike.price * numberOfDays}$
          </Text>
        </Group>
        <div>
          <Button
            size="md"
            sx={{
              width: "15rem",
            }}
            onClick={bookNow}
            disabled={!user || user?.role === UserRole.MANAGER}
          >
            Book now
          </Button>
          {!user && (
            <Text size="xs" color="dimmed">
              You need to be logged in to book a bike
            </Text>
          )}
          {user?.role === UserRole.MANAGER && (
            <Text
              size="xs"
              color="dimmed"
            >{`You're logged in as a manager`}</Text>
          )}
        </div>
      </Container>

      <LoaderOverlay loading={loading} />
    </div>
  );
};

export default Booking;

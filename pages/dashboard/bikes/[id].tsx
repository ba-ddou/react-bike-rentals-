import { LargeHeading } from "@components/atoms";
import { BikeBanner } from "@components/moleculs";
import ReservationsTable from "@components/organisms/ReservationsTable";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSideProps";
import { Container,Space } from "@mantine/core";
import { useBike, useBikeReservations } from "@root/providers";
import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";

interface BikeProps {
  id: string;
}

const Bike: FunctionComponent<BikeProps> = ({ id }) => {
  const { bike } = useBike(id);
  const { reservations } = useBikeReservations(id);
  if (!bike) return null;
  return (
    <>
      <Container>
        <BikeBanner bike={bike} />
      </Container>
      <Space h={100} />
      <LargeHeading minWidth={1200}>Reservations History</LargeHeading>
      <ReservationsTable reservations={reservations} omitColumns={["user"]} />
    </>
  );
};

export default Bike;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();

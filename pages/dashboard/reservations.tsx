import { LargeHeading } from "@components/atoms";
import { BikesTable, CreateBikeForm, UsersTable } from "@components/organisms";
import ReservationsTable from "@components/organisms/ReservationsTable";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSidePropsWithManagerAuth";
import { Modal } from "@mantine/core";
import { useModalControls } from "@root/hooks";
import { useBikes, useReservations } from "@root/providers";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface ReservationsProps {}

const Reservations: FunctionComponent<ReservationsProps> = () => {
  const { reservations } = useReservations();
  if (!reservations) return null;
  return (
    <>
      <LargeHeading>Reservations</LargeHeading>
      <ReservationsTable reservations={reservations} onAdd={open} />
    </>
  );
};

export default Reservations;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();

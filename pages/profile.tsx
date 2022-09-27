import { LargeHeading } from "@components/atoms";
import { Gallery, Header } from "@components/organisms";
import ReservationsTable from "@components/organisms/ReservationsTable";
import { getGetServerSidePropsWithUserAuth } from "@helpers/getGetServerSideProps";
import { useAuth } from "@root/hooks";
import { useUserReservations } from "@root/providers/BikeProvider";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Profile: NextPage = () => {
  const { user } = useAuth();
  const { reservations } = useUserReservations();

  if(!reservations) return null;
  return (
    <div className={styles.container}>
      <Header />
      <LargeHeading>Reservations History</LargeHeading>
      <ReservationsTable
        reservations={reservations}
        omitColumns={["user"]}
        onCancel={(id) => console.log(id)}
      />
    </div>
  );
};

export default Profile;

export const getServerSideProps = getGetServerSidePropsWithUserAuth();

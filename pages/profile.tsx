import { LargeHeading } from "@components/atoms";
import { ProfileBanner } from "@components/moleculs";
import { Gallery, Header } from "@components/organisms";
import ReservationsTable from "@components/organisms/ReservationsTable";
import { UserProfile } from "@components/templates";
import { getGetServerSidePropsWithUserAuth } from "@helpers/getGetServerSideProps";
import { useAuth } from "@root/hooks";
import { useUserReservations } from "@root/providers/BikeProvider";
import { cancelReservation, rateReservation } from "@root/services";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Profile: NextPage = () => {
  const { user } = useAuth();
  const { reservations } = useUserReservations();

  if (!reservations) return null;
  return (
    <>
      <Header />
      <UserProfile
        reservations={reservations}
        user={user}
        onCancel={cancelReservation}
        onEdit={() => {}}
        onRate={rateReservation}
      />
    </>
  );
};

export default Profile;

export const getServerSideProps = getGetServerSidePropsWithUserAuth();

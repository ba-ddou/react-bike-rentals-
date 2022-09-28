import { LargeHeading } from "@components/atoms";
import { AccountUpdateForm, ProfileBanner } from "@components/moleculs";
import { Gallery, Header } from "@components/organisms";
import ReservationsTable from "@components/organisms/ReservationsTable";
import { UserProfile } from "@components/templates";
import { getGetServerSidePropsWithUserAuth } from "@helpers/getGetServerSideProps";
import { Modal } from "@mantine/core";
import { useAuth, useModalControls } from "@root/hooks";
import { useUserReservations } from "@root/providers/BikeProvider";
import { cancelReservation, rateReservation, updateUser } from "@root/services";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Profile: NextPage = () => {
  const { user } = useAuth();
  const { reservations } = useUserReservations();
  const { open, payload, ...modalControls } = useModalControls<null>();

  if (!reservations) return null;
  return (
    <>
      <Header />
      <UserProfile
        reservations={reservations}
        user={user}
        onCancel={cancelReservation}
        onEdit={open}
        onRate={rateReservation}
      />
      <Modal {...modalControls} centered>
        <AccountUpdateForm
          initialValues={{
            email: user.email,
            name: user.name,
            password: "",
          }}
          headerText="Edit your account"
          update={(values) => {
            return updateUser(user?.id, {
              name: values.name,
              password: values.password,
            });
          }}
          onResolve={modalControls.onClose}
        />
      </Modal>
    </>
  );
};

export default Profile;

export const getServerSideProps = getGetServerSidePropsWithUserAuth();

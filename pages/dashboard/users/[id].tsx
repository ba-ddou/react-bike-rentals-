import { BikeBanner } from "@components/moleculs";
import { UserProfile } from "@components/templates";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSideProps";
import { Container } from "@mantine/core";
import { useUser, useUserReservations } from "@root/providers";
import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";

interface UserProps {
  id: string;
}

const User: FunctionComponent<UserProps> = ({ id }) => {
  const { reservations } = useUserReservations(id);
  const { user } = useUser(id);
  //  @ts-ignore
  return <UserProfile reservations={reservations} user={user} />;
};

export default User;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();

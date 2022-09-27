import { BikeBanner } from "@components/moleculs";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSideProps";
import { Container } from "@mantine/core";
import { useBike } from "@root/providers";
import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";

interface BikeProps {
  id: string;
}

const Bike: FunctionComponent<BikeProps> = ({ id }) => {
  const { bike } = useBike(id);
  if (!bike) return null;
  return (
    <Container>
      <BikeBanner bike={bike} />
    </Container>
  );
};

export default Bike;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();



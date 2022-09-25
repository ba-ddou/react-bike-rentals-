import { getAuthUser } from "@helpers/firebase";
import { useBike } from "@root/providers";
import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";

interface BikeProps {
  id: string;
}

const Bike: FunctionComponent<BikeProps> = ({ id }) => {
  const { bike } = useBike(id);
  return <div>{bike?.model}</div>;
};

export default Bike;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: Encapsulate & DRY out the auth redirection logic in a middleware
  const user = await getAuthUser(context.req);
  const { id } = context.params;
  if (!user) {
    return {
      redirect: {
        destination: "/dashboard/auth",
      },
      props: {},
    };
  }

  return {
    props: {
      id,
    },
  };
};

import { LargeHeading } from "@components/atoms";
import { BikesTable, UsersTable } from "@components/organisms";
import { useBikes, useUsers } from "@root/hooks";
import { getAuthUser } from "helpers";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface BikesProps {}

const Bikes: FunctionComponent<BikesProps> = () => {
  const { bikes } = useBikes();
  return (
    <>
      <LargeHeading>Bikes</LargeHeading>
      <BikesTable bikes={bikes} onAdd={()=>{}} />
    </>
  );
};

export default Bikes;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: Encapsulate & DRY out the auth redirection logic in a middleware
  const user = await getAuthUser(context.req);
  if (!user) {
    return {
      redirect: {
        destination: "/dashboard/auth",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

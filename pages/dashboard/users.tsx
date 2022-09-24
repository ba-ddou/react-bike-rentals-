import { LargeHeading } from "@components/atoms";
import { UsersTable } from "@components/organisms";
import { getAuthUser } from "helpers";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
  return (
    <>
      <LargeHeading>Users</LargeHeading>
      <UsersTable />
    </>
  );
};

export default Users;

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

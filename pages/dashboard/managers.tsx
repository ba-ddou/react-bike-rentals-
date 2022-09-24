import { LargeHeading } from "@components/atoms";
import { UsersTable } from "@components/organisms";
import { UserRole } from "@root/@types";
import { useManagers, useUsers } from "@root/hooks";
import { getAuthUser } from "helpers/firebase";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
  const { managers } = useManagers();
  return (
    <>
      <LargeHeading>Managers</LargeHeading>
      <UsersTable users={managers} role={UserRole.MANAGER} onAdd={() => {}} />
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

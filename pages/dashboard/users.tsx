import { LargeHeading } from "@components/atoms";
import { UsersTable } from "@components/organisms";
import { useUsers } from "@root/hooks";
import { getAuthUser } from "helpers";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
  const { users } = useUsers();
  return (
    <>
      <LargeHeading>Users</LargeHeading>
      <UsersTable users={users} />
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

import { LargeHeading } from "@components/atoms";
import { UsersTable } from "@components/organisms";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSidePropsWithManagerAuth";
import { UserRole } from "@root/@types";
import { useUsers } from "@root/providers";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
  const { users } = useUsers();
  return (
    <>
      <LargeHeading>Users</LargeHeading>
      <UsersTable users={users} role={UserRole.USER} />
    </>
  );
};

export default Users;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();

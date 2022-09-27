import { LargeHeading } from "@components/atoms";
import { UsersTable } from "@components/organisms";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSideProps";
import { UserRole } from "@root/@types";
import { useUsers } from "@root/providers";
import { deletedUser } from "@root/services";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
  const { users } = useUsers();
  return (
    <>
      <LargeHeading>Users</LargeHeading>
      <UsersTable users={users} role={UserRole.USER} onDelete={deletedUser} />
    </>
  );
};

export default Users;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();

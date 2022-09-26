import { LargeHeading } from "@components/atoms";
import { UsersTable } from "@components/organisms";
import { UserRole } from "@root/@types";
import { useManagers, useUsers } from "@root/hooks";
import { createManager } from "@root/services";
import { getAuthUser } from "helpers/firebase";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
  const { managers } = useManagers();
  const onAdd = async () => {
    await createManager({
      email: "new.manager@gmail.com",
      name: "New Manager",
      password: "password",
    });
  };
  return (
    <>
      <LargeHeading>Managers</LargeHeading>
      <UsersTable users={managers} role={UserRole.MANAGER} onAdd={onAdd} />
    </>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: Encapsulate & DRY out the auth redirection logic in a middleware
  const user = await getAuthUser(context.req);
  console.log("🚀 ~ file: managers.tsx ~ line 34 ~ constgetServerSideProps:GetServerSideProps= ~ user", user);
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

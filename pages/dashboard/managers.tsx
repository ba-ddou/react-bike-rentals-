import { LargeHeading } from "@components/atoms";
import { UsersTable } from "@components/organisms";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSidePropsWithManagerAuth";
import { UserRole } from "@root/@types";
import { useAuth } from "@root/hooks";
import { onlyAllow } from "@root/middlewares";
import { useManagers } from "@root/providers";
import { createManager, deletedManager } from "@root/services";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface ManagersProps {}

const Managers: FunctionComponent<ManagersProps> = () => {
  const { user } = useAuth();
  const { managers } = useManagers(user?.id);
  const onAdd = async () => {
    await createManager({
      email: "admin@bikes.com",
      name: "Super Admin",
      password: "root000",
    });
  };
  return (
    <>
      <LargeHeading>Managers</LargeHeading>
      <UsersTable
        users={managers}
        role={UserRole.MANAGER}
        onAdd={onAdd}
        onDelete={deletedManager}
      />
    </>
  );
};

export default Managers;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();

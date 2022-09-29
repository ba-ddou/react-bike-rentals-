import { LargeHeading } from "@components/atoms";
import { SignupForm } from "@components/moleculs";
import { UsersTable } from "@components/organisms";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSideProps";
import { Modal } from "@mantine/core";
import { UserRole } from "@root/@types";
import { useAuth, useModalControls } from "@root/hooks";
import { onlyAllow } from "@root/middlewares";
import { useManagers } from "@root/providers";
import { createManager, deletedManager } from "@root/services";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface ManagersProps {}

const Managers: FunctionComponent<ManagersProps> = () => {
  const { user } = useAuth();
  //  @ts-ignore
  const { managers } = useManagers(user?.id);
  const { open, payload, ...modalControls } = useModalControls();

  return (
    <>
      {/* @ts-ignore */}
      <LargeHeading>Managers</LargeHeading>
      <UsersTable
        users={managers}
        role={UserRole.MANAGER}
        onAdd={() => open(null)}
        onDelete={deletedManager}
        highlightOnHover={false}
      />
      <Modal {...modalControls} centered>
        <SignupForm
          signup={createManager}
          headerText="Create a manager account"
          onResolve={modalControls.onClose}
        />
      </Modal>
    </>
  );
};

export default Managers;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();

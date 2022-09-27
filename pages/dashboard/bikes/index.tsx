import { LargeHeading } from "@components/atoms";
import { BikesTable, CreateBikeForm, UsersTable } from "@components/organisms";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSidePropsWithManagerAuth";
import { Modal } from "@mantine/core";
import { useModalControls } from "@root/hooks";
import { useBikes } from "@root/providers";
import { deleteBike } from "@root/services";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface BikesProps {}

const Bikes: FunctionComponent<BikesProps> = () => {
  const { bikes } = useBikes();
  const { open, payload, ...modalControls } = useModalControls<undefined>();
  if (!bikes) return null;
  return (
    <>
      <LargeHeading>Bikes</LargeHeading>
      <BikesTable
        bikes={bikes}
        onAdd={() => open(undefined)}
        onDelete={deleteBike}
      />
      <Modal {...modalControls} centered size={700}>
        <CreateBikeForm
          // defaultView={payload}
          onCancel={modalControls.onClose}
          onResolve={modalControls.onClose}
        />
      </Modal>
    </>
  );
};

export default Bikes;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();

import { LargeHeading } from "@components/atoms";
import { BikesTable, CreateBikeForm, UsersTable } from "@components/organisms";
import { Modal } from "@mantine/core";
import { useBikes, useModalControls, useUsers } from "@root/hooks";
import { getAuthUser } from "helpers/firebase";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface BikesProps {}

const Bikes: FunctionComponent<BikesProps> = () => {
  const { bikes } = useBikes();
  const { open, payload, ...modalControls } = useModalControls<undefined>();
  if(!bikes) return null;
  return (
    <>
      <LargeHeading>Bikes</LargeHeading>
      <BikesTable bikes={bikes} onAdd={open} />
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

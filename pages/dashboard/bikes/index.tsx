import { LargeHeading } from "@components/atoms";
import {
  BikesTable,
  CreateBikeForm,
  UpdateBikeForm,
  UsersTable,
} from "@components/organisms";
import { getAuthUser } from "@helpers/getAuthUser";
import { getGetServerSidePropsWithManagerAuth } from "@helpers/getGetServerSideProps";
import { Modal } from "@mantine/core";
import { Bike } from "@root/@types";
import { useModalControls } from "@root/hooks";
import { useBikes } from "@root/providers";
import { deleteBike } from "@root/services";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";

interface BikesProps {}

const Bikes: FunctionComponent<BikesProps> = () => {
  const { bikes } = useBikes();
  const { open, payload, ...modalControls } = useModalControls<{
    action: "create" | "update";
    bike?: Bike;
  }>();
  if (!bikes) return null;
  return (
    <>
      {/* @ts-ignore */}
      <LargeHeading>Bikes</LargeHeading>
      <BikesTable
        bikes={bikes}
        onAdd={() =>
          open({
            action: "create",
          })
        }
        onDelete={deleteBike}
        onEdit={(bike) =>
          open({
            action: "update",
            bike,
          })
        }
      />
      <Modal {...modalControls} centered size={700}>
        {payload?.action == "create" && (
          <CreateBikeForm
            // defaultView={payload}
            onCancel={modalControls.onClose}
            onResolve={modalControls.onClose}
          />
        )}
        {payload?.action == "update" && payload?.bike && (
          <UpdateBikeForm
            bike={payload.bike}
            onCancel={modalControls.onClose}
            onResolve={modalControls.onClose}
          />
        )}
      </Modal>
    </>
  );
};

export default Bikes;

export const getServerSideProps = getGetServerSidePropsWithManagerAuth();

import { useBikes } from "providers";
import React, { FunctionComponent } from "react";
import BikesGrid from "./BikesGrid";
import Sidebar from "./Sidebar";
import styles from "./gallery.module.scss";
import Header from "./Header";
import { Center, Modal } from "@mantine/core";
import { DateRangePicker } from "@components/moleculs";
import { useModalControls } from "@root/hooks";
import Booking from "./Booking";

interface GalleryProps {}

const Gallery: FunctionComponent<GalleryProps> = () => {
  const { bikes } = useBikes();
  const { open, payload, ...modalControls } = useModalControls<{
    bikeId: string;
  }>();
  if (!bikes) return null;
  return (
    <div className={styles.gallery}>
      <Sidebar />
      <div
        style={{
          width: "100%",
        }}
      >
        <Header />
        <div
          style={{
            flex: 1,
          }}
        >
          <Center>
            <DateRangePicker onChange={() => {}} />
          </Center>
          <BikesGrid
            bikes={bikes}
            onBikeClick={(bikeId) => {
              // alert(bikeId);
              open({
                bikeId,
              });
            }}
          />
        </div>
      </div>
      <Modal {...modalControls} centered>
        <Booking {...payload} />
      </Modal>
    </div>
  );
};

export default Gallery;

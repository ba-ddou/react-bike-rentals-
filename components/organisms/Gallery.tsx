import { useBikes } from "hooks";
import React, { FunctionComponent } from "react";
import BikesGrid from "./BikesGrid";
import Sidebar from "./Sidebar";
import styles from "./gallery.module.scss";
import Header from "./Header";
import { Center } from "@mantine/core";
import { DateRangePicker } from "@components/moleculs";

interface GalleryProps {}

const Gallery: FunctionComponent<GalleryProps> = () => {
  const { bikes } = useBikes();
  return (
    <div className={styles.gallery}>
      <Sidebar />
      <div>
        <Header />
        <div
          style={{
            flex: 1,
          }}
        >
          <Center>
            <DateRangePicker onChange={() => {}} />
          </Center>
          <BikesGrid bikes={bikes} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;

import { useBikes } from "providers/BikeProvider";
import React, { FunctionComponent, useState } from "react";
import BikesGrid from "./BikesGrid";
import Sidebar from "./Sidebar";
import styles from "./gallery.module.scss";
import Header from "./Header";
import { Center, Modal } from "@mantine/core";
import { DateRangePicker } from "@components/moleculs";
import { useModalControls } from "@root/hooks";
import Booking from "./Booking";

interface DateRange {
  from: Date;
  to: Date;
}

interface GalleryProps {}

const Gallery: FunctionComponent<GalleryProps> = () => {
  const { bikes, filters, applyFilters } = useBikes();
  const { open, payload, ...modalControls } = useModalControls<{
    bikeId: string;
  }>();
  // const [dateRange, setDateRange] = useState<DateRange>(filters.dateRange);
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
            <DateRangePicker
              onChange={([from, to]) =>
                applyFilters({
                  dateRange: {
                    from,
                    to,
                  },
                })
              }
            />
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
      <Modal {...modalControls} size="xl" centered>
        <Booking
          {...payload}
          dateRange={filters.dateRange}
          onResolve={modalControls.onClose}
        />
      </Modal>
    </div>
  );
};

export default Gallery;

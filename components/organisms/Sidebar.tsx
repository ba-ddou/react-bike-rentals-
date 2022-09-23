import React, { FunctionComponent } from "react";
import FiltersPanel from "./FiltersPanel";
import styles from "./sideBar.module.scss";
import { Text } from "@mantine/core";

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  return (
    <div className={styles.sideBar}>
      <div style={{
        padding: "1rem",
        height: "10rem"
      }}>
        <Text
          size="xl"
          weight="bolder"
          style={{
            padding: "1rem",
          }}
        >
          Bikes
        </Text>
      </div>
      <FiltersPanel />
    </div>
  );
};

export default Sidebar;

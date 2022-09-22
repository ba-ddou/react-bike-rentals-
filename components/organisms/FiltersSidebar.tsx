import React, { FunctionComponent } from "react";
import styles from "./filtersSideBar.module.scss";

interface FiltersSidebarProps {}

const FiltersSidebar: FunctionComponent<FiltersSidebarProps> = () => {
  return <div className={styles.filtersSideBar}></div>;
};

export default FiltersSidebar;

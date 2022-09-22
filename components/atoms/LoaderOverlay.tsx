import React, { FunctionComponent } from "react";
import { Loader } from "@mantine/core";

interface LoaderOverlayProps {
  loading: boolean;
}

const LoaderOverlay: FunctionComponent<LoaderOverlayProps> = ({ loading }) => {
  if (!loading) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
  );
};

export default LoaderOverlay;

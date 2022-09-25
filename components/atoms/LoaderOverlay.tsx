import React, { FunctionComponent } from "react";
import { Center, Loader } from "@mantine/core";
import { Text } from "@mantine/core";

interface LoaderOverlayProps {
  loading: boolean;
  uploadProgress?: number;
}

const LoaderOverlay: FunctionComponent<LoaderOverlayProps> = ({
  loading,
  uploadProgress,
}) => {
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
      {uploadProgress != null && (
        <Center sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}>
          <Text size="xs" weight="bold" color="brand" sx={{
             translateY: "3rem",
           }}>{`${uploadProgress.toFixed(2)}%`}</Text>
        </Center>
       
      )}
    </div>
  );
};

export default LoaderOverlay;

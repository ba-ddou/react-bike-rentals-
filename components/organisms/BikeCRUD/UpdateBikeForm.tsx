import { useAuth } from "hooks";
import React, { FunctionComponent } from "react";
import BikeForm from "./BikeForm";
import { Bike, BikeCreationInput, BikeStatus } from "@root/@types";
import { createBike, updateBike } from "@root/services";
import { Text } from "@mantine/core";
import { LoaderOverlay } from "@components/atoms";

interface UpdateBikeProps {
  bike: Bike;
  onCancel: () => void;
  onResolve: () => void;
}

const UpdateBike: FunctionComponent<UpdateBikeProps> = ({
  onCancel,
  onResolve,
  bike,
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useAuth();
  const onSubmit = async (values: BikeCreationInput) => {
    setLoading(true);
    const res = await updateBike(bike.id, values);
    // TODO: Add error handling
    // TODO: only call onResolve if the menu item was created successfully
    onResolve();
    setLoading(false);
    return {};
  };
  return (
    <>
      <Text
        size="lg"
        weight="bolder"
        sx={{
          marginBottom: 30,
        }}
      >
        Add a new bike
      </Text>
      <BikeForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        error={error || null}
        initialValues={bike}
        storageRef={bike.storageRef}
      />
      <LoaderOverlay loading={loading} />
      {error && (
        <Text size="sm" color="red">
          {error}
        </Text>
      )}
    </>
  );
};

export default UpdateBike;

import { useAuthState } from "hooks";
import React, { FunctionComponent } from "react";
import BikeForm from "./BikeForm";
import { BikeCreationInput, BikeStatus } from "@root/@types";
import { createBike } from "@root/services";
import { Text } from "@mantine/core";

interface CreateBikeFormProps {
  onCancel: () => void;
  onResolve: () => void;
}

const CreateBikeForm: FunctionComponent<CreateBikeFormProps> = ({
  onCancel,
  onResolve,
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useAuthState();
  const onSubmit = async (values: BikeCreationInput) => {
    setLoading(true);
    const res = await createBike({
      ...values,
      status: BikeStatus.AVAILABLE,
      ratingCount: 0,
      rating: 0,
      // @ts-ignore
      createBy: user?.uid,
    });
    // TODO: refine the error handling
    if (!res.model) setError("Error creating bike");
    // TODO: only call onResolve if the menu item was created successfully
    onResolve();
    setLoading(false);
    return {};
  };
  return (
    <>
      <Text size="lg" weight="bolder" sx={{
        marginBottom: 30
      }}>
        Add a new bike
      </Text>
      <BikeForm onSubmit={onSubmit} onCancel={onCancel} error={error || null} />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </>
  );
};

export default CreateBikeForm;

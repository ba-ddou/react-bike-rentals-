import React, { FunctionComponent, useRef, useState } from "react";
import { Formik } from "formik";
import { ColorSwatchRadioSelectionGroup, Input } from "components/moleculs";
import * as yup from "yup";
import ImageFormField from "../ImageFormField";
import { v4 as uuidv4 } from "uuid";
import { BikeCreationInput } from "@root/@types";
import { Button, Container, Group, Text } from "@mantine/core";
import { colors } from "@root/config/colors";
import { LoaderOverlay } from "@components/atoms";

interface BikeFormProps {
  initialValues?: BikeCreationInput;
  onSubmit: (input: BikeCreationInput) => Promise<{
    data?: BikeCreationInput;
    error?: string;
  }>;

  onCancel: () => void;
  error: null | string;
  storageRef?: string;
}

const ValidationSchema = yup.object().shape({
  model: yup.string().required("The bike model is required"),
  price: yup
    .number()
    .moreThan(0, "The price must greater than 0")
    .required("The price is required"),
  color: yup.string().required("The color is required"),
  image: yup.string().required("The image is required"),
  location: yup.string().required("The city is required"),
});

const BikeForm: FunctionComponent<BikeFormProps> = ({
  initialValues = {
    model: "",
    price: 0,
    color: colors[0],
    image: "",
    location: "",
  },
  onSubmit,
  onCancel,
  error,
  ...rest
}) => {
  const storageRef = useRef(rest.storageRef || uuidv4());
  const onSubmitHandler = async (
    values: Omit<BikeCreationInput, "storageRef">
  ) => {
    console.log("🚀 ~ file: BikeForm.tsx ~ line 50 ~ values", values);
    const { price, ...rest } = values;

    await onSubmit({
      ...rest,
      price: Number(price),
      storageRef: storageRef.current,
    });
  };
  return (
    <Container>
      <Formik
        // @ts-ignore
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit, isSubmitting, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Container
              sx={{
                display: "flex",
              }}
            >
              <ImageFormField
                entityId={storageRef.current}
                src={values.image}
                onChange={handleChange("image")}
                onError={(error) => console.log(error)}
              />
              <Container
                sx={{
                  paddingRight: 0,
                  marginRight: 0,
                }}
              >
                <Input
                  type="text"
                  name="model"
                  label="Model"
                  placeholder="Bike model"
                />
                <Container
                  sx={{
                    marginTop: 10,
                    mqrginleft: 0,
                    paddingLeft: 0,
                  }}
                >
                  <Text size="sm" weight={500}>
                    Color
                  </Text>
                  <ColorSwatchRadioSelectionGroup
                    colors={colors}
                    initialColor={values.color}
                    onChange={handleChange("color")}
                  />
                </Container>

                <Input
                  type="text"
                  name="location"
                  label="City"
                  placeholder="New York"
                />
                <Input
                  type="number"
                  name="price"
                  label="Price (USD)"
                  placeholder="0.00 $"
                />
              </Container>
            </Container>
            <Group
              position="center"
              sx={{
                justifyContent: "space-between",
                paddingTop: 20,
              }}
            >
              <Button
                size="xs"
                radius="xs"
                disabled={isSubmitting}
                onClick={onCancel}
                variant="outline"
                color="red"
                sx={{ width: 80 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="xs"
                radius="xs"
                disabled={isSubmitting}
                sx={{ width: 80 }}
              >
                Save
              </Button>
            </Group>
            {!isSubmitting && error != null && <div>{error}</div>}
            <LoaderOverlay loading={isSubmitting} />
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default BikeForm;

import React, { FunctionComponent, useRef, useState } from "react";
import { Formik } from "formik";
import { Input } from "components/moleculs";
import * as yup from "yup";
import ImageFormField from "../ImageFormField";
import { v4 as uuidv4 } from "uuid";
import { BikeCreationInput } from "@root/@types";

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
    color: "",
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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit, isSubmitting, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <ImageFormField
                entityId={storageRef.current}
                src={values.image}
                onChange={handleChange("image")}
                onError={(error) => console.log(error)}
              />
              <div>
                <Input
                  type="text"
                  name="model"
                  label="Model"
                  placeholder="Bike model"
                />
                <Input
                  type="text"
                  name="color"
                  label="Color"
                  placeholder="#000000"
                />
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
              </div>
            </div>
            <div>
              <button disabled={isSubmitting} onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting}>
                Save
              </button>
            </div>
            {!isSubmitting && error != null && <div>{error}</div>}
            {isSubmitting && <div>Submitting...</div>}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BikeForm;

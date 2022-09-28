import { FunctionComponent } from "react";
import {
  TextInput,
  PasswordInput,
  Text,
  Button,
} from "@mantine/core";

import { Formik } from "formik";
import * as yup from "yup";
import { UserInput } from "@types";
import { LoaderOverlay } from "@components/atoms";

const ValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("This is not a valid email address")
    .required("Email is required"),
  password: yup.string().required("Please enter your password"),
});

interface SignupFormProps {
  signup: (values: UserInput) => void;
  loading?: boolean;
  error?: string | null;
  headerText: string;
}

const SignupForm: FunctionComponent<SignupFormProps> = ({
  signup,
  loading,
  error,
  headerText,
}) => {
  const onSubmit = async (values: UserInput) => {
    await signup(values);
  };
  return (
    <>
      <Text size="lg" weight={500}>
        {headerText}
      </Text>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          isSubmitting,
          handleChange,
          values,
          errors,
          handleBlur,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Name"
                placeholder="Sam Smith"
                required
                name="name"
                onChange={handleChange("name")}
                value={values.name}
                error={errors.name}
                onBlur={handleBlur("name")}
              />
              <TextInput
                label="Email"
                placeholder="you@example.dev"
                required
                name="email"
                onChange={handleChange("email")}
                value={values.email}
                error={errors.email}
                onBlur={handleBlur("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                value={values.password}
                onChange={handleChange("password")}
                error={errors.password}
                onBlur={handleBlur("password")}
              />
              <Button type="submit" fullWidth mt="xl">
                Sign up
              </Button>
              {error && (
                <Text color="red" size="sm">
                  {error}
                </Text>
              )}
            </form>
            <LoaderOverlay loading={isSubmitting} />
          </>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;

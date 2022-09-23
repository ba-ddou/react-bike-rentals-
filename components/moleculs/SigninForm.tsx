import { FunctionComponent } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";

import { Formik } from "formik";
import * as yup from "yup";
import { SigninCredentials } from "@types";
import { LoaderOverlay } from "@components/atoms";

const ValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("This is not a valid email address")
    .required("Email is required"),
  password: yup.string().required("Please enter your password"),
});

interface SigninFormProps {
  signin: (values: SigninCredentials) => void;
  loading: boolean;
  error: string | null;
}

const SigninForm: FunctionComponent<SigninFormProps> = ({
  signin,
  loading,
  error,
}) => {
  const onSubmit = async (values: SigninCredentials) => {
    await signin(values);
  };
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
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
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
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
            <Group position="apart" mt="md">
              <Checkbox label="Remember me" />
            </Group>
            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
            {error && <Text>{error}</Text>}
          </form>
        )}
      </Formik>
      <LoaderOverlay loading={loading} />
    </>
  );
};

export default SigninForm;

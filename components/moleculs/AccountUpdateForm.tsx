import { FunctionComponent } from "react";
import { TextInput, PasswordInput, Text, Button, Divider } from "@mantine/core";

import { Formik } from "formik";
import * as yup from "yup";
import { UserInput } from "@types";
import { LoaderOverlay } from "@components/atoms";
import { useAuth } from "@root/hooks";

const ValidationSchema = yup.object().shape({
  name: yup.string(),
  password: yup.string(),
});

interface AccountUpdateFormProps {
  update: (values: Omit<UserInput, "email">) => Promise<void>;
  headerText: string;
  onResolve?: () => void;
  initialValues: UserInput;
}

const AccountUpdateForm: FunctionComponent<AccountUpdateFormProps> = ({
  update,
  headerText,
  onResolve,
  initialValues,
}) => {
  const { logout, reload } = useAuth();
  const onSubmit = async (values: UserInput) => {
    const res = await update(values);
    reload();
    // @ts-ignore
    if (res.action == "logout") logout();
    onResolve?.();
  };
  return (
    <>
      <Text size="lg" weight={500}>
        {headerText}
      </Text>
      <Formik
        initialValues={initialValues}
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
                label="Email"
                name="email"
                value={values.email}
                disabled={true}
              />
              <Divider />
              <TextInput
                label="Name"
                placeholder="Sam Smith"
                name="name"
                onChange={handleChange("name")}
                value={values.name}
                error={errors.name}
                onBlur={handleBlur("name")}
              />

              <PasswordInput
                label="New password"
                placeholder="Your new password"
                mt="md"
                value={values.password}
                onChange={handleChange("password")}
                error={errors.password}
                onBlur={handleBlur("password")}
              />
              <Button type="submit" fullWidth mt="xl">
                Update
              </Button>
            </form>
            <LoaderOverlay loading={isSubmitting} />
          </>
        )}
      </Formik>
    </>
  );
};

export default AccountUpdateForm;

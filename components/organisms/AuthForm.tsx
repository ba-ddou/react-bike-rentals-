import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { FunctionComponent, useEffect } from "react";
import { LoaderOverlay } from "@components/atoms";
import { useAuth, useSignin, useSignup } from "hooks";

interface AuthFormProps {
  defaultView: "login" | "signup" | null;
  onResolve?: () => void;
}

interface InputFields {
  email: string;
  name: string;
  password: string;
}

// TODO: De-compose the signin/signup form into separate components (use the existing SigninForm molecule) | Re-write with Formik & yup
const AuthForm: FunctionComponent<AuthFormProps> = ({ defaultView,onResolve }) => {
  const [type, toggle] = useToggle(
    defaultView == "signup" ? ["signup", "login"] : ["login", "signup"]
  );
  const { signup, loading: signup_loading } = useSignup();
  const {signin} = useSignin()
  const { user } = useAuth();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const onSubmit = (values: InputFields) => {
    const { email, name, password } = values;
    if (type === "login") {
      signin({ email, password });
    } else if (type === "signup") {
      signup({ email, name, password });
    }
  };

  useEffect(() => {
    if(user) onResolve?.();
  }, [user])
  

  return (
    <Paper radius="md" p="xl">
      <Text size="lg" weight={500}>
        Welcome to bike rental, {type} with
      </Text>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          {type === "signup" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@example.com"
            type="email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "signup"
              ? "Already have an account? Login"
              : "Don't have an account? signup"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
      <LoaderOverlay loading={signup_loading} />
    </Paper>
  );
};

export default AuthForm;

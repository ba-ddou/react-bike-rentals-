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
import { FunctionComponent } from "react";
import { useAuth } from "@root/providers";
import { LoaderOverlay } from "@components/atoms";

interface AuthFormProps {
  defaultView: "login" | "signup" | null;
}

interface InputFields {
  email: string;
  name: string;
  password: string;
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ defaultView }) => {
  const [type, toggle] = useToggle(
    defaultView == "signup" ? ["signup", "login"] : ["login", "signup"]
  );
  const { loading, login, signup } = useAuth();
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
      login({ email, password });
    } else if (type === "signup") {
      signup({ email, name, password });
    }
  };

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
      <LoaderOverlay loading={loading} />
    </Paper>
  );
};

export default AuthForm;
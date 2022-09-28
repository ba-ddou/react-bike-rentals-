import { useToggle } from "@mantine/hooks";
import {
  Paper,
  Group,
  Anchor,
  Stack,
  Center,
} from "@mantine/core";
import { FunctionComponent, useEffect } from "react";
import { useAuth, useSignin, useSignup } from "hooks";
import { SigninForm, SignupForm } from "@components/moleculs";

interface AuthFormProps {
  defaultView: "login" | "signup" | null;
  onResolve?: () => void;
}

interface InputFields {
  email: string;
  name: string;
  password: string;
}

const AuthForm: FunctionComponent<AuthFormProps> = ({
  defaultView,
  onResolve,
}) => {
  const [type, toggle] = useToggle(
    defaultView == "signup" ? ["signup", "login"] : ["login", "signup"]
  );
  const { signup } = useSignup();
  const { signin } = useSignin();
  const { user } = useAuth();
  useEffect(() => {
    if (user) onResolve?.();
  }, [user]);

  return (
    <Paper radius="md" p="xl">
      <Stack>
        {type === "signup" ? (
          <SignupForm
            signup={signup}
            headerText=" Welcome to bike rental, Signup with"
          />
        ) : (
          <SigninForm
            signin={signin}
            headerText=" Welcome to bike rental, Signin with"
          />
        )}
      </Stack>
      <Center>
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
        </Group>
      </Center>
    </Paper>
  );
};

export default AuthForm;

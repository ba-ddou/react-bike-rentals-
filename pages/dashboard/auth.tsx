import { SigninForm } from "@components/moleculs";
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
import { useSignin } from "hooks";

function ManagerAuthentication() {
  const { signin, loading, error } = useSignin();
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Login using a manager account credentials{" "}
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <SigninForm signin={signin} loading={loading} error={error} />
      </Paper>
    </Container>
  );
}

export default ManagerAuthentication;

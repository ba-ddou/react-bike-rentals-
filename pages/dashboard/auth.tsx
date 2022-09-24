import { SigninForm } from "@components/moleculs";
import { getAuthUser } from "@helpers/firebase";
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
import { SigninCredentials } from "@root/@types";
import { useSignin } from "hooks";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

function ManagerAuthentication() {
  const { signin, loading, error } = useSignin();
  const { push } = useRouter();

  const onSignin = async (credentials: SigninCredentials) => {
    const authenticated = await signin(credentials);
    if (authenticated) push("/dashboard");
  };
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
        <SigninForm signin={onSignin} loading={loading} error={error} />
      </Paper>
    </Container>
  );
}

export default ManagerAuthentication;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getAuthUser(context.req);
  if (user) {
    return {
      redirect: {
        destination: "/dashboard",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
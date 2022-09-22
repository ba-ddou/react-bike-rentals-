import { Button, Group } from "@mantine/core";
import React, { FunctionComponent } from "react";

interface HeaderAuthCTAsProps {
  onClick: (payload: "login" | "signup") => void;
}

const HeaderAuthCTAs: FunctionComponent<HeaderAuthCTAsProps> = ({
  onClick,
}) => {
  return (
    <Group position="center" pb="xl" px="md">
      <Button variant="default" onClick={() => onClick("login")}>
        Log in
      </Button>
      <Button onClick={() => onClick("signup")}>Sign up</Button>
    </Group>
  );
};

export default HeaderAuthCTAs;

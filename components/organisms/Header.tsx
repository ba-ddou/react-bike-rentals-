import { HeaderAuthCTAs } from "@components/moleculs";
import { Avatar, Group, Modal, Text, UnstyledButton } from "@mantine/core";
import { useAuth } from "hooks";
import { FunctionComponent, useState } from "react";
import styles from "./header.module.scss";
interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { authenticated } = useAuth();
  return (
    <div className={styles.header}>
      <div>
        <Text weight="lighter" size="lg">
          Welcome
        </Text>
        <Text weight="bold" size="lg">
          Stranger{" "}
        </Text>
      </div>
      <Group
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {authenticated && (
          <Avatar color="yellow" radius="xl">
            {parseNameInitials("Strange Danger")}
          </Avatar>
        )}
        {!authenticated && <HeaderAuthCTAs />}
      </Group>
    </div>
  );
};

export default Header;

function parseNameInitials(name: string) {
  const nameParts = name.split(" ");
  return nameParts.length > 1
    ? nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
    : name[0];
}

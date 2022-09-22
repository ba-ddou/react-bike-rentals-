import { HeaderAuthCTAs } from "@components/moleculs";
import { Avatar, Group, Modal, Text, UnstyledButton } from "@mantine/core";
import { useAuth } from "@root/providers";
import { useModalControls } from "hooks";
import { FunctionComponent, useState } from "react";
import AuthForm from "./AuthForm";
import styles from "./header.module.scss";
interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { user, loading } = useAuth();
  const { open, payload, ...modalControls } = useModalControls<
    "login" | "signup"
  >();
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
        {user && !loading && (
          <Avatar color="yellow" radius="xl">
            {parseNameInitials("Strange Danger")}
          </Avatar>
        )}
        {!user && !loading && <HeaderAuthCTAs onClick={open} />}
      </Group>
      <Modal {...modalControls} centered>
        <AuthForm defaultView={payload} />
      </Modal>
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

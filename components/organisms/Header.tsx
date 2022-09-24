import { HeaderAuthCTAs } from "@components/moleculs";
import {
  Avatar,
  Button,
  Group,
  Modal,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useAuth } from "@root/providers";
import { useAuthState, useModalControls } from "hooks";
import { FunctionComponent, useState } from "react";
import AuthForm from "./AuthForm";
import styles from "./header.module.scss";
interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { authenticated, loading } = useAuthState();
  const { currentUser, logout } = useAuth();
  const { open, payload, ...modalControls } = useModalControls<
    "login" | "signup"
  >();
  return (
    <div className={styles.header}>
      {/* TODO: only render once the user document is done loading (refine the loading state -must take into consideration the user doument loading-) */}
      {!loading && (
        <div>
          <Text weight="lighter" size="md">
            Welcome
          </Text>
          {
            <Text weight="bold" size="md">
              {currentUser ? currentUser.name : `Stranger`}
            </Text>
          }
        </div>
      )}
      <Group
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {currentUser && !loading && (
          <>
            {/* <Button onClick={logout}>
              <Text weight="bold" size="sm">
                Logout
              </Text>
            </Button> */}
            <Avatar radius="xl">{parseNameInitials(currentUser.name)}</Avatar>
          </>
        )}
        {!currentUser && !authenticated && !loading && (
          <HeaderAuthCTAs onClick={open} />
        )}
      </Group>
      <Modal {...modalControls} centered>
        <AuthForm defaultView={payload} onResolve={modalControls.onClose} />
      </Modal>
    </div>
  );
};

export default Header;

function parseNameInitials(name: string) {
  if (!name) return "";
  const nameParts = name.split(" ");
  return nameParts.length > 1
    ? nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
    : name[0];
}

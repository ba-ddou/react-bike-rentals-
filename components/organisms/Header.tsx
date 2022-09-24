import { DynamicAvatar, HeaderAuthCTAs } from "@components/moleculs";
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
          <DynamicAvatar
            user={currentUser}
            onLogout={logout}
            onEdit={() => {}}
          />
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

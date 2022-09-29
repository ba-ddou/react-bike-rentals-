import {
  AccountUpdateForm,
  DynamicAvatar,
  HeaderAuthCTAs,
} from "@components/moleculs";
import {
  Avatar,
  Button,
  Group,
  Modal,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { updateUser } from "@root/services";
import { useModalControls, useAuth } from "hooks";
import { FunctionComponent, useState } from "react";
import AuthForm from "./AuthForm";
import styles from "./header.module.scss";
interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { user, loading, logout } = useAuth();
  const { open, payload, ...modalControls } = useModalControls<
    "login" | "signup" | "edit"
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
              {user ? user.name : `Stranger`}
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
        {user && !loading && (
          <DynamicAvatar
            //  @ts-ignore
            user={user}
            onLogout={logout}
            onEdit={() => {
              open("edit");
            }}
          />
        )}
        {!user && !loading && <HeaderAuthCTAs onClick={open} />}
      </Group>
      <Modal {...modalControls} centered>
        {(payload == "login" || payload == "signup") && (
          <AuthForm defaultView={payload} onResolve={modalControls.onClose} />
        )}
        {payload == "edit" && (
          <AccountUpdateForm
            initialValues={{
              //  @ts-ignore
              email: user.email,
              //  @ts-ignore
              name: user.name,
              password: "",
            }}
            headerText="Edit your account"
            update={(values) => {
              //  @ts-ignore
              return updateUser(user?.id, {
                name: values.name,
                password: values.password,
              });
            }}
            onResolve={modalControls.onClose}
          />
        )}
      </Modal>
    </div>
  );
};

export default Header;

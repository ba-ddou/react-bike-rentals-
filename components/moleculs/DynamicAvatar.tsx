import React, { FunctionComponent } from "react";
import { Avatar, Menu, Text } from "@mantine/core";
import { IconLogout, IconPencil, IconUser } from "@tabler/icons";
import type { NextPage } from "next";
import { User, UserRole } from "@types";
import Link from "next/link";

interface DynamicAvatarProps {
  user: User;
  onEdit: () => void;
  onLogout: () => void;
}

const DynamicAvatar: FunctionComponent<DynamicAvatarProps> = ({
  user,
  ...rest
}) => {
  return (
    <div
      className="AvatarContainer"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        margin: "10px 80px",
      }}
    >
      <Menu shadow="lg" trigger="hover" transition="fade" offset={-51}>
        <Menu.Target>
          <Avatar color="brand" radius="xl">
            {parseNameInitials(user.name)}
          </Avatar>
        </Menu.Target>
        <MenuDropDown user={user} {...rest} />
      </Menu>
    </div>
  );
};

export default DynamicAvatar;

function parseNameInitials(name: string) {
  if (!name) return "";
  const nameParts = name.split(" ");
  return nameParts.length > 1
    ? nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
    : name[0];
}

type MenuDropdownType = {
  user: User;
  onEdit: () => void;
  onLogout: () => void;
};
const MenuDropDown = ({ user, onEdit, onLogout }: MenuDropdownType) => {
  return (
    <Menu.Dropdown>
      <Avatar color="brand" radius="xl" mx="auto" sx={{ marginTop: "0.5rem" }}>
        {parseNameInitials(user.name)}
      </Avatar>
      <Text align="center" size="md" weight={500} mt="md">
        {user.name}
      </Text>
      <Text
        align="center"
        color="dimmed"
        size="sm"
        style={{ margin: "0 10px" }}
      >
        {user.email} • {user.role}
      </Text>
      <Menu.Divider />

      {user.role == UserRole.MANAGER ? (
        <Menu.Item icon={<IconPencil size={14} />} onClick={onEdit}>
          Edit account
        </Menu.Item>
      ) : (
        <Link href="/profile">
          <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
        </Link>
      )}
      <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  );
};

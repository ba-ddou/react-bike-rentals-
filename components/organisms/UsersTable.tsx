import { useUsers } from "hooks";
import React, { FunctionComponent } from "react";

import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  Center,
} from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons";
import { User, UserRole } from "@root/@types";
import DynamicActionIcon from "@components/atoms/DynamicActionIcon";
import Link from "next/link";

interface UsersTableProps {
  users: User[] | null;
  role: UserRole;
  onAdd?: () => void;
  onDelete?: (id: string) => void;
}

interface UsersTableProps {}

const UsersTable: FunctionComponent<UsersTableProps> = ({
  users,
  role,
  onAdd,
  onDelete,
}) => {
  if (!users) return null;
  const rows = users.map((item) => (
    <Link key={item.id} href={`/dashboard/users/${item.id}`}>
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Avatar size={30} radius={30} />
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <Anchor<"a">
            size="sm"
            href="#"
            onClick={(event) => event.preventDefault()}
          >
            {item.email}
          </Anchor>
        </td>
        <td>
          <DynamicActionIcon
            color="red"
            onClick={() => onDelete?.(item.id)}
            Icon={IconTrash}
          />
        </td>
      </tr>
    </Link>
  ));
  return (
    <Center
      style={{
        width: "100%",
      }}
    >
      <ScrollArea>
        <Table sx={{ minWidth: 1000 }} verticalSpacing="sm" highlightOnHover>
          <thead>
            <tr>
              <th>{role}</th>
              <th>Email</th>
              <th>
                {onAdd && (
                  <Group spacing={0} position="right">
                    <ActionIcon onClick={onAdd}>
                      <IconPlus size={16} stroke={2} color="black" />
                    </ActionIcon>
                  </Group>
                )}
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
};

export default UsersTable;

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

interface UsersTableProps {
  users: User[] | null;
  role: UserRole;
  onAdd?: () => void;
}

interface UsersTableProps {}

const UsersTable: FunctionComponent<UsersTableProps> = ({
  users,
  role,
  onAdd,
}) => {
  if (!users) return null;
  const rows = users.map((item) => (
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
        <Group spacing={0} position="right">
          <ActionIcon color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));
  return (
    <Center
      style={{
        width: "100%",
      }}
    >
      <ScrollArea>
        <Table sx={{ minWidth: 1000 }} verticalSpacing="sm">
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

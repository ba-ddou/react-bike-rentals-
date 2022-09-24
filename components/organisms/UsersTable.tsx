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
import { IconPencil, IconTrash } from "@tabler/icons";

interface UsersTableProps {
}

interface UsersTableProps {}

const UsersTable: FunctionComponent<UsersTableProps> = () => {
  const { users } = useUsers();
  if (!users) return null;
  const rows = users.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
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
              <th>User</th>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
};

export default UsersTable;

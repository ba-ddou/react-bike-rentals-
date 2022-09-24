import { Bike } from "@types";
import React, { FunctionComponent } from "react";
import { useUsers } from "hooks";
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
  ColorSwatch,
} from "@mantine/core";
import { IconPencil, IconTrash, IconStar } from "@tabler/icons";
import { User } from "@root/@types";

interface BikesTableProps {
  bikes: Bike[];
}

const BikesTable: FunctionComponent<BikesTableProps> = ({ bikes }) => {
  if (!bikes) return null;
  const rows = bikes.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.image} radius={30} />
          <Text size="sm" weight={500}>
            {item.name}
          </Text>
        </Group>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.model}
        </Text>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {`${item.price} $/day`}
        </Text>
      </td>
      {/* <td>
        <Center>
          <ColorSwatch
            key="color"
            component="div"
            color={item.color}
            sx={{ color: "#fff" }}
            size={18}
          />
        </Center>
      </td> */}
      <td>
        <Text size="sm" weight={500}>
          {item.location}
        </Text>
      </td>
      <td>
        <Group spacing={1}>
          <IconStar size={18} />
          <Text size="sm" weight={500}>
            {`${item.rating}`}
          </Text>
          <Text size="xs" weight={500} color="dimmed">
            {`(${item.ratingCount})`}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
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
        <Table sx={{ minWidth: 1000 }}  verticalSpacing="md">
          <thead>
            <tr>
              <th>Bike</th>
              <th>Model</th>
              <th>Price</th>
              {/* <th>Color</th> */}
              <th>Location</th>
              <th>Rating</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
};

export default BikesTable;

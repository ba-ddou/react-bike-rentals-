import { Bike, Reservation, ReservationWithProjections } from "@types";
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
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconTrash, IconStar, IconPlus } from "@tabler/icons";
import { User } from "@root/@types";
import Link from "next/link";
import { StatusBadge } from "@components/atoms";

interface ReservationsTableProps {
  reservations: ReservationWithProjections[];
  onAdd: () => void;
}

const ReservationsTable: FunctionComponent<ReservationsTableProps> = ({
  reservations,
  onAdd,
}) => {
  if (!reservations) return null;
  const rows = reservations.map((item) => (
    <tr
      key={item.id}
      style={{
        cursor: "pointer",
      }}
    >
      <td>
        <Group spacing="sm">
          <Avatar size={30} radius={30} />
          <Text size="sm" weight={500}>
            {item.user.name}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.bike.image} radius={30} />
          <Text size="sm" weight={500}>
            {item.bike.model}
          </Text>
        </Group>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {/* {item.reservedAt.toDateString()} */}
          jioj
        </Text>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {`from ${item.start.toDate()} to ${item.end.toDate()}`}
        </Text>
      </td>
      <td>
        <Text size="sm" weight={500}>
          2
        </Text>
      </td>
      {/* <td>
        <Text size="sm" weight={500}>
          {`${item.price} $/day`}
        </Text>
      </td> */}
      <td>
        <Text size="sm" weight={500}>
          {`${item.bikeSnapshot.price} $`}
        </Text>
      </td>
      <td>
        <StatusBadge status={item.status} entity="reservation" />
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
        <Table sx={{ minWidth: 1000 }} verticalSpacing="md" highlightOnHover>
          <thead>
            <tr>
              <th>User</th>
              <th>Bike</th>
              <th>Reserved At</th>
              <th>Date range</th>
              <th>Number of days</th>
              <th>Total price</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
};

export default ReservationsTable;

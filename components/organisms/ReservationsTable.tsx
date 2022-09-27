import { Bike, Reservation, ReservationWithProjections } from "@types";
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
  ColorSwatch,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconTrash, IconStar, IconPlus, IconArrowBarRight, IconArrowRight } from "@tabler/icons";
import { User } from "@root/@types";
import Link from "next/link";
import { StatusBadge } from "@components/atoms";
import { formatDateTime } from "@helpers/dates";

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
          {formatDateTime(item.reservedAt, true)}
        </Text>
      </td>
      <td>
        <Group spacing={3}>
          <Text size="sm" weight={500}>
            {`${formatDateTime(item.from)}`}
          </Text>
          <IconArrowRight size={18} />
          <Text size="sm" weight={500}>
            {`${formatDateTime(item.to)}`}
          </Text>
        </Group>
      </td>
      <td>
        <Center>
          <Text size="sm" weight={500}>
            {item.numberOfDays}
          </Text>
        </Center>
      </td>
      {/* <td>
        <Text size="sm" weight={500}>
          {`${item.price} $/day`}
        </Text>
      </td> */}
      <td>
        <Center>
          <Text size="sm" weight={500}>
            {`${item.bikeSnapshot.price} $/day`}
          </Text>
        </Center>
      </td>
      <td>
        <Center>
          <Text size="sm" weight={500}>
            {`${item.totalPrice} $`}
          </Text>
        </Center>
      </td>
      <td>
        <Center>
          <StatusBadge status={item.status} entity="reservation" />
        </Center>
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
              <th>price</th>
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

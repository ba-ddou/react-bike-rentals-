import { Bike, Reservation, ReservationWithProjections } from "@types";
import React, { FunctionComponent, useEffect } from "react";
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
import {
  IconPencil,
  IconTrash,
  IconStar,
  IconPlus,
  IconArrowBarRight,
  IconArrowRight,
  IconX,
} from "@tabler/icons";
import { User } from "@root/@types";
import Link from "next/link";
import { StatusBadge } from "@components/atoms";
import { formatDateTime } from "@helpers/dates";
import DynamicActionIcon from "@components/atoms/DynamicActionIcon";

interface ReservationsTableProps {
  reservations: ReservationWithProjections[];
  omitColumns?: string[];
  onCancel?: (id: string) => void;
}

const ReservationsTable: FunctionComponent<ReservationsTableProps> = ({
  reservations,
  omitColumns = [],
  onCancel,
}) => {
  // return null;

  const rows = reservations.map((item) => (
    <tr
      key={item.id}
      style={{
        cursor: "pointer",
      }}
    >
      <td>
        <Text size="xs" weight={500} color="dimmed">
          {formatDateTime(item.reservedAt, true)}
        </Text>
      </td>
      {!omitColumns.includes("user") && (
        <td>
          <Group spacing="sm">
            <Avatar size={30} radius={30} />
            <Text size="sm" weight={500}>
              {item.user.name}
            </Text>
          </Group>
        </td>
      )}
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.bike.image} radius={30} />
          <Text size="sm" weight={500}>
            {item.bike.model}
          </Text>
        </Group>
      </td>

      <td>
        <Center>
          <Group spacing={3}>
            <Text size="sm" weight={500}>
              {`${formatDateTime(item.from)}`}
            </Text>
            <IconArrowRight size={18} />
            <Text size="sm" weight={500}>
              {`${formatDateTime(item.to)}`}
            </Text>
          </Group>
        </Center>
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
      <td>
        {onCancel && (
          <DynamicActionIcon
            Icon={IconX}
            color="red"
            onClick={() => onCancel(item.id)}
          />
        )}
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
        <Table sx={{ minWidth: 1200 }} verticalSpacing="md" align="center">
          <thead>
            <tr>
              <Th />
              {!omitColumns.includes("user") && <Th>User</Th>}
              <Th>Bike</Th>
              {/* <Th>Reserved At</Th> */}
              <Th>Date range</Th>
              <Th>Number of days</Th>
              <Th>Unit price</Th>
              <Th>Total price</Th>
              <Th>Status</Th>
              <Th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
};

export default ReservationsTable;

function Th({ children }) {
  return (
    <th>
      <Center>{children}</Center>
    </th>
  );
}

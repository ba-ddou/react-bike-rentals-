import { Bike } from "@types";
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
import { IconPencil, IconTrash, IconStar, IconPlus } from "@tabler/icons";
import { User } from "@root/@types";
import Link from "next/link";
import DynamicActionIcon from "@components/atoms/DynamicActionIcon";
import RatingPreview from "@components/atoms/Rating";

interface BikesTableProps {
  bikes: Bike[];
  onAdd: () => void;
  onDelete?: (id: string) => void;
}

const BikesTable: FunctionComponent<BikesTableProps> = ({
  bikes,
  onAdd,
  onDelete,
}) => {
  const { colors } = useMantineTheme();
  if (!bikes) return null;
  const rows = bikes.map((item) => (
    <Link key={item.id} href={`/dashboard/bikes/${item.id}`}>
      <tr
        key={item.id}
        style={{
          cursor: "pointer",
        }}
      >
        <td>
          <Group spacing="sm">
            <Avatar size={30} src={item.image} radius={30} />
            {/* <Text size="sm" weight={500}>
            {item.name}
          </Text> */}
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
          <RatingPreview
            rating={item.rating}
            ratingCount={item.ratingCount}
          />
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <DynamicActionIcon
              color="red"
              onClick={() => onDelete?.(item.id)}
              Icon={IconTrash}
            />
          </Group>
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
        <Table sx={{ minWidth: 1000 }} verticalSpacing="md" highlightOnHover>
          <thead>
            <tr>
              <th>Bike</th>
              <th>Model</th>
              <th>Price</th>
              {/* <th>Color</th> */}
              <th>Location</th>
              <th>Rating</th>
              <th>
                <Group spacing={0} position="right">
                  <ActionIcon onClick={onAdd}>
                    <IconPlus size={16} stroke={2} color="black" />
                  </ActionIcon>
                </Group>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
};

export default BikesTable;

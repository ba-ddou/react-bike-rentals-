import { Badge, BadgeProps } from "@mantine/core";
import { BikeStatus, ConceptualReservationStatus } from "@root/@types";
import React, { FunctionComponent } from "react";

const statusLabelsMap = {
  bike: {
    [BikeStatus.AVAILABLE]: {
      label: "Available",
      color: "teal",
    },
    [BikeStatus.UNAVAILABLE]: {
      label: "Unavailable",
      color: "gray",
    },
  },
  reservation: {
    [ConceptualReservationStatus.CANCELLED]: {
      label: "Cancelled",
      color: "red",
    },
    [ConceptualReservationStatus.PENDING]: {
      label: "Pending",
      color: "yellow",
    },
    [ConceptualReservationStatus.IN_PROGRESS]: {
      label: "In progress",
    },
    [ConceptualReservationStatus.COMPLETED]: {
      label: "Completed",
      color: "green",
    },
  },
};

type StatusBadgeProps = {
  status: BikeStatus | ConceptualReservationStatus;
  entity: "bike" | "reservation";
} & BadgeProps;

const StatusBadge: FunctionComponent<StatusBadgeProps> = ({
  status,
  entity,
  ...props
}) => {
  return (
    // @ts-ignore
    <Badge color={statusLabelsMap[entity]?.[status]?.color} {...props} >
      {/* @ts-ignore */}
      {statusLabelsMap[entity]?.[status]?.label}
    </Badge>
  );
};

export default StatusBadge;

import { Badge, BadgeProps } from "@mantine/core";
import { BikeStatus, ReservationStatus } from "@root/@types";
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
    [ReservationStatus.CANCELLED]: {
      label: "Cancelled",
      color: "red",
    },
    [ReservationStatus.PENDING]: {
      label: "Pending",
      color: "yellow",
    },
    [ReservationStatus.IN_PROGRESS]: {
      label: "In progress",
    },
    [ReservationStatus.COMPLETED]: {
      label: "Completed",
      color: "green",
    },
  },
};

type StatusBadgeProps = {
  status: BikeStatus | ReservationStatus;
  entity: "bike" | "reservation";
} & BadgeProps;

const StatusBadge: FunctionComponent<StatusBadgeProps> = ({
  status,
  entity,
  ...props
}) => {
  return (
    <Badge color={statusLabelsMap[entity][status].color} {...props}>
      {statusLabelsMap[entity][status].label}
    </Badge>
  );
};

export default StatusBadge;

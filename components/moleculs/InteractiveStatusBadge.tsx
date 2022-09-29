import { StatusBadge } from "@components/atoms";
import { BadgeProps, Tooltip, Text, Loader } from "@mantine/core";
import { BikeStatus, ConceptualReservationStatus } from "@root/@types";
import { FunctionComponent, useState } from "react";

type InteractiveStatusBadgeProps = {
  status: BikeStatus | ConceptualReservationStatus;
  entity: "bike" | "reservation";
  tooltipLabel?: string;
  onClick?: () => Promise<void>;
} & BadgeProps;

const InteractiveStatusBadge: FunctionComponent<
  InteractiveStatusBadgeProps
> = ({ status, entity, tooltipLabel, sx, onClick, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const onClickHandler = async () => {
    setLoading(true);
    await onClick?.();
    setLoading(false);
  };
  return (
    <Tooltip label={tooltipLabel}>
      <div
        // @ts-ignore
        style={{
          ...sx,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <StatusBadge
          status={status}
          entity={entity}
          sx={{
            cursor: "pointer",
          }}
          {...rest}
          // @ts-ignore
          onClick={onClickHandler}
        />
        {loading && (
          <Loader
            size="xs"
            sx={{
              marginRight: 3,
            }}
          />
        )}
      </div>

      {/* <Text>wf</Text> */}
    </Tooltip>
  );
};

export default InteractiveStatusBadge;

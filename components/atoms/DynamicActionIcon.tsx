import { ActionIcon, Group, Loader } from "@mantine/core";
import { IconTrash, TablerIcon } from "@tabler/icons";
import * as React from "react";

interface DynamicActionIconProps {
  Icon: TablerIcon;
  color: string;
  onClick: () => void | (() => Promise<void>);
}

const DynamicActionIcon: React.FunctionComponent<DynamicActionIconProps> = ({
  Icon,
  color,
  onClick,
}) => {
  const [loading, setLoading] = React.useState(false);
  const onClickHandler = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  return (
    <Group spacing={0} position="right">
      {!loading ? (
        <ActionIcon color={color} onClick={onClickHandler}>
          <Icon size={16} stroke={1.5} />
        </ActionIcon>
      ) : (
        <Loader
          size="xs"
          sx={{
            marginRight: 3,
          }}
        />
      )}
    </Group>
  );
};

export default DynamicActionIcon;

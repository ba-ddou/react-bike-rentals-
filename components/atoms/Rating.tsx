import { Group,Text } from "@mantine/core";
import { IconStar } from "@tabler/icons";
import { FunctionComponent } from "react";


interface RatingPreviewProps {
  rating: number;
  ratingCount: number;
}
 
const RatingPreview: FunctionComponent<RatingPreviewProps> = ({
    rating,
    ratingCount,
}) => {
    return (
      <Group spacing={1}>
        <IconStar size={18} />
        <Text size="sm" weight={500}>
          {`${rating}`}
        </Text>
        <Text size="xs" weight={500} color="dimmed">
          {`(${ratingCount})`}
        </Text>
      </Group>
    );
}
 
export default RatingPreview;
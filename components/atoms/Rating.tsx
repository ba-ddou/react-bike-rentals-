import { Group, Loader, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons";
import { FunctionComponent, useState } from "react";
import { useSetState } from "@mantine/hooks";

interface RatingPreviewProps {
  rating: number;
  ratingCount?: number;
}

export const RatingPreview: FunctionComponent<RatingPreviewProps> = ({
  rating,
  ratingCount,
}) => {
  return (
    <Group spacing={1}>
      <Group spacing={1}>
        {[...Array(parseInt(rating))].map((_, index) => (
          <Text key={`full-${index}`} size="md">
            {"★"}
          </Text>
        ))}
        {[...Array(5 - parseInt(rating))].map((_, index) => (
          <Text key={`full-${index}`} size="md">
            {"☆"}
          </Text>
        ))}
      </Group>

      <Text size="sm" weight={500}>
        {`${rating.toFixed(1)}`}
      </Text>
      {ratingCount != null && (
        <Text size="xs" weight={500} color="dimmed">
          {`(${ratingCount})`}
        </Text>
      )}
    </Group>
  );
};

interface FiveStarRatingInputProps {
  onRate?: (rating: number) => Promise<void>;
}

export const FiveStarRatingInput: FunctionComponent<
  FiveStarRatingInputProps
> = ({ onRate }) => {
  const [state, setState] = useSetState({
    stars: [1, 2, 3, 4, 5],
    rating: 0,
    hovered: 0,
  });
  const [loading, setLoading] = useState(false);

  const changeRating = async (newRating: number) => {
    setState({
      rating: newRating,
    });
    setLoading(true);
    await onRate?.(newRating);
  };

  const hoverRating = (rating: number) => {
    setState({
      hovered: rating,
    });
  };
  return (
    <Group spacing={1}>
      {state.stars.map((star, index) => {
        return (
          <span
            key={index}
            style={{ cursor: "pointer", opacity: loading ? 0.5 : 1 }}
            onClick={() => {
              if (loading) return;
              changeRating(star);
            }}
            onMouseEnter={() => {
              if (loading) return;
              hoverRating(star);
            }}
            onMouseLeave={() => {
              if (loading) return;
              hoverRating(0);
            }}
          >
            <Text size="md">
              {state.rating < star ? (state.hovered < star ? "☆" : "★") : "★"}
            </Text>
          </span>
        );
      })}
      {loading && (
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

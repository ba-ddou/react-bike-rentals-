import { StatusBadge } from "@components/atoms";
import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
  Group,
  Center,
  ColorSwatch,
} from "@mantine/core";
import { Bike, BikeStatus } from "@root/@types";
import { updateBike } from "@root/services";
import { IconStar } from "@tabler/icons";
import { FunctionComponent } from "react";
import InteractiveStatusBadge from "./InteractiveStatusBadge";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
  },
  innnerWrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.xl * 2,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "40%",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingLeft: theme.spacing.xl * 4,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingLeft: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

interface BikeBannerProps {
  bike: Bike;
}

const BikeBanner: FunctionComponent<BikeBannerProps> = ({ bike }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Title
        className={classes.title}
        sx={{
          paddingTop: "2rem",
          paddingLeft: "2rem",
        }}
      >
        {bike.model}
      </Title>
      <div className={classes.innnerWrapper}>
        <Image src={bike.image} className={classes.image} alt={bike.model} />
        <div className={classes.body}>
          <Group spacing="xl">
            {[
              {
                key: "Location",
                value: bike.location,
              },
            ].map(({ key, value }, index) => (
              <KeyValueDataGroup key={index} keyText={key} value={value} />
            ))}
            <Group
              align="center"
              spacing={2}
              sx={{
                flexDirection: "column",
              }}
            >
              <Text size="sm" color="dimmed">
                Color
              </Text>
              <ColorSwatch
                key="color"
                component="div"
                color={bike.color}
                sx={{ color: "#fff" }}
                size={18}
              />
            </Group>

            <Group
              align="flex-start"
              spacing={2}
              sx={{
                flexDirection: "column",
              }}
            >
              <Text size="sm" color="dimmed">
                Rating
              </Text>
              <Group spacing={1}>
                <IconStar size={18} />
                <Text size="sm" weight={500}>
                  {`${bike.rating}`}
                </Text>
                <Text size="xs" weight={500} color="dimmed">
                  {`(${bike.ratingCount})`}
                </Text>
              </Group>
            </Group>
            <KeyValueDataGroup keyText="Price" value={`${bike.price} $/day`} />
          </Group>
        </div>
        <InteractiveStatusBadge
          status={bike.status}
          entity="bike"
          sx={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
          }}
          tooltipLabel={
            bike.status == BikeStatus.AVAILABLE
              ? "Set as unavailable"
              : "Set back as available"
          }
          onClick={() => {
            return updateBike(bike.id, {
              status:
                bike.status == BikeStatus.AVAILABLE
                  ? BikeStatus.UNAVAILABLE
                  : BikeStatus.AVAILABLE,
            });
          }}
        />
      </div>
    </div>
  );
};

export default BikeBanner;

interface KeyValueDataGroupProps {
  keyText: string;
  value: string;
}

const KeyValueDataGroup: FunctionComponent<KeyValueDataGroupProps> = ({
  keyText,
  value,
}) => {
  return (
    <Group
      align="flex-start"
      spacing={2}
      sx={{
        flexDirection: "column",
      }}
    >
      <Text size="sm" color="dimmed">
        {keyText}
      </Text>
      <Title size="lg">{value}</Title>
    </Group>
  );
};

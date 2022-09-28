import {
  ActionIcon,
  Avatar,
  Container,
  createStyles,
  Group,
  Text,
} from "@mantine/core";
import { User } from "@root/@types";
import { IconPencil } from "@tabler/icons";
import React, { FunctionComponent } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

interface ProfileBannerProps {
  user: User;
}

const ProfileBanner: FunctionComponent<ProfileBannerProps> = ({ user }) => {
  const { classes } = useStyles();
  return (
    <Container>
      <div className={classes.wrapper}>
        <Group>
          <Avatar radius="xl" />
          <Group
            sx={{
              flexDirection: "column",
            }}
            align="flex-start"
            spacing={1}
          >
            <Text weight="bold">{user.name}</Text>
            <Text size="sm" color="dimmed">
              {user.email}
            </Text>
          </Group>
        </Group>
        <Group>
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </Container>
  );
};

export default ProfileBanner;

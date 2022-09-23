import React, { FunctionComponent } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";


import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Text,
} from "@mantine/core";
import {
  TablerIcon,
  IconCalendar,
  IconUsers,
  IconLogout,
  IconSwitchHorizontal,
  IconBike,
  IconUser,
} from "@tabler/icons";
import { UsersTable } from "@components/organisms";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  path: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label,path, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  const { push } = useRouter();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
              onClick={() => {
                  onClick?.();
                  push(`/dashboard/${path}`);
              }}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconBike, label: "Bikes", path: "bikes" },
  { icon: IconCalendar, label: "Reservations", path: "reservations" },
  { icon: IconUsers, label: "Users", path: "users" },
  { icon: IconUser, label: "Managers", path: "managers" },
];


interface DashboardNavbarProps {
  initialPath: string;
}

const DashboardNavbar: FunctionComponent<DashboardNavbarProps> = ({
  initialPath
}) => {
  const [active, setActive] = useState(initialPath);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.path === active}
      onClick={() => setActive(link.path)}
    />
  ));
  return (
    <div className={styles.container}>
      <Head>
        <title>DashboardNavbar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Navbar width={{ base: 80 }} p="md">
            <Center>
              <Text
                size="xl"
                weight="bolder"
                style={{
                  padding: "1rem",
                }}
              >
                Bikes
              </Text>
            </Center>
            <Navbar.Section grow mt={50}>
              <Stack justify="center" spacing={0}>
                {links}
              </Stack>
            </Navbar.Section>
            <Navbar.Section>
              <Stack justify="center" spacing={0}>
                <NavbarLink
                  icon={IconSwitchHorizontal}
                  label="Change account"
                />
                <NavbarLink icon={IconLogout} label="Logout" />
              </Stack>
            </Navbar.Section>
          </Navbar>
        </div>
      </main>
    </div>
  );
};

export default DashboardNavbar;

import { FunctionComponent } from "react";
import { Center, Text } from "@mantine/core";

interface LargeHeadingProps {
  children: React.ReactNode;
}

export const LargeHeading: FunctionComponent<LargeHeadingProps> = ({
  children,
}) => {
  return (
    <Center>
      <div
        style={{
          minWidth: 1000,
          paddingBottom: "2rem",
        }}
      >
        <Text
          size="xl"
          weight="bolder"
          style={{
            alignSelf: "flex-start",
          }}
        >
          {children}
        </Text>
      </div>
    </Center>
  );
};

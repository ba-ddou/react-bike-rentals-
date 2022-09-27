import { FunctionComponent } from "react";
import { Center, Text } from "@mantine/core";

interface LargeHeadingProps {
  children: React.ReactNode;
  minWidth: number;
}

export const LargeHeading: FunctionComponent<LargeHeadingProps> = ({
  children,
  minWidth = 1000,
}) => {
  return (
    <Center>
      <div
        style={{
          minWidth,
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

import React, { FunctionComponent } from "react";
import { Checkbox } from "@mantine/core";

interface CheckboxGroupProps {
  options: {
    id: string;
    label: string;
  }[];
  onChange?(value: string[]): void;
}

export const CheckboxGroup: FunctionComponent<CheckboxGroupProps> = ({
  options,
  onChange,
}) => {
  return (
    <Checkbox.Group
      defaultValue={[options[0].id]}
      // label="Select your favorite framework/library"
      // description="This is anonymous"
      // withAsterisk
      onChange={onChange}
      size="xs"
      orientation="vertical"
    >
      {options.map((option) => (
        <Checkbox
          size="xs"
          key={option.id}
          value={option.id}
          label={option.label}
        />
      ))}
    </Checkbox.Group>
  );
};

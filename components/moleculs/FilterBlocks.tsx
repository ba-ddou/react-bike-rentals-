import React, { FunctionComponent } from "react";
import { Checkbox, CheckIcon, ColorSwatch, Group } from "@mantine/core";

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

interface ColorSwatchSelectionGroupProps {
  colors: string[];
  onChange(value: string[]): void;
}

export const ColorSwatchSelectionGroup: FunctionComponent<
  ColorSwatchSelectionGroupProps
> = ({ colors, onChange }) => {
  const [selectedColors, setSelectedColors] = React.useState<string[]>(colors);
  const onCheck = (color: string) => {
    let newSelectedColors = [];
    if (selectedColors.includes(color)) {
      newSelectedColors = selectedColors.filter((c) => c !== color);
    } else {
      newSelectedColors = [...selectedColors, color];
    }
    setSelectedColors(newSelectedColors);
    onChange(newSelectedColors);
  };
  return (
    <Group position="center" spacing="xs">
      {colors.map((color) => (
        <ColorSwatch
          key="color"
          component="button"
          color={color}
          onClick={() => onCheck(color)}
          sx={{ color: "#fff", cursor: "pointer" }}
        >
          {selectedColors.includes(color) && <CheckIcon width={10} />}
        </ColorSwatch>
      ))}
    </Group>
  );
};

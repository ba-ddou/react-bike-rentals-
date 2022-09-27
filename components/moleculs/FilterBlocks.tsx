import React, { FunctionComponent } from "react";
import {
  Checkbox,
  CheckIcon,
  ColorSwatch,
  Group,
  useMantineTheme,
} from "@mantine/core";

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
      defaultValue={options.map((option) => option.id)}
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
  initialColors: string[];
}

export const ColorSwatchSelectionGroup: FunctionComponent<
  ColorSwatchSelectionGroupProps
> = ({ colors, onChange, initialColors }) => {
  const [selectedColors, setSelectedColors] =
    React.useState<string[]>(initialColors);
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
          key={color}
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

interface ColorSwatchRadioSelectionGroupProps {
  colors: string[];
  onChange(value: string): void;
  initialColor: string;
}

export const ColorSwatchRadioSelectionGroup: FunctionComponent<
  ColorSwatchRadioSelectionGroupProps
> = ({ colors, onChange, initialColor }) => {
  const [selectedColor, setSelectedColor] =
    React.useState<string>(initialColor);
  const onCheck = (color: string) => {
    setSelectedColor(color);
    onChange(color);
  };
  return (
    <Group position="center" spacing="xs">
      {colors.map((color) => (
        <ColorSwatch
          key={color}
          component="button"
          color={color}
          onClick={() => onCheck(color)}
          sx={{ color: "#fff", cursor: "pointer" }}
        >
          {selectedColor == color && <CheckIcon width={10} />}
        </ColorSwatch>
      ))}
    </Group>
  );
};

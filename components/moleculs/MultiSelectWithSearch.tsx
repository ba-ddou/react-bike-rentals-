import { forwardRef, FunctionComponent } from "react";
import {
  MultiSelect,
  MultiSelectProps,
  Box,
  CloseButton,
  SelectItemProps,
  MultiSelectValueProps,
} from "@mantine/core";

function Value({
  value,
  label,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & { value: string }) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <div>{label}</div>
        </Box>
      </div>
    );
  }
);

interface MultiSelectWithSearchProps {
  options: { label: string; value: string }[];
}

const MultiSelectWithSearch: FunctionComponent<MultiSelectWithSearchProps> = ({
  options,
}) => {
  return (
    <MultiSelect
      data={options}
      limit={20}
      valueComponent={Value}
      itemComponent={Item}
      searchable
      defaultValue={options.map((option) => option.value)}
      placeholder="Pick cities"
    //   label="Which countries you visited last year?"
    />
  );
};

export default MultiSelectWithSearch;

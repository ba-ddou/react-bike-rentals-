import { FunctionComponent, useState } from "react";
import {
  DateRangePicker as MantinDateRangePicker,
  DateRangePickerValue,
} from "@mantine/dates";

interface DateRangePickerProps {
  onChange(value: DateRangePickerValue): void;
}

const DateRangePicker: FunctionComponent<DateRangePickerProps> = ({
  onChange,
}) => {
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(),
    new Date(),
  ]);

  return (
    <MantinDateRangePicker
      label="Reservation dates"
      placeholder="Pick dates range"
      value={value}
      onChange={(value) => {
        setValue(value);
        onChange(value);
      }}
      allowSingleDateInRange
      style={{ width: "25rem" }}
    />
  );
};

export default DateRangePicker;

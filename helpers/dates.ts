import { DateTime } from "luxon";

export const getNumberOfDays = (start: Date, end: Date) => {
  const startDate = DateTime.fromJSDate(start);
  const endDate = DateTime.fromJSDate(end);
  const diff = endDate.diff(startDate, "days");
  return diff.days + 1;
};

export const formatDateTime = (date: Date, includeTime: boolean = false) => {
  if (!includeTime) return DateTime.fromJSDate(date).toFormat("dd LLL yyyy");
  return DateTime.fromJSDate(date).toFormat("dd LLL yyyy HH:mm");
};

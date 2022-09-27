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

interface DateRange {
  from: Date;
  to: Date;
}

export const checkDateRangeIntersection = (
  dateRangeA: DateRange,
  dateRangeB: DateRange
): boolean => {
  const dateRangeAStart = DateTime.fromJSDate(dateRangeA.from);
  const dateRangeAEnd = DateTime.fromJSDate(dateRangeA.to);
  const dateRangeBStart = DateTime.fromJSDate(dateRangeB.from);
  const dateRangeBEnd = DateTime.fromJSDate(dateRangeB.to);
  return dateRangeAStart <= dateRangeBEnd && dateRangeAEnd >= dateRangeBStart;
};


export const normalizeDate = (date: Date) => { 
  date.setHours(0, 0, 0, 1);
  return date;
}
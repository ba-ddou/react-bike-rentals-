import { ConceptualReservationStatus, ReservationStatus } from "@root/@types";

export const inferConceptualStatus = (
  status: ReservationStatus,
  dateRange: {
    from: Date;
    to: Date;
  }
): ConceptualReservationStatus => {
  if (status === ReservationStatus.CANCELLED)
    return ConceptualReservationStatus.CANCELLED;

  const currentDate = new Date();
  const { from, to } = dateRange;
  if (currentDate < from) return ConceptualReservationStatus.PENDING;
    if (currentDate <= to) return ConceptualReservationStatus.IN_PROGRESS;
    console.log({ currentDate, to, check: currentDate <= to });
  return ConceptualReservationStatus.COMPLETED;
};

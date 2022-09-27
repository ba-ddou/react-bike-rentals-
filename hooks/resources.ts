import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "config/firebase";
import { collection, where, query, startAt, endAt } from "firebase/firestore";
import {
  Bike,
  BikeStatus,
  Filters,
  Reservation,
  ReservationWithProjections,
  User,
  UserRole,
} from "@root/@types";
import { docConverter } from "@helpers/firebase";
import { useAuth } from "./auth";
import { checkDateRangeIntersection } from "@helpers/dates";
import { EntityStatus } from "@root/@types/Global";

export const useBikesData = () => {
  const { user } = useAuth();
  const queryC =
    user?.role == UserRole.MANAGER
      ? query(collection(db, "bikes").withConverter(docConverter))
      : query(
          collection(db, "bikes").withConverter(docConverter),
          where("status", "==", BikeStatus.AVAILABLE)
        );
  const [bikes, loading, error] = useCollectionData(queryC, {
    snapshotOptions: {},
  });

  return {
    bikes: bikes as Bike[],
    loading,
    error,
  };
};

export const useUsersData = () => {
  const [users, loading, error] = useCollectionData(
    query(
      collection(db, "users").withConverter(docConverter),
      where("role", "==", UserRole.USER),
      where("entityStatus", "==", EntityStatus.ACTIVE)
    )
  );

  return { users: users as User[], loading, error };
};

export const useManagersData = (authenticatedManagerID?: string) => {
  const [managers, loading, error] = useCollectionData(
    query(
      collection(db, "users").withConverter(docConverter),
      where("role", "==", UserRole.MANAGER),
      where("entityStatus", "==", EntityStatus.ACTIVE)
    )
  );

  return {
    managers: managers?.filter(
      (manager) => manager.id !== authenticatedManagerID
    ) as User[],
    loading,
    error,
  };
};

interface DateRange {
  from: Date;
  to: Date;
}

export const useReservationsData = (dateRange?: DateRange) => {
  const [reservations, loading, error] = useCollectionData(
    query(collection(db, "reservations").withConverter(docConverter))
  );

  return {
    reservations: applyDateRangeFilter(reservations,dateRange) as Reservation[],
    loading,
    error,
  };
};

const applyDateRangeFilter = (
  reservations?: Reservation[],
  dateRange?: DateRange
) => {
  if (!dateRange || !reservations) return reservations;

  return reservations.filter((reservation) => {
    return checkDateRangeIntersection(
      {
        from: reservation.from.toDate(),
        to: reservation.to.toDate(),
      },
      dateRange
    );
  });
};

// const getReservationsQuery = (filters?: Filters) => {

//   if (!filters) return query(collection(db, "reservations").withConverter(docConverter));
//   const constraints = [];
//   const {
//     // model,
//     // color,
//     // location,
//     dateRange,
//   } = filters || {};

//   if (dateRange) {
//     const { from, to } = dateRange;
//     constraints.push(
//       where("to", "<=", to),
//       where("to", ">=", from)
//     );
//   }
//   return query(
//     collection(db, "reservations").withConverter(docConverter),
//     ...constraints
//   );
// };

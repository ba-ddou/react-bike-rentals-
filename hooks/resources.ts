import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "config/firebase";
import { collection, where, query } from "firebase/firestore";
import { Bike, BikeStatus, ReservationWithProjections, User, UserRole } from "@root/@types";
import { docConverter } from "@helpers/firebase";
import { useAuth } from "./auth";

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
      where("role", "==", UserRole.USER)
    )
  );

  return { users: users as User[], loading, error };
};

export const useManagersData = (authenticatedManagerID?: string) => {
  const [managers, loading, error] = useCollectionData(
    query(collection(db, "users").withConverter(docConverter), where("role", "==", UserRole.MANAGER))
  );

  return {
    managers: managers?.filter(
      (manager) => manager.id !== authenticatedManagerID
    ) as User[],
    loading,
    error,
  };
};


export const useReservationsData = () => {
  const [reservations, loading, error] = useCollectionData(
    query(
      collection(db, "reservations").withConverter(docConverter),
    )
  );

  return {
    reservations: reservations as ReservationWithProjections[],
    loading,
    error,
  };
};
import { Bike, BikeStatus } from "@types";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "config/firebase";
import {
  collection,
  where,
  query,
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { User, UserRole } from "@root/@types";
import { useAuth } from "./auth";
import { docConverter } from "helpers";

// const mockBike: Bike = {
//   id: 1,
//   model: "AVANTI",
//   name: "AVANTI BLACK THUNDER 1 2022",
//   price: 20,
//   color: "black",
//   image:
//     "https://cdn.shopify.com/s/files/1/0400/6382/8118/products/avanti-black-thunder-1-2022-black_1600x.jpg?v=1635065239",
//   location: "New York",
//   rating: 4.5,
//   ratingCount: 10,
//   createBy: "1",
// };


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

export const useUsers = () => {
  const [users, loading, error] = useCollectionData(
    query(
      collection(db, "users").withConverter(docConverter),
      where("role", "==", UserRole.USER)
    )
  );

  return { users: users as User[], loading, error };
};

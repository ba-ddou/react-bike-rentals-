import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export const docConverter: FirestoreDataConverter<any> = {
  toFirestore: (data: any) => data,
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): any {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    };
  },
};
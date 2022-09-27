import { BikeCreationInput, ExtendedBikeCreationInput, StrippedUser, UserRole,Bike, Reservation, ReservationStatus, ReservationCreationInput } from "@root/@types";
import firebaseApp from "../config/firebase";
import { getFirestore, doc, setDoc, getDoc,addDoc,collection,serverTimestamp } from "firebase/firestore";
import cookie from "js-cookie";
import { getAuth } from "firebase/auth";
import { EntityStatus } from "@root/@types/Global";
import { normalizeDate } from "@helpers/dates";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export const createUser = async (id: string, user: StrippedUser) => {
  const res = await setDoc(doc(db, "users", id), {
    ...user,
    role: UserRole.USER,
  });
  return res;
};


export const getUser = async (id: string) => { 
  const user = await getDoc(doc(db, "users", id));
  return user;
}

export const createBike = async (bike: ExtendedBikeCreationInput) => { 
  const res = await addDoc(collection(db, "bikes"), bike);
  return res;
}

export const deleteBike = async (id: string) => { 
  const res = await setDoc(
    doc(db, "bikes", id),
    { entityStatus: EntityStatus.DELETED },
    { merge: true }
  );
  return res;
}

interface DateRange {
  from: Date;
  to: Date;
}

export const createReservation = async ({ 
  bike,
  user,
  dateRange,
}:{
  bike: Bike,
  user: string,
  dateRange: DateRange
  }) => { 
  const {id:bikeId,price,location } = bike;
  const {from,to } = dateRange;
  const reservation: ReservationCreationInput = {
    from: normalizeDate(from),
    to: normalizeDate(to),
    user,
    bike: bikeId,
    bikeSnapshot: {
      price,
      location,
    },
    status: ReservationStatus.ACTIVE,
    // @ts-ignore
    reservedAt: serverTimestamp(),
  };
  const res = await addDoc(collection(db, "reservations"), reservation);
  return res;
}

export const cancelReservation = async (id: string) => { 
  const res = await setDoc(
    doc(db, "reservations", id),
    { status: ReservationStatus.CANCELLED },
    { merge: true }
  );
  return res;
}
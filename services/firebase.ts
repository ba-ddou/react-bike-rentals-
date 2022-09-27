import { BikeCreationInput, ExtendedBikeCreationInput, StrippedUser, UserRole,Bike, Reservation, ReservationStatus, ReservationCreationInput } from "@root/@types";
import firebaseApp from "../config/firebase";
import { getFirestore, doc, setDoc, getDoc,addDoc,collection,serverTimestamp } from "firebase/firestore";
import cookie from "js-cookie";
import { getAuth } from "firebase/auth";

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
    from,
    to,
    user,
    bike: bikeId,
    bikeSnapshot: {
      price,
      location,
    },
    status: ReservationStatus.PENDING,
    reservedAt: serverTimestamp(),
  };
  const res = await addDoc(collection(db, "reservations"), reservation);
  return res;
}
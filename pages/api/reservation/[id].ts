import type { NextApiRequest, NextApiResponse } from "next";
import { Bike, User, UserRole } from "@types";
import admin from "@root/lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { method, query, body } = req;
  if (method == "PUT") {
    const { id } = query;
    const { rating } = body;
    const reservation = await admin
      .firestore()
      .collection("reservations")
      .doc(id as string)
      .get()
      .then((doc) => {
        const data = doc.data();
        return data;
      });
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    await admin
      .firestore()
      .collection("reservations")
      .doc(id as string)
      .update({
        rating,
      });

    const { bike } = reservation;
    const bikeDoc = await admin
      .firestore()
      .collection("bikes")
      .doc(bike)
      .get()
      .then((doc) => {
        const data = doc.data();
        return data as Bike;
      });
    const { rating: bikeRating, ratingCount } = bikeDoc;
    const newRating = (bikeRating * ratingCount + rating) / (ratingCount + 1);
    await admin
      .firestore()
      .collection("bikes")
      .doc(bike)
      .update({
        rating: newRating,
        ratingCount: ratingCount + 1,
      });
    res.status(200).json({
      message: `Reservation ${id} was rated successfully`,
    });
  } else {
    res.status(404).json({ message: "Method not found" });
  }
}

import admin from "firebase-admin";
import serviceAccount from "./service_account.json";

try {
  admin.initializeApp({
    //@ts-ignore
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase admin sdk initialized.");
} catch (error: any) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;

import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const deleteCityFromDb = async (userId: string, city: string) => {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      cities: arrayRemove(city),
    });
    console.log(`City "${city}" removed from Firestore`);
  } catch (error) {
    console.error("Error removing city:", error);
  }
};

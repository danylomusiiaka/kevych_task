import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export const subscribeToCities = (userId: string, onUpdate: (cities: string[]) => void) => {
  const userRef = doc(db, "users", userId);
  const unsubscribe = onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      onUpdate(data.cities || []);
    }
  });
  return unsubscribe;
};

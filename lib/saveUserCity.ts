import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const saveCityInDb = async (userId: string, city: string) => {
  const userRef = doc(db, "users", userId);
  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentCities = userData?.cities || [];

      const updatedCities = [city, ...currentCities];

      await setDoc(
        userRef,
        {
          cities: updatedCities,
        },
        { merge: true }
      );
    } else {
      await setDoc(userRef, {
        cities: [city],
      });
    }
  } catch (err) {
    alert(`Error saving city: ${err}`);
  }
};

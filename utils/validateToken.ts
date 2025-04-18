import { auth } from "@/lib/firebase";
import { getIdToken } from "firebase/auth";

export const validateToken = async () => {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await getIdToken(user, true);
  } catch (error: any) {
    if (error.code === "auth/network-request-failed") {
      alert("Network error occurred. Please check your internet connection and try again.");
    } else if (error.code === "auth/user-token-expired") {
      alert("Your session has expired. Please log in again.");
    } else {
      alert(`An unexpected error occurred: ${error.message}`);
    }
  }
};

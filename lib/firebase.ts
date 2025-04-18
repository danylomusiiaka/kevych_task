import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqbZCELemK9RTY3sPpe3BkVMwtQ0Hx0Yc",
  authDomain: "kevych-test.firebaseapp.com",
  projectId: "kevych-test",
  storageBucket: "kevych-test.appspot.com",
  messagingSenderId: "223151857267",
  appId: "1:223151857267:ios:7dfef4990c59abe8489406",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
export const db = getFirestore(app);

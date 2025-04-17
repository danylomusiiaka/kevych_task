import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { ActivityIndicator, View } from "react-native";
import { store } from "../store/index";
import { Provider } from "react-redux";

export default function RootLayout() {
  const [initiating, setInitiating] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged", user);
      setUser(user);
      if (initiating) setInitiating(false);
    });
    return unsubscribe;
  }, []);

  if (initiating) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Provider>
  );
}

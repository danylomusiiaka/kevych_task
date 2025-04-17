import { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import LoginForm from "./ui/LoginForm";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/about");
    } catch (error: any) {
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior="height">
        <LoginForm onSubmit={signIn} loading={loading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

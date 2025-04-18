import { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useRouter } from "expo-router";
import LoginForm from "./ui/LoginForm";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      alert(`Welcome back, ${userCredential.user.email}!`);
      router.push("/");
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email. Please check your email or sign up.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid. Please enter a valid email.";
      }
      alert("Login failed: " + errorMessage);
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

import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import RegisterForm from "./ui/RegistrationForm";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (email: string, password: string, confirmPassword: string) => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        alert("Passwords must be the same!");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior="height">
        <RegisterForm onSubmit={handleRegister} loading={loading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import RegisterForm from "./ui/RegistrationForm";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (name: string, email: string, password: string, confirmPassword: string) => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        alert("Passwords must match!");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (name) await updateProfile(user, { displayName: name });

      await sendEmailVerification(user);

      alert("Registration successful! Please verify your email.");
      router.push("/");
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use. Please use a different email.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid. Please enter a valid email.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak. Please use a stronger password.";
      }
      alert(errorMessage);
      console.log(error);
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

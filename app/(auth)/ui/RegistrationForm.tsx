import { useRouter } from "expo-router";
import React from "react";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

type RegistrationFormProps = {
  onSubmit: (email: string, password: string, confirmPassword: string) => void;
  loading: boolean;
};

export default function RegisterForm({ onSubmit, loading }: RegistrationFormProps) {
  const [registrationForm, setRegistrationForm] = useState({ email: "", password: "", confirmPassword: "" });
  const router = useRouter();

  const handleSubmit = () => {
    const { email, password, confirmPassword } = registrationForm;
    onSubmit(email, password, confirmPassword);
  };

  return (
    <View className="flex h-full justify-center space-y-4 p-4">
      <Text className="text-xl font-bold text-gray-800">Registration</Text>

      <View className="space-y-2">
        <Text>Email</Text>
        <TextInput
          className="border-1 border p-3 text-black"
          value={registrationForm.email}
          onChangeText={(value) => setRegistrationForm({ ...registrationForm, email: value })}
          keyboardType="email-address"
          placeholder="ex. someemail@gmail.com"
          placeholderTextColor="gray"
        />
      </View>

      <View className="space-y-2">
        <Text>Password</Text>
        <TextInput
          className="border-1 border p-3 text-black"
          value={registrationForm.password}
          onChangeText={(value) => setRegistrationForm({ ...registrationForm, password: value })}
          secureTextEntry
          placeholder="ex. 12345"
          placeholderTextColor="gray"
        />
      </View>

      <View className="space-y-2">
        <Text>Confirm password</Text>
        <TextInput
          className="border-1 border p-3 text-black"
          value={registrationForm.confirmPassword}
          onChangeText={(value) => setRegistrationForm({ ...registrationForm, confirmPassword: value })}
          secureTextEntry
          placeholder="ex. 12345"
          placeholderTextColor="gray"
        />
      </View>

      {loading ? (
        <ActivityIndicator size={"small"} style={{ margin: 28 }} />
      ) : (
        <TouchableOpacity onPress={handleSubmit} className="flex items-center rounded-md bg-blue-500 p-2">
          <Text className="font-medium text-white">Sign up</Text>
        </TouchableOpacity>
      )}
      <View className="flex-row justify-between">
        <View className="flex-row space-x-1">
          <Text className="font-medium">Already registered?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")} className="">
            <Text className="font-medium text-blue-500">Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push("/")} className="">
          <Text className="font-medium text-blue-500">Go back home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

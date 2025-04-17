import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
};

export default function LoginForm({ onSubmit, loading }: LoginFormProps) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = () => {
    const { email, password } = loginForm;
    onSubmit(email, password);
  };

  return (
    <View className="flex h-full justify-center space-y-4 p-4">
      <Text className="text-xl font-bold text-gray-800">Login</Text>
      <View className="space-y-2">
        <Text>Email</Text>
        <TextInput
          className="border-1 border p-3 text-black"
          value={loginForm.email}
          onChangeText={(value) => setLoginForm({ ...loginForm, email: value })}
          keyboardType="email-address"
          placeholder="ex. someemail@gmail.com"
          placeholderTextColor="gray"
        />
      </View>
      <View className="space-y-2">
        <Text>Password</Text>
        <TextInput
          className="border-1 border p-3 text-black"
          value={loginForm.password}
          onChangeText={(value) => setLoginForm({ ...loginForm, password: value })}
          secureTextEntry
          placeholder="ex. 12345"
          placeholderTextColor="gray"
        />
      </View>
      {loading ? (
        <ActivityIndicator size={"small"} style={{ margin: 28 }} />
      ) : (
        <TouchableOpacity onPress={handleSubmit} className="flex items-center rounded-md bg-blue-500 p-2">
          <Text className="font-medium text-white">Login</Text>
        </TouchableOpacity>
      )}
      <View className="flex-row justify-between">
        <View className="flex-row space-x-1">
          <Text className="font-medium">New here?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/registration")} className="">
            <Text className="font-medium text-blue-500">Register</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push("/")} className="">
          <Text className="font-medium text-blue-500">Go back home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = () => {};

  const signIn = () => {};

  return (
    <SafeAreaView className='flex-1 justify-center'>
      <KeyboardAvoidingView behavior='padding'>
        <View className='p-4 space-y-4'>
          <Text className='text-xl font-bold text-gray-800'>Hello World</Text>
          <View className='space-y-2'>
            <Text>Email</Text>
            <TextInput className='border border-1 p-2 text-black' value={email} onChangeText={setEmail} keyboardType='email-address' placeholder='ex. someemail@gmail.com' placeholderTextColor='gray' />
          </View>
          <View className='space-y-2'>
            <Text>Password</Text>
            <TextInput className='border border-1 p-2 text-black' value={password} onChangeText={setPassword} secureTextEntry placeholder='ex. 12345' placeholderTextColor='gray' />
          </View>
          {loading ? (
            <ActivityIndicator size={"small"} style={{ margin: 28 }} />
          ) : (
            <TouchableOpacity className='bg-blue-500 p-2 rounded-md flex items-center'>
              <Text className='text-white font-medium'>Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

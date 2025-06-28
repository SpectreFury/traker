import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const handleGoogleLogin = () => {
    // TODO: Implement Google authentication
    console.log("Google login pressed");
  };

  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="items-center">
        <Image
          source={require("../assets/images/habits.svg")}
          style={{ width: 200, height: 200 }}
          contentFit="contain"
        />
      </View>
      <View className="items-center mt-10 mb-12">
        <Text className="font-opensans-bold text-4xl text-center">Traker</Text>
        <Text className="font-opensans-medium mt-4 text-center text-gray-600">
          Track your activities with your friends.
        </Text>
      </View>

      <View className="w-full max-w-sm">
        <TouchableOpacity
          onPress={handleGoogleLogin}
          className="bg-white border border-gray-300 rounded-lg px-6 py-4 flex-row items-center justify-center shadow-sm"
          activeOpacity={0.7}
        >
          <View className="mr-3">
            <Image
              source={require("../assets/images/google-icon.svg")}
              style={{ width: 20, height: 20 }}
              contentFit="contain"
            />
          </View>
          <Text className="font-opensans-medium text-gray-700 text-base">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View className="mt-6">
          <Text className="font-opensans text-center text-gray-500 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}

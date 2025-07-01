import { useUser } from "@/hooks/useUser";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const { user, initializing } = useUser();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;

      if (!idToken) {
        throw new Error("No ID token received from Google Sign-In");
      }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential =
        await auth().signInWithCredential(googleCredential);

      Alert.alert("Success", "Signed in successfully!");
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);

      if (error?.code === "auth/operation-not-allowed") {
        Alert.alert(
          "Error",
          "Google Sign-In is not enabled in Firebase Console"
        );
      } else if (error?.code === "auth/invalid-credential") {
        Alert.alert("Error", "Invalid Google credentials");
      } else {
        Alert.alert("Error", "Failed to sign in with Google");
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "785565034446-pik9e2kdmk79h4jabce1qeq6sjb0ipu8.apps.googleusercontent.com", // Web Client ID from Firebase
    });
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  if (initializing) {
    return null;
  }

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

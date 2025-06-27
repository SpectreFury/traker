import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center mt-40 px-4">
      <View className="w-full items-center">
        <Image
          source={require("../assets/images/habit-icon.svg")}
          style={{ width: 200, height: 200, marginBottom: 16 }}
          contentFit="contain"
        />
        <Text className="font-opensans-bold text-4xl">Traker</Text>
        <Text className="font-opensans-medium mt-2 text-xl">
          Track your activities with your friends.
        </Text>

        <Pressable
          className="px-3 py-4 border-slate-200 bg-slate-900 rounded mt-10"
          onPress={() => console.log("Button Pressed")}
        >
          <Text className="font-opensans-medium text-slate-100">
            Login With Google
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

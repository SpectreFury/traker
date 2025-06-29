import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Pressable } from "react-native";
import Tag from "./Tag";
import { useState } from "react";
import { Image } from "expo-image";

type ActivityCardProps = {
  id: string;
  title: string;
  author: string;
  photoURL?: string;
};

export function ActivityCard({
  id,
  title,
  author,
  photoURL,
}: ActivityCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View className="bg-zinc-200 p-4 border border-zinc-300 rounded mb-4">
      <View className="flex-row justify-between">
        <View className="gap-2">
          <Text className="font-opensans-medium text-lg">{title}</Text>
          <View className="flex-row gap-2">
            <Tag title="Workout" />
            <Tag title="Homework" />
          </View>
        </View>
        <View>
          <Image
            source={photoURL}
            style={{
              width: 50,
              height: 50,
              overflow: "hidden",
              borderRadius: 25,
            }}
            contentFit="contain"
          />
        </View>
      </View>

      <View className="mt-4">
        <Pressable onPress={() => setIsLiked((prev) => !prev)}>
          <Ionicons
            name={isLiked ? "heart-sharp" : "heart-outline"}
            size={20}
          />
        </Pressable>
      </View>
    </View>
  );
}

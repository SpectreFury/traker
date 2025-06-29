import { ActivityCard } from "@/components/ActivityCard";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Home() {
  const [data, setData] = useState([
    {
      id: "1",
      title: "Chest Day",
      author: "Ashhar",
      photoURL: "https://picsum.photos/200",
    },
    {
      id: "2",
      title: "Back Day",
      author: "Aman",
      photoURL: "https://picsum.photos/200",
    },
    {
      id: "3",
      title: "Leg Day",
      author: "Ashhar",
      photoURL: "https://picsum.photos/200",
    },
    {
      id: "4",
      title: "Shoulder Day",
      author: "Aman",
      photoURL: "https://picsum.photos/200",
    },
    {
      id: "5",
      title: "Cardio Session",
      author: "Ashhar",
      photoURL: "https://picsum.photos/200",
    },
    {
      id: "6",
      title: "Core Workout",
      author: "Aman",
      photoURL: "https://picsum.photos/200",
    },
    {
      id: "7",
      title: "Full Body",
      author: "Ashhar",
      photoURL: "https://picsum.photos/200",
    },
    {
      id: "8",
      title: "Arm Day",
      author: "Aman",
      photoURL: "https://picsum.photos/200",
    },
  ]);

  const { user, initializing } = useUser();
  const router = useRouter();

  return (
    <View className="flex-1 px-8">
      <View className="mt-40">
        <Text className="font-opensans-medium text-2xl">
          Goodevening, {user?.displayName}
        </Text>
        <Text className="font-opensans-regular text-gray-600 mt-2">
          Welcome to Traker, your personal activity tracker.
        </Text>
      </View>

      <FlatList
        className="mt-10"
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityCard
            id={item.id}
            title={item.title}
            author={item.author}
            photoURL={item.photoURL}
          />
        )}
      />
    </View>
  );
}

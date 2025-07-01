import { firestore } from "@/services/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "@react-native-firebase/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Tag from "./Tag";

dayjs.extend(relativeTime);

type ActivityCardProps = {
  id: string;
  title: string;
  author: string;
  photoURL?: string;
  tags: string[];
  likes: string[];
  user: FirebaseAuthTypes.User | null;
  createdAt: Date;
};

export function ActivityCard({
  id,
  title,
  author,
  photoURL,
  tags,
  likes,
  user,
  createdAt,
}: ActivityCardProps) {
  const [isLiked, setIsLiked] = useState(likes.includes(id));

  const handleLike = async () => {
    try {
      // Immediately toggle the like state
      setIsLiked((prev) => !prev);

      // Lazy update the Firestore document
      const docRef = doc(firestore, "activities", id);
      await updateDoc(docRef, {
        likes: isLiked ? arrayRemove(id) : arrayUnion(id),
      });
    } catch (error) {
      console.error("Error liking activity:", error);
    }
  };

  return (
    <View
      className="bg-white border border-zinc-100 rounded-2xl mb-6 overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      <View className="p-6">
        {/* Header with title and profile */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1 mr-4">
            <Text className="font-opensans-bold text-xl text-zinc-900 mb-2">
              {title}
            </Text>
            <Text className="font-opensans-medium text-sm text-zinc-500">
              by {author}
            </Text>
          </View>

          {/* Profile Image */}
          <View
            className="bg-zinc-100 rounded-full overflow-hidden border-2 border-zinc-200"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Image
              source={photoURL}
              style={{
                width: 48,
                height: 48,
              }}
              contentFit="cover"
            />
          </View>
        </View>

        {/* Tags */}
        <View className="flex-row gap-2 mb-4">
          {tags?.map((tag, index) => (
            <Tag key={index} title={tag} />
          ))}
        </View>

        {/* Timestamp */}
        <Text className="font-opensans text-xs text-zinc-400 mb-4">
          {dayjs(createdAt).fromNow()}
        </Text>

        {/* Action Bar */}
        <View className="flex-row items-center justify-between pt-4 border-t border-zinc-100">
          <View className="flex-row items-center gap-4">
            <Pressable
              onPress={handleLike}
              className="flex-row items-center gap-2 px-3 py-2 rounded-full bg-zinc-50"
              style={{
                backgroundColor: isLiked ? "#fef2f2" : "#f9fafb",
              }}
            >
              <Ionicons
                name={isLiked ? "heart-sharp" : "heart-outline"}
                size={18}
                color={isLiked ? "#ef4444" : "#6b7280"}
              />
              <Text
                className="font-opensans-medium text-sm"
                style={{
                  color: isLiked ? "#ef4444" : "#6b7280",
                }}
              >
                {isLiked ? "Liked" : "Like"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

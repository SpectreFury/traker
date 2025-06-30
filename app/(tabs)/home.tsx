import { ActivityCard } from "@/components/ActivityCard";
import { useUser } from "@/hooks/useUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Home() {
  const [data, setData] = useState([
    {
      id: "1",
      title: "Chest Day",
      author: "Ashhar",
      photoURL: "https://picsum.photos/200",
      tags: ["Workout", "Strength"],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newActivityTitle, setNewActivityTitle] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("r/workout");
  const [groups, setGroups] = useState(["r/workout", "r/fitness"]);

  const { user, initializing } = useUser();
  const router = useRouter();

  const handleCreateActivity = () => {
    if (newActivityTitle.trim()) {
      const newActivity = {
        id: Date.now().toString(),
        title: newActivityTitle.trim(),
        author: user?.displayName || "Unknown",
        photoURL: user?.photoURL || "https://picsum.photos/200",
        tags: ["New"],
      };

      setData([newActivity, ...data]);
      setNewActivityTitle("");
      setNewActivityDescription("");
      setModalVisible(false);
      Alert.alert("Success", "Activity created successfully!");
    } else {
      Alert.alert("Error", "Please enter an activity title");
    }
  };

  return (
    <View className="flex-1 px-8">
      {/* Floating Action Button */}
      <View
        className="absolute w-16 h-16 bg-zinc-900 bottom-6 right-6 z-20 rounded-full"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Pressable
          className="flex-1 justify-center items-center"
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </View>

      {/* Create Activity Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View
            className="bg-white rounded-t-3xl p-6 min-h-[400px]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
            }}
          >
            {/* Modal Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="font-opensans-bold text-2xl text-zinc-900">
                Create Activity
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="w-8 h-8 bg-zinc-100 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#71717a" />
              </TouchableOpacity>
            </View>

            {/* Activity Title Input */}
            <View className="mb-4">
              <Text className="font-opensans-semibold text-zinc-700 mb-2">
                Activity Title
              </Text>
              <TextInput
                className="border border-zinc-200 rounded-xl p-4 font-opensans text-base bg-zinc-50"
                placeholder="What did you do today?"
                value={newActivityTitle}
                onChangeText={setNewActivityTitle}
                style={{ fontFamily: "OpenSans-Regular" }}
              />
            </View>

            {/* Activity Description Input */}
            <View className="mb-6">
              <Text className="font-opensans-semibold text-zinc-700 mb-2">
                Group
              </Text>
              <Picker
                className="border border-zinc-200 rounded-xl bg-zinc-50"
                onValueChange={(itemValue) => console.log(itemValue)}
              >
                {groups.map((group, index) => (
                  <Picker.Item key={index} label={group} value={group} />
                ))}
              </Picker>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3 mt-auto">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="flex-1 bg-zinc-100 p-4 rounded-xl"
                activeOpacity={0.8}
              >
                <Text className="font-opensans-semibold text-zinc-700 text-center">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCreateActivity}
                className="flex-1 bg-zinc-900 p-4 rounded-xl"
                activeOpacity={0.8}
              >
                <Text className="font-opensans-semibold text-white text-center">
                  Create Activity
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View className="mt-40">
        <Text className="font-opensans-medium text-2xl">
          Good evening, {user?.displayName}
        </Text>
        <Text className="font-opensans-regular text-gray-600 mt-2">
          Welcome to Traker, your personal activity tracker.
        </Text>
      </View>

      <FlatList
        className="mt-10"
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ActivityCard
            id={item.id}
            title={item.title}
            author={item.author}
            photoURL={user?.photoURL || item.photoURL}
            tags={["Workout"]}
          />
        )}
      />
    </View>
  );
}

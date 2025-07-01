import { ActivityCard } from "@/components/ActivityCard";
import { useUser } from "@/hooks/useUser";
import { auth, firestore } from "@/services/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "@react-native-firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "@react-native-firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Group = {
  id: string;
  name: string;
};

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newActivityTitle, setNewActivityTitle] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);

  const { user, initializing } = useUser();
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            router.replace("/");
          } catch (error) {
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  const handleCreateActivity = async () => {
    if (!user || !selectedGroup || !newActivityTitle.trim()) return;

    try {
      const collectionRef = collection(firestore, "activities");

      const docRef = await addDoc(collectionRef, {
        name: newActivityTitle.trim(),
        author: user.uid,
        group: selectedGroup,
        likes: [],
        createdAt: new Date().toISOString(),
      });

      const newActivity = {
        id: docRef.id,
        title: newActivityTitle,
        author: user?.displayName || "Unknown",
        photoURL: user?.photoURL || "https://picsum.photos/200",
        tags: ["New"],
      };

      setData([newActivity, ...data]);
      setNewActivityTitle("");
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to create activity. Please try again.");
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(firestore, "groups"),
          where("members", "array-contains", user.uid)
        );

        const querySnapshot = await getDocs(q);

        const fetchedGroups = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));

        setGroups(fetchedGroups as Group[]);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch groups. Please try again.");
      }
    };

    fetchGroups();
  }, []);

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
                selectedValue={selectedGroup}
                className="border border-zinc-200 rounded-xl bg-zinc-50"
                onValueChange={(itemValue: string) =>
                  setSelectedGroup(itemValue)
                }
              >
                {groups.map((group, index) => (
                  <Picker.Item
                    key={index}
                    label={group.name}
                    value={group.id}
                  />
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

      {/* Header Section */}
      <View className="mt-40">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="font-opensans-medium text-2xl">
              Good evening, {user?.displayName}
            </Text>
            <Text className="font-opensans-regular text-gray-600 mt-2">
              Welcome to Traker, your personal activity tracker.
            </Text>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="ml-4 p-3 bg-zinc-100 rounded-full"
            activeOpacity={0.7}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#71717a" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-20">
            <View className="bg-zinc-100 rounded-full p-6 mb-6">
              <Ionicons name="fitness-outline" size={48} color="#71717a" />
            </View>
            <Text className="font-opensans-semibold text-xl text-zinc-800 mb-2 text-center">
              No activities yet
            </Text>
            <Text className="font-opensans-regular text-zinc-600 text-center max-w-xs leading-6">
              Start tracking your activities by tapping the plus button below
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="mt-6 bg-zinc-800 px-6 py-3 rounded-full"
              activeOpacity={0.8}
            >
              <Text className="font-opensans-semibold text-white">
                Create Activity
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

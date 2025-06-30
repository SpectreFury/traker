import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Track() {
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [myGroups, setMyGroups] = useState([
    { id: "1", name: "Gym Buddies", members: 5, code: "GYM123" },
    { id: "2", name: "Morning Runners", members: 12, code: "RUN456" },
  ]);

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      const newGroup = {
        id: Date.now().toString(),
        name: groupName.trim(),
        members: 1,
        code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      };
      setMyGroups([...myGroups, newGroup]);
      setGroupName("");
      setShowCreateGroup(false);
      Alert.alert("Success", `Group "${newGroup.name}" created! Code: ${newGroup.code}`);
    } else {
      Alert.alert("Error", "Please enter a group name");
    }
  };

  const handleJoinGroup = () => {
    if (groupCode.trim()) {
      Alert.alert("Success", `Joined group with code: ${groupCode}`);
      setGroupCode("");
      setShowJoinGroup(false);
    } else {
      Alert.alert("Error", "Please enter a group code");
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-8 pt-40 pb-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="font-opensans-bold text-3xl text-zinc-900">
            Track Together
          </Text>
          <Text className="font-opensans text-zinc-600 mt-2">
            Create or join groups to track activities with friends
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-4 mb-8">
          <TouchableOpacity
            onPress={() => setShowCreateGroup(!showCreateGroup)}
            className="flex-1 bg-zinc-900 p-4 rounded-2xl flex-row items-center justify-center"
            activeOpacity={0.8}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text className="font-opensans-semibold text-white ml-2">
              Create Group
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowJoinGroup(!showJoinGroup)}
            className="flex-1 bg-zinc-700 p-4 rounded-2xl flex-row items-center justify-center"
            activeOpacity={0.8}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Ionicons name="people-outline" size={20} color="white" />
            <Text className="font-opensans-semibold text-white ml-2">
              Join Group
            </Text>
          </TouchableOpacity>
        </View>

        {/* Create Group Form */}
        {showCreateGroup && (
          <View 
            className="bg-white p-6 rounded-2xl mb-6 border border-zinc-100"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text className="font-opensans-bold text-xl text-zinc-900 mb-4">
              Create New Group
            </Text>
            <TextInput
              className="border border-zinc-200 rounded-xl p-4 font-opensans text-base mb-4 bg-zinc-50"
              placeholder="Enter group name"
              value={groupName}
              onChangeText={setGroupName}
              style={{ fontFamily: 'OpenSans-Regular' }}
            />
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleCreateGroup}
                className="flex-1 bg-zinc-900 p-3 rounded-xl"
                activeOpacity={0.8}
              >
                <Text className="font-opensans-semibold text-white text-center">
                  Create
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowCreateGroup(false)}
                className="flex-1 bg-zinc-100 p-3 rounded-xl"
                activeOpacity={0.8}
              >
                <Text className="font-opensans-semibold text-zinc-700 text-center">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Join Group Form */}
        {showJoinGroup && (
          <View 
            className="bg-white p-6 rounded-2xl mb-6 border border-zinc-100"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text className="font-opensans-bold text-xl text-zinc-900 mb-4">
              Join Existing Group
            </Text>
            <TextInput
              className="border border-zinc-200 rounded-xl p-4 font-opensans text-base mb-4 bg-zinc-50"
              placeholder="Enter group code"
              value={groupCode}
              onChangeText={setGroupCode}
              autoCapitalize="characters"
              style={{ fontFamily: 'OpenSans-Regular' }}
            />
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleJoinGroup}
                className="flex-1 bg-zinc-700 p-3 rounded-xl"
                activeOpacity={0.8}
              >
                <Text className="font-opensans-semibold text-white text-center">
                  Join
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowJoinGroup(false)}
                className="flex-1 bg-zinc-100 p-3 rounded-xl"
                activeOpacity={0.8}
              >
                <Text className="font-opensans-semibold text-zinc-700 text-center">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* My Groups */}
        <View>
          <Text className="font-opensans-bold text-xl text-zinc-900 mb-4">
            My Groups
          </Text>
          
          {myGroups.length === 0 ? (
            <View 
              className="bg-white p-8 rounded-2xl border border-zinc-100 items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Ionicons name="people-outline" size={48} color="#a1a1aa" />
              <Text className="font-opensans-medium text-zinc-500 mt-4 text-center">
                You're not in any groups yet
              </Text>
              <Text className="font-opensans text-zinc-400 mt-2 text-center">
                Create or join a group to start tracking together
              </Text>
            </View>
          ) : (
            myGroups.map((group) => (
              <View
                key={group.id}
                className="bg-white p-6 rounded-2xl mb-4 border border-zinc-100"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="font-opensans-bold text-lg text-zinc-900">
                      {group.name}
                    </Text>
                    <Text className="font-opensans text-zinc-600 mt-1">
                      {group.members} member{group.members !== 1 ? 's' : ''}
                    </Text>
                  </View>
                  <View className="bg-zinc-100 px-3 py-2 rounded-lg">
                    <Text className="font-opensans-medium text-zinc-700 text-xs">
                      {group.code}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

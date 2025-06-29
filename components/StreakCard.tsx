import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface StreakCardProps {
  title: string;
  currentStreak: number;
  longestStreak?: number;
  icon?: string;
  color?: string;
}

export function StreakCard({ 
  title, 
  currentStreak, 
  longestStreak = 0, 
  icon = "🔥",
  color = "#f59e0b" 
}: StreakCardProps) {
  const [displayStreak, setDisplayStreak] = useState(0);

  useEffect(() => {
    // Animate streak counter
    if (currentStreak === 0) {
      setDisplayStreak(0);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayStreak(currentStreak);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentStreak]);

  return (
    <View 
      className="p-6 bg-white rounded-2xl border border-gray-100"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <View className="items-center">
        {/* Icon and streak number */}
        <View className="items-center mb-4">
          <Text className="text-4xl mb-2">{icon}</Text>
          <Text 
            className="font-opensans-bold text-3xl"
            style={{ color }}
          >
            {displayStreak}
          </Text>
          <Text className="font-opensans-medium text-gray-600">
            day{displayStreak !== 1 ? 's' : ''} streak
          </Text>
        </View>

        {/* Title */}
        <Text className="font-opensans-semibold text-lg text-gray-900 text-center mb-2">
          {title}
        </Text>

        {/* Longest streak */}
        {longestStreak > 0 && (
          <Text className="font-opensans text-sm text-gray-500">
            Best: {longestStreak} days
          </Text>
        )}
      </View>
    </View>
  );
}

import { View, Text } from "react-native";

type TagProps = { title: string };

const Tag = ({ title }: TagProps) => {
  return (
    <View className="flex-row bg-neutral-900 self-start rounded-xl py-1 px-2">
      <Text className="font-opensans-medium text-neutral-100 text-sm">
        {title}
      </Text>
    </View>
  );
};

export default Tag;

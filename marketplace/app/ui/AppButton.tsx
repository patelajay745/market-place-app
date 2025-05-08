import { cn } from "@/utils/cn";
import colors from "@/utils/colors";
import { FC } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

interface Props {
  title: string;
  active?: boolean;
  onPress?(): void;
}

const AppButton: FC<Props> = ({ title, active = true, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "p-5 rounded-2xl flex-1 justify-center bg-black items-center",
        active ? "bg-primary" : "bg-deActive"
      )}
    >
      <Text className="text-white tracking-normal font-bold">{title}</Text>
    </Pressable>
  );
};

export default AppButton;

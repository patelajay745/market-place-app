import { FC } from "react";
import { View, Pressable, Text } from "react-native";

interface Props {
  leftTitle: string;
  rightTitle: string;
  onLeftPress(): void;
  onRightPress(): void;
}

const FormNavigator: FC<Props> = ({
  leftTitle,
  rightTitle,
  onLeftPress,
  onRightPress,
}) => {
  return (
    <View className="w-full justify-between flex-1 flex-row">
      <Pressable onPress={onLeftPress}>
        <Text className="text-primary">{leftTitle}</Text>
      </Pressable>
      <Pressable onPress={onRightPress}>
        <Text className="text-primary">{rightTitle}</Text>
      </Pressable>
    </View>
  );
};

export default FormNavigator;

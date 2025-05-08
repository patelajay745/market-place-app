import { FC, ReactNode } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

interface Props {
  children: ReactNode;
}

const CustomKeyAvoidingView: FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <ScrollView>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyAvoidingView;

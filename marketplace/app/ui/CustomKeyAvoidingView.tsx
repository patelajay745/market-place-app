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
      style={styles.container}
      keyboardVerticalOffset={10}
    >
      <ScrollView>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CustomKeyAvoidingView;

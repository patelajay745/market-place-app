import { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import WelcomeHeader from "@/ui/WelcomeHeader";
import { useColorScheme } from "react-native";
import FormInput from "@/ui/FormInput";
import AppButton from "@/ui/AppButton";
import FormDivider from "@/ui/FormDivider";
import FormNavigator from "@/ui/FormNavigator";
import CustomKeyAvoidingView from "@/ui/CustomKeyAvoidingView";

interface Props {}

const colorScheme = useColorScheme();
const isDarkTheme = colorScheme === "dark";

const ForgetPassword: FC<Props> = (props) => {
  return (
    <CustomKeyAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader />
        <View style={styles.formContainer}>
          <FormInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppButton title="Request Link" />
          <FormDivider />
          <FormNavigator
            leftTitle="SignUp"
            rightTitle="SignIn"
            onLeftPress={() => {}}
            onRightPress={() => {}}
          />
        </View>
      </View>
    </CustomKeyAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 15,
    flex: 1,
  },

  formContainer: {
    marginTop: 30,
  },
});

export default ForgetPassword;

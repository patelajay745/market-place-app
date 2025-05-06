import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import ForgetPassword from "@/views/ForgetPassword";
import colors from "./utils/colors";

const Stack = createNativeStackNavigator();



function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <RootStack />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

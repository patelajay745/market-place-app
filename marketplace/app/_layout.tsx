import { Slot } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import colors from "./utils/colors";

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={MyTheme}>
      <Slot />
    </ThemeProvider>
  );
}

import { FC } from "react";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import colors from "@/utils/colors";
import { useTheme } from "@react-navigation/native";
import { cn } from "@/utils/cn";

interface Props {}

const heading = "Online marketPlace for Used Goods";
const subHeading =
  "Buy or sell used goods with trust. Chat directly with sellers, ensuring a seamless, authentic experince.";

const WelcomeHeader: FC<Props> = (props) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      className={cn(
        "flex-1 items-center",
        Platform.OS === "android" ? `pt-${StatusBar.currentHeight}` : 0
      )}
    >
      <Image
        source={require("../../assets/images/hero.png")}
        className="w-[250] h-[250]"
        resizeMode="contain"
        resizeMethod="resize"
      />
      <Text
        className={cn(
          "font-semibold text-2xl text-center tracking-normal mb-1",
          theme.dark ? "text-white" : "text-primary"
        )}
      >
        {heading}
      </Text>
      <Text className="text-secondaryText text-sm/4 text-center ">
        {subHeading}
      </Text>
    </SafeAreaView>
  );
};

export default WelcomeHeader;

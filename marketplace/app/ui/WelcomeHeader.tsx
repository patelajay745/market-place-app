import { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import colors from "@/utils/colors";
import { useTheme } from "@react-navigation/native";

interface Props {}

const heading = "Online marketPlace for Used Goods";
const subHeading =
  "Buy or sell used goods with trust. Chat directly with sellers, ensuring a seamless, authentic experince.";

const WelcomeHeader: FC<Props> = (props) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/hero.png")}
        style={styles.image}
        resizeMode="contain"
        resizeMethod="resize"
      />
      <Text
        style={[
          styles.heading,
          { color: theme.dark ? colors.white : colors.primary },
        ]}
      >
        {heading}
      </Text>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 14,
    color: colors.SecondaryText,
  },
  image: {
    width: 250,
    height: 250,
  },
});

export default WelcomeHeader;

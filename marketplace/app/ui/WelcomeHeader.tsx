import { Colors } from '@/constants/Colors'
import { FC } from 'react'
import { View, StyleSheet, Text, Image, SafeAreaView, Platform, StatusBar } from 'react-native'

interface Props { }

const heading = "Online marketPlace for Used Goods"
const subHeading = "Buy or sell used goods with trust. Chat directly with sellers, ensuring a seamless, authentic experince."

const WelcomeHeader: FC<Props> = (props) => {
    return <View style={styles.container}>
        <Image source={require("../../assets/images/hero.png")} style={styles.image} resizeMode='contain' resizeMethod='resize' />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    heading: {
        fontWeight: '600',
        fontSize: 20,
        textAlign: "center",
        letterSpacing: 1,
        marginBottom: 5,
        color: `${Colors.light.primary} dark:${Colors.dark.primary}`
    },
    subHeading: {
        fontSize: 12,
        textAlign: "center",
        lineHeight: 14,
        color: `${Colors.light.text} dark:${Colors.dark.text}`
    },
    image: {
        width: 250,
        height: 250
    }
})

export default WelcomeHeader
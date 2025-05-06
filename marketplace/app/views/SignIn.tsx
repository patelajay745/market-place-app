import { FC } from 'react'
import { View, StyleSheet, Text, Image, SafeAreaView, Platform, StatusBar, TextInput } from 'react-native'
import WelcomeHeader from '../ui/WelcomeHeader'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from 'react-native';
import FormInput from '../ui/FormInput';

interface Props { }

const colorScheme = useColorScheme();
const isDarkTheme = colorScheme === 'dark'

const SignIn: FC<Props> = (props) => {

    return (
        <View style={styles.container}>
            <WelcomeHeader />
            <View style={styles.formContainer}>
                <FormInput />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },

    formContainer: {
        marginTop: 30
    }
})

export default SignIn
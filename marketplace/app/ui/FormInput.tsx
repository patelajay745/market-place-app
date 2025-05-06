import { Colors } from '@/constants/Colors';
import { FC } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { useColorScheme } from 'react-native';

interface Props { }

const colorScheme = useColorScheme();
const isDarkTheme = colorScheme === 'dark'

const FormInput: FC<Props> = (props) => {
    return <TextInput value='' style={styles.input} placeholder='Email' placeholderTextColor={isDarkTheme ? Colors.dark.primary : Colors.light.primary}></TextInput>
}

const styles = StyleSheet.create({
    container: {},
    input: {
        width: "100%",
        padding: 8,
        borderRadius: 5,
        marginBottom: 15,
        color: isDarkTheme ? Colors.dark.primary : Colors.light.primary,
        borderWidth: 1
    },
})

export default FormInput
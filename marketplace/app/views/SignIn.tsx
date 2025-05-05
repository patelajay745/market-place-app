import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'

interface Props { }

const SignIn: FC<Props> = (props) => {
    return <View style={styles.container}>
        <Text >SignIn</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {

    }
})

export default SignIn
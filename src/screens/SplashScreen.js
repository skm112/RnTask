import { StyleSheet, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Text, useTheme } from 'react-native-paper'
import { useNavigation, StackActions } from '@react-navigation/native';
import { simplePrompt } from '../helpers/biometric';
import { useSelector } from 'react-redux';

const SplashScreen = () => {
    const { colors } = useTheme()
    const styles = SplashStyle(colors)
    const navigation = useNavigation();
    const auth = useSelector(s => s.auth)
    useEffect(() => {
        const getData = async () => {
            if (auth?.signature) {
                const success = await simplePrompt()
                if (success) {
                    console.log({ success })
                    setTimeout(() => {
                        navigation?.dispatch(StackActions.replace("HomeScreen"))
                    }, 500);
                }


            } else {
                setTimeout(() => {
                    navigation?.dispatch(StackActions.replace("LoginScreen"))
                }, 500);
            }
        }
        getData();
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar animated={true} barStyle="default" backgroundColor={colors.primary} />
            <Text style={styles.text}>Welcome To React-Native Task</Text>
        </View>
    )
}

export default SplashScreen

const SplashStyle = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: 30
    },
    text: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.background,
        textAlign: 'center'

    }
})
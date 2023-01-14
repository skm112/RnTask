import { StyleSheet, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Text, useTheme } from 'react-native-paper'
import { useNavigation, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { simplePrompt } from '../helpers/biometric';

const SplashScreen = () => {
    const { colors } = useTheme()
    const styles = SplashStyle(colors)
    const navigation = useNavigation();
    useEffect(() => {

        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('auth')
                if (value !== null) {
                    console.log({ value })
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
            } catch (e) {
                // error reading value
            }
        }
        getData();
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar animated={true} barStyle="default" backgroundColor={colors.primary}/>
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
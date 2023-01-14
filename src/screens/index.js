import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SplashScreen from './SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const [ authValues, setAuthValues ] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('auth')
                if (value !== null) {
                    console.log(value)
                    setAuthValues(value)
                }
            } catch (e) {
                // error reading value
            }
        }
        getData()
    }, [])







    return (<>
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false, orientation: 'portrait_up' }}>
            <>
                {
                    authValues ?
                        <>
                            <Stack.Screen name='SplashScreen' component={SplashScreen} />

                            <Stack.Screen name="HomeScreen" component={HomeScreen} />

                        </>
                        :
                        <>
                            <Stack.Screen name='SplashScreen' component={SplashScreen} />

                            <Stack.Screen name="LoginScreen" component={LoginScreen} />

                        </>
                }
            </>
        </Stack.Navigator>
    </>
    )
}

export default RootStack
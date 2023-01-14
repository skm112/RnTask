import React, { useState, useEffect } from 'react';
import { Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SplashScreen from './SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const auth = useSelector(s => s.auth)


    return (<>
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false, orientation: 'portrait_up' }}>
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <>
                {
                    auth?.signature ?

                        <Stack.Screen name="HomeScreen" component={HomeScreen} />

                        :

                        <Stack.Screen name="LoginScreen" component={LoginScreen} />

                }
            </>
        </Stack.Navigator>
    </>
    )
}

export default RootStack
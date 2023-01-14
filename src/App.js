import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const App = () => {
    return (
        <Provider >
            <SafeAreaProvider >
                <NavigationContainer>
                    <RootStack />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
};



export default App;
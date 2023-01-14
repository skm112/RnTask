import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './screens';
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <SafeAreaProvider >
                        <NavigationContainer>
                            <RootStack />
                        </NavigationContainer>
                    </SafeAreaProvider>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};



export default App;
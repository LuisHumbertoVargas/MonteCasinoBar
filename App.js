import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/public/Login';
import Home from './src/screens/private/Home';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
    useEffect(() => {
        // indicamos los tipos de warnings que queremos dejar de ver

        // TODOS
        // LogBox.ignoreAllLogs();

        // Solo algunos warnings
        LogBox.ignoreLogs([
            'Animated: `useNativeDriver`',
            'Setting a timer for a long period of time',
            'AsyncStorage has been extracted from react-native core',
        ]);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name='Home'
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

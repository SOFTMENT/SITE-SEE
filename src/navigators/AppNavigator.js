import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import UserLogin from '../screens/UserLogin';
import UserRegister from '../screens/UserRegister';
import UserSelectScreen from '../screens/UserSelectScreen';
import WebViewScreen from '../screens/WebViewScreen';
import { navigationRef } from './RootNavigation';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  
    return (
        <NavigationContainer
            ref={navigationRef}
        >
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name='UserSelectScreen' component={UserSelectScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='UserLogin' component={UserLogin} />
                <Stack.Screen name='UserRegister' component={UserRegister} />
                <Stack.Screen name='WebViewScreen' component={WebViewScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator
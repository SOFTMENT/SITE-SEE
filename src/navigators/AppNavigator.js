import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import UserLogin from '../screens/UserLogin';
import UserRegister from '../screens/UserRegister';
import UserOnBoard from '../screens/UserScreens/UserOnBoard';
import UserOnBoardSecond from '../screens/UserScreens/UserOnBoardSecond';
import UserOnBoardThird from '../screens/UserScreens/UserOnBoardThird';
import UserSelectScreen from '../screens/UserSelectScreen';
import WebViewScreen from '../screens/WebViewScreen';
import { navigationRef } from './RootNavigation';
import UserBottomTab from './UserBottomTab';
const Stack = createNativeStackNavigator();
const UserOnBoardStack = createNativeStackNavigator()
const MyUserOnBoardStack = () => {
    return(
        <UserOnBoardStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <UserOnBoardStack.Screen name='UserOnBoard' component={UserOnBoard}/>
            <UserOnBoardStack.Screen name='UserOnBoardSecond' component={UserOnBoardSecond}/>
            <UserOnBoardStack.Screen name='UserOnBoardThird' component={UserOnBoardThird}/>
        </UserOnBoardStack.Navigator>
    )
}
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
                <Stack.Screen name='MyUserOnBoardStack' component={MyUserOnBoardStack}/>
                <Stack.Screen name='UserBottomTab' component={UserBottomTab}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator
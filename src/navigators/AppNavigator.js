import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AdminScreen from '../screens/AdminScreen';
import HomeScreen from '../screens/HomeScreen';
import ProOnBoard from '../screens/ProScreens/ProOnBoard';
import ProOnBoardFourth from '../screens/ProScreens/ProOnBoardFourth';
import ProOnBoardPhoto from '../screens/ProScreens/ProOnBoardPhoto';
import ProOnBoardSecond from '../screens/ProScreens/ProOnBoardSecond';
import ProOnBoardThird from '../screens/ProScreens/ProOnBoardThird';
import SplashScreen from '../screens/SplashScreen';
import UserLogin from '../screens/UserLogin';
import UserRegister from '../screens/UserRegister';
import UserOnBoard from '../screens/UserScreens/UserOnBoard';
import UserOnBoardPhoto from '../screens/UserScreens/UserOnBoardPhoto';
import UserOnBoardSecond from '../screens/UserScreens/UserOnBoardSecond';
import UserOnBoardThird from '../screens/UserScreens/UserOnBoardThird';
import UserSelectScreen from '../screens/UserSelectScreen';
import WebViewScreen from '../screens/WebViewScreen';
import ProBottomTab from './ProBottomTab';
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
            <UserOnBoardStack.Screen name='UserOnBoardPhoto' component={UserOnBoardPhoto}/>
            <UserOnBoardStack.Screen name='UserOnBoard' component={UserOnBoard}/>
            <UserOnBoardStack.Screen name='UserOnBoardSecond' component={UserOnBoardSecond}/>
            <UserOnBoardStack.Screen name='UserOnBoardThird' component={UserOnBoardThird}/>
        </UserOnBoardStack.Navigator>
    )
}
const ProOnBoardStack = createNativeStackNavigator()
const MyProOnBoardStack = () => {
    return(
        <ProOnBoardStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <UserOnBoardStack.Screen name='ProOnBoardPhoto' component={ProOnBoardPhoto}/>
            <ProOnBoardStack.Screen name='ProOnBoard' component={ProOnBoard}/>
            <ProOnBoardStack.Screen name='ProOnBoardSecond' component={ProOnBoardSecond}/>
            <ProOnBoardStack.Screen name='ProOnBoardThird' component={ProOnBoardThird}/>
            <ProOnBoardStack.Screen name='ProOnBoardFourth' component={ProOnBoardFourth}/>
        </ProOnBoardStack.Navigator>
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
                <Stack.Screen name='AdminScreen' component={AdminScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='UserLogin' component={UserLogin} />
                <Stack.Screen name='UserRegister' component={UserRegister} />
                <Stack.Screen name='WebViewScreen' component={WebViewScreen} />
                <Stack.Screen name='MyUserOnBoardStack' component={MyUserOnBoardStack}/>
                <Stack.Screen name='MyProOnBoardStack' component={MyProOnBoardStack}/>
                <Stack.Screen name='UserBottomTab' component={UserBottomTab}/>
                <Stack.Screen name='ProBottomTab' component={ProBottomTab}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator
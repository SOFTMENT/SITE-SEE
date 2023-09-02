import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AdvertiserOnBoardPhoto from '../screens/AdvertiserScreens/AdvertiserOnBoardPhoto';
// import AdminScreen from '../screens/AdminScreen';
// import HomeScreen from '../screens/HomeScreen';
// import ProOnBoard from '../screens/ProScreens/ProOnBoard';
// import ProOnBoardFourth from '../screens/ProScreens/ProOnBoardFourth';
// import ProOnBoardPhoto from '../screens/ProScreens/ProOnBoardPhoto';
// import ProOnBoardSecond from '../screens/ProScreens/ProOnBoardSecond';
// import ProOnBoardThird from '../screens/ProScreens/ProOnBoardThird';
// import SplashScreen from '../screens/SplashScreen';
// import UserLogin from '../screens/UserLogin';
// import UserRegister from '../screens/UserRegister';
// import UserOnBoard from '../screens/UserScreens/UserOnBoard';
// import UserOnBoardPhoto from '../screens/UserScreens/UserOnBoardPhoto';  
// import UserOnBoardSecond from '../screens/UserScreens/UserOnBoardSecond';
// import UserOnBoardThird from '../screens/UserScreens/UserOnBoardThird'; 
// import UserSelectScreen from '../screens/UserSelectScreen';
// import WebViewScreen from '../screens/WebViewScreen';
// import ProBottomTab from './ProBottomTab';
import HomeScreen from '../screens/HomeScreen';
import LogOrRegister from '../screens/LogOrRegister';
import OnboardingScreen from '../screens/OnboradingScreens/OnboardingScreen';

import BuyMembership from '../screens/ServiceProviderScreens/BuyMembership';
import ServiceHome from '../screens/ServiceProviderScreens/ServiceHome';
import ServiceOnBoard from '../screens/ServiceProviderScreens/ServiceOnBoard';
import ServiceOnBoardPhoto from '../screens/ServiceProviderScreens/ServiceOnBoardPhoto';
import ServiceProfile from '../screens/ServiceProviderScreens/ServiceProfile';
import SplashScreen from '../screens/SplashScreen';
import UserLogin from '../screens/UserLogin';
import UserRegister from '../screens/UserRegister';
import UserSelectScreen from '../screens/UserSelectScreen';
import VendorOnBoardPhoto from '../screens/VendorScreens/VendorOnBoardPhoto';
import AdvertiserBottomTab from './AdvertiserBottomTab';
import { navigationRef } from './RootNavigation';
import VendorBottomTab from './VendorBottomTab';

const Stack = createNativeStackNavigator();
const ServiceStack = createNativeStackNavigator()
const MyServiceStack = () => {
    return(
        <ServiceStack.Navigator
            //initialRouteName='ServiceOnBoard'
            screenOptions={{
                headerShown:false,
            }}
        >
            <ServiceStack.Screen name='ServiceHome' component={ServiceHome}/>
            <ServiceStack.Screen name='BuyMembership' component={BuyMembership}/>
            <ServiceStack.Screen name='ServiceProfile' component={ServiceProfile}/>
            {/* <ServiceStack.Screen name='ServiceOnBoard' component={ServiceOnBoard}/> */}
        </ServiceStack.Navigator>
    )
}
const ServiceOnBoardStack = createNativeStackNavigator()
const MyServiceOnBoardStack = () => {
    return(
        <ServiceOnBoardStack.Navigator
            initialRouteName='ServiceOnBoard'
            screenOptions={{
                headerShown:false,
            }}
        >
            <ServiceOnBoardStack.Screen name='ServiceOnBoardPhoto' component={ServiceOnBoardPhoto}/>
            <ServiceOnBoardStack.Screen name='ServiceOnBoard' component={ServiceOnBoard}/>
        </ServiceOnBoardStack.Navigator>
    )
}
const AdvertiserOnBoardStack = createNativeStackNavigator()
const MyAdvertiserOnBoardStack = () => {
    return(
        <AdvertiserOnBoardStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <AdvertiserOnBoardStack.Screen name='AdvertiserOnBoardPhoto' component={AdvertiserOnBoardPhoto}/>
        </AdvertiserOnBoardStack.Navigator>
    )
}
const VendorOnBoardStack = createNativeStackNavigator()
const MyVendorOnBoardStack = () => {
    return(
        <VendorOnBoardStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <VendorOnBoardStack.Screen name='VendorOnBoardPhoto' component={VendorOnBoardPhoto}/>
        </VendorOnBoardStack.Navigator>
    )
}
const AppNavigator = () => {
    return (
        <NavigationContainer
            ref={navigationRef}
        >
            <Stack.Navigator initialRouteName="SplashScreen"
                screenOptions={{
                    headerShown: false,
            }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
                <Stack.Screen name='LogOrRegister' component={LogOrRegister} />
                <Stack.Screen name='UserSelectScreen' component={UserSelectScreen} />
                <Stack.Screen name='LoginScreen' component={UserLogin} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='AdvertiserBottomTab' component={AdvertiserBottomTab}/>
                <Stack.Screen name='VendorBottomTab' component={VendorBottomTab}/>
                <Stack.Screen name='SignUpScreen' component={UserRegister}/>
                <Stack.Screen name='MyVendorOnBoardStack' component={MyVendorOnBoardStack}/>
                <Stack.Screen name='MyAdvertiserOnBoardStack' component={MyAdvertiserOnBoardStack}/>
                <Stack.Screen name='MyServiceProviderOnBoardStack' component={MyServiceOnBoardStack}/>
                <Stack.Screen name='ServiceHomeStack' component={MyServiceStack}/>
                {/* <Stack.Screen name='UserSelectScreen' component={UserSelectScreen} />
                <Stack.Screen name='AdminScreen' component={AdminScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='UserLogin' component={UserLogin} />
                <Stack.Screen name='UserRegister' component={UserRegister} />
                <Stack.Screen name='WebViewScreen' component={WebViewScreen} />
                <Stack.Screen name='MyUserOnBoardStack' component={MyUserOnBoardStack}/>
                <Stack.Screen name='MyProOnBoardStack' component={MyProOnBoardStack}/>
                <Stack.Screen name='UserBottomTab' component={UserBottomTab}/>
                <Stack.Screen name='ProBottomTab' component={ProBottomTab}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator
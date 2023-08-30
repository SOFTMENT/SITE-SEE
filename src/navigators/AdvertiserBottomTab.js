import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import fonts from '../../assets/fonts';
import { fontSizes } from '../common/variables';
import AdvertiserDetail from '../screens/AdvertiserScreens/AdvertiserDetail';
import AdvertiserHome from '../screens/AdvertiserScreens/AdvertiserHome';
import AdvertiserOrderDetails from '../screens/AdvertiserScreens/AdvertiserOrderDetails';
import AdvertiserOrders from '../screens/AdvertiserScreens/AdvertiserOrders';
import AdvertiserProfile from '../screens/AdvertiserScreens/AdvertiserProfile';
import CategoryScreen from '../screens/AdvertiserScreens/CartegoryScreen';
import ServiceProviderProfiles from '../screens/AdvertiserScreens/ServiceProviderProfiles';
import FavoritesScreen from '../screens/AdvertiserScreens/FavoritesScreen';
import PaymentScreen from '../screens/AdvertiserScreens/PaymentScreen';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import SearchScreen from '../screens/SearchScreen';
import colors from '../theme/colors';
const Tab = createBottomTabNavigator();
const AdHomeStack = createNativeStackNavigator()
const AdOrderStack = createNativeStackNavigator()
const InboxStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const MyProfileStack = () => {
    return(
        <ProfileStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <ProfileStack.Screen name='ProfileScreen' component={AdvertiserProfile}/>
            
        </ProfileStack.Navigator>
    )
}
const MyInboxStack = () => {
    return(
        <InboxStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <InboxStack.Screen name='Inbox' component={Inbox}/>
            <InboxStack.Screen name='PersonalChat' component={Chat}/>
        </InboxStack.Navigator>
    )
}
const MyAdHomeStack = () => {
    return(
        <AdHomeStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <AdHomeStack.Screen name='AdHome' component={AdvertiserHome}/>
            <AdHomeStack.Screen name='AdDetail' component={AdvertiserDetail}/>
            <AdHomeStack.Screen name='CategoryScreen' component={CategoryScreen}/>
            <AdHomeStack.Screen name='PaymentScreen' component={PaymentScreen}/>
            <AdHomeStack.Screen name='SearchScreen' component={SearchScreen}/>
            <AdHomeStack.Screen name='FavoritesScreen' component={FavoritesScreen}/>
            <AdHomeStack.Screen name='ServiceProviderProfiles' component={ServiceProviderProfiles}/>
        </AdHomeStack.Navigator>
    )
}
const MyAdOrderStack = () => {
    return(
        <AdOrderStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <AdOrderStack.Screen name='AdOrder' component={AdvertiserOrders}/>
            <AdOrderStack.Screen name='PersonalChat' component={Chat}/>
            <AdOrderStack.Screen name='AdvertiserOrderDetails' component={AdvertiserOrderDetails}/>
        </AdOrderStack.Navigator>
    )
}
function AdvertiserBottomTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                //tabBarHideOnKeyboard:true,
                headerShown: false,
                //tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopWidth: 0,
                    paddingBottom:Platform.OS == 'android' ? 7:15,
                    height:Platform.OS =="android"?60:70,
                    shadowOffset: {
                        width: 20,
                        height: 20,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,
                    elevation: 24,
                },
                tabBarIconStyle : {
                    
                },
                tabBarLabelStyle : {
                    fontFamily:fonts.bold,
                    fontSize:fontSizes.extraExtraSmall
                },
                tabBarActiveTintColor: colors.btnColor,
                tabBarInactiveTintColor: "#505050"
            }}
        >
            <Tab.Screen name="Home" component={MyAdHomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                as={Ionicons}
                                name='home-outline'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }}
            />

            <Tab.Screen name="Orders" component={MyAdOrderStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                as={MaterialCommunityIcons}
                                name='clipboard-text-outline'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen name="Chats" component={MyInboxStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                as={MaterialCommunityIcons}
                                name='message-outline'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen name="Setting" component={MyProfileStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                as={MaterialCommunityIcons}
                                name='cog-outline'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    );
}
export default AdvertiserBottomTab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHome from '../screens/UserScreens/UserHome';
import UserNotifications from '../screens/UserScreens/UserNotifications';
import UserProfile from '../screens/UserScreens/UserProfile';
import React from 'react';
import { Icon } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from 'react-native';
import HomeSvg from '../components/SvgIcons/HomeSvg';
const Tab = createBottomTabNavigator();

function UserBottomTab() {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle:{
                backgroundColor:"black",
                borderTopWidth:0
            },
            tabBarActiveTintColor:"white",
            tabBarInactiveTintColor:"#505050"
        }}
    >
      <Tab.Screen name="UserHome" component={UserHome} 
        options={{
            tabBarIcon:({color,size})=>{
                return (
                    <HomeSvg
                        color={color}
                        size={size}
                    />
                )
            }
        }}
      />
      <Tab.Screen name="UserNotifications" component={UserNotifications} 
         options={{
            tabBarBadge:0,
            tabBarIcon:({color,size})=>{
                return (
                    <Icon
                        as={Ionicons}
                        name='notifications'
                        color={color}
                        size={size}
                    />
                )
            }
        }}
      />
      <Tab.Screen name="UserProfile" component={UserProfile} 
         options={{
            tabBarIcon:({color,size})=>{
                return (
                    <Icon
                        as={Ionicons}
                        name='person'
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
export default UserBottomTab
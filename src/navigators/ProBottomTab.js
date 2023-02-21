import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeSvg from '../components/SvgIcons/HomeSvg';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import ProHome from '../screens/ProScreens/ProHome';
import ProNotifications from '../screens/ProScreens/ProNotifications';
import ProProfile from '../screens/ProScreens/ProProfile';
const Tab = createBottomTabNavigator();


function ProBottomTab() {
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
      <Tab.Screen name="ProHome" component={ProHome} 
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
      <Tab.Screen name="ProNotifications" component={ProNotifications} 
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
       <Tab.Screen name="InboxScreen" component={Inbox} 
         options={{
            tabBarIcon:({color,size})=>{
                return (
                    <Icon
                        as={Ionicons}
                        name='chatbox'
                        color={color}
                        size={size}
                    />
                )
            }
        }}
      />
      <Tab.Screen name="ProProfile" component={ProProfile} 
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
       <Tab.Screen name="ChatScreen" component={Chat} 
         options={{
            tabBarStyle:{display:"none"},
            tabBarButton:()=>null
        }}
      />
    </Tab.Navigator>
  );
}
export default ProBottomTab
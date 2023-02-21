import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'native-base';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeSvg from '../components/SvgIcons/HomeSvg';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import AppointmentScreen from '../screens/UserScreens/AppointmentScreen';
import MapViewScreen from '../screens/UserScreens/MapViewScreen';
import TrainerScreen from '../screens/UserScreens/TrainerScreen';
import UserHome from '../screens/UserScreens/UserHome';
import UserNotifications from '../screens/UserScreens/UserNotifications';
import UserProfile from '../screens/UserScreens/UserProfile';
import VideoPlayer from '../screens/VideoPlayer';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import EditUserPorfile from '../screens/UserScreens/EditUserPorfile';
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator()
const UserHomeStack = createNativeStackNavigator()
const MyProfileHomeStack = () => {
    return(
        <ProfileStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <ProfileStack.Screen name='Profile' component={UserProfile}/>
            <ProfileStack.Screen name='EditUserProfile' component={EditUserPorfile}/>
        </ProfileStack.Navigator>
    )
}
const MyUserHomeStack = () => {
    return(
        <UserHomeStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <UserHomeStack.Screen name='UserHome' component={UserHome}/>
            <UserHomeStack.Screen name='TrainerProfile' component={TrainerScreen}/>
            <UserHomeStack.Screen name='VideoPlayer' component={VideoPlayer}/>
            <UserHomeStack.Screen name='AppointmentScreen' component={AppointmentScreen}/>
        </UserHomeStack.Navigator>
    )
}
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
      <Tab.Screen name="UserHomeStack" component={MyUserHomeStack} 
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
       <Tab.Screen name="MapViewScreen" component={MapViewScreen} 
         options={{
            tabBarIcon:({color,size})=>{
                return (
                    <Icon
                        as={Ionicons}
                        name='map'
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
       <Tab.Screen name="UserInbox" component={Inbox} 
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
      <Tab.Screen name="UserProfile" component={MyProfileHomeStack} 
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
export default UserBottomTab
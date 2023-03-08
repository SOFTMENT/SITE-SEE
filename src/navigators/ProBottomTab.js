import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'native-base';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeSvg from '../components/SvgIcons/HomeSvg';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import EditProProfile from '../screens/ProScreens/EditProProfile';
import ProBookings from '../screens/ProScreens/ProBookings';
import ProHome from '../screens/ProScreens/ProHome';
import ProNotifications from '../screens/ProScreens/ProNotifications';
import ProProfile from '../screens/ProScreens/ProProfile';
import ProVideoUpload from '../screens/ProScreens/ProVideoUpload';
import VideoPlayer from '../screens/VideoPlayer';
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
//const BookingStack = createNativeStackNavigator()
const MyProfileHomeStack = () => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <ProfileStack.Screen name='Profile' component={ProProfile} />
            <ProfileStack.Screen name='EditProProfile' component={EditProProfile} />
        </ProfileStack.Navigator>
    )
}
const MyProHomeStack = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStack.Screen name='ProHome' component={ProHome} />
            <HomeStack.Screen name='ProVideoPlayer' component={VideoPlayer} />
            <HomeStack.Screen name='ProVideoUpload' component={ProVideoUpload} />
        </HomeStack.Navigator>
    )
}
// const MyBookingStack = () => {
//     return (
//         <BookingStack.Navigator
//             screenOptions={{
//                 headerShown: false
//             }}
//         >
//             <BookingStack.Screen name='ProBooking' component={UserBookings} />

//         </BookingStack.Navigator>
//     )
// }
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
      <Tab.Screen name="ProHomeStack" component={MyProHomeStack} 
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
      <Tab.Screen name="ProBookings" component={ProBookings} 
         options={{
            tabBarIcon:({color,size})=>{
                return (
                    <Icon
                        as={Ionicons}
                        name='cart'
                        color={color}
                        size={30}
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
      <Tab.Screen name="ProProfile" component={MyProfileHomeStack} 
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
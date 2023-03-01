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
import ReviewScreen from '../screens/UserScreens/ReviewScreen';
import UserBookings from '../screens/UserScreens/UserBookings';
import WriteReview from '../screens/UserScreens/WriteReview';
const Tab = createBottomTabNavigator();
const MapStackProfileStack = createNativeStackNavigator()
const UserHomeStack = createNativeStackNavigator()
const ChatStack = createNativeStackNavigator()
const MapStack = createNativeStackNavigator()
const BookingStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const MyProfileHomeStack = () => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <ProfileStack.Screen name='Profile' component={UserProfile} />
            <ProfileStack.Screen name='EditUserProfile' component={EditUserPorfile} />
        </ProfileStack.Navigator>
    )
}
const MyMapStack = () => {
    return (
        <MapStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <MapStack.Screen name='MapViewScreen' component={MapViewScreen} />
            <MapStack.Screen name='ReviewScreen' component={ReviewScreen} />
            {/* <MapStack.Screen name='WriteReview' component={WriteReview} /> */}
        </MapStack.Navigator>
    )
}
const MyBookingStack = () => {
    return (
        <BookingStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <BookingStack.Screen name='UserBookings' component={UserBookings} />
            <BookingStack.Screen name='WriteReview' component={WriteReview} />
            {/* <MapStack.Screen name='WriteReview' component={WriteReview} /> */}
        </BookingStack.Navigator>
    )
}
const MyUserHomeStack = () => {
    return (
        <UserHomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <UserHomeStack.Screen name='UserHome' component={UserHome} />
            <UserHomeStack.Screen name='TrainerProfile' component={TrainerScreen} />
            <UserHomeStack.Screen name='VideoPlayer' component={VideoPlayer} />
            <UserHomeStack.Screen name='AppointmentScreen' component={AppointmentScreen} />
            <UserHomeStack.Screen name='ChatScreen' component={Chat} />
            <UserHomeStack.Screen name='ReviewScreen' component={ReviewScreen} />
            <UserHomeStack.Screen name='WriteReview' component={WriteReview} />
        </UserHomeStack.Navigator>
    )
}
const MyChatStack = () => {
    return (
        <ChatStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <ChatStack.Screen name='inbox' component={Inbox} />
            <ChatStack.Screen name='ChatScreen' component={Chat} />
        </ChatStack.Navigator>
    )
}
function UserBottomTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopWidth: 0
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#505050"
            }}
        >
            <Tab.Screen name="UserHomeStack" component={MyUserHomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <HomeSvg
                                color={color}
                                size={size}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen name="MyMapStack" component={MyMapStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
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
            <Tab.Screen name="UserBookingStack" component={MyBookingStack}
                options={{
                    //tabBarBadge: 0,
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                as={Ionicons}
                                name='cart'
                                color={color}
                                size={8}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen name="UserInbox" component={MyChatStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
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
                    tabBarIcon: ({ color, size }) => {
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
            {/* <Tab.Screen name="ReviewScreen" component={ReviewScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                as={Ionicons}
                                name='star'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }}
            /> */}
        </Tab.Navigator>
    );
}
export default UserBottomTab
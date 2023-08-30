import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card, Icon, View } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import fonts from '../../assets/fonts';
import { fontSizes } from '../common/variables';
import Chat from '../screens/Chat';
import ComingSoon from '../screens/ComingSoon';
import Inbox from '../screens/Inbox';
import AccountDetailsScreen from '../screens/VendorScreens/AccountDetailsScreen';
import AddSpace from '../screens/VendorScreens/AddSpace';
import EditSpace from '../screens/VendorScreens/EditSpace';
import VendorHome from '../screens/VendorScreens/VendorHome';
import VendorOrderDetails from '../screens/VendorScreens/VendorOrderDetails';
import VendorOrders from '../screens/VendorScreens/VendorOrders';
import VendorProfile from '../screens/VendorScreens/VendorProfile';
import VendorSpaces from '../screens/VendorScreens/VendorSpaces';
import colors from '../theme/colors';
const Tab = createBottomTabNavigator();
const VendorSpacesStack = createNativeStackNavigator()
const InboxStack = createNativeStackNavigator()
const VendorHomeStack = createNativeStackNavigator()
const VendorOrderStack = createNativeStackNavigator()
const VendorProfileStack = createNativeStackNavigator()
const MyVendorProfileStack = () => {
    return(
        <VendorProfileStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <VendorProfileStack.Screen name='VendorProfile' component={VendorProfile}/>
            <VendorProfileStack.Screen name='VendorAccountDetail' component={AccountDetailsScreen}/>
        </VendorProfileStack.Navigator>
    )
}
const MyVendorOrderStack = () => {
    return(
        <VendorOrderStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <VendorOrderStack.Screen name='VendorOrders' component={VendorOrders}/>
            <VendorOrderStack.Screen name='PersonalChat' component={Chat}/>
            <VendorOrderStack.Screen name='VendorOrderDetails' component={VendorOrderDetails}/>
        </VendorOrderStack.Navigator>
    )
}
const MyVendorHomeStack = () => {
    return(
        <VendorHomeStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <VendorHomeStack.Screen name='HomeScreen' component={VendorHome}/>
            <VendorHomeStack.Screen name='PersonalChat' component={Chat}/>
            <VendorHomeStack.Screen name='VendorOrderDetails' component={VendorOrderDetails}/>
        </VendorHomeStack.Navigator>
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
const MyVendorSpacesStack = () => {
    return(
        <VendorSpacesStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <VendorSpacesStack.Screen name='VendorSpaces' component={VendorSpaces}/>
            <VendorSpacesStack.Screen name='AddSpace' component={AddSpace}/>
            <VendorSpacesStack.Screen name='EditSpace' component={EditSpace}/>
        </VendorSpacesStack.Navigator>
    )
}
function VendorBottomTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                //tabBarHideOnKeyboard:true,
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
            <Tab.Screen name="Home" component={MyVendorHomeStack}
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

            <Tab.Screen name="Orders" component={MyVendorOrderStack}
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
             <Tab.Screen name="spaces" component={MyVendorSpacesStack}
                options={{
                    //tabBarShowLabel:false,
                    title:"",
                    tabBarIcon: ({ color, size }) => {
                        return (
                           <Card style={{
                            position:'absolute',
                            bottom:0,
                            backgroundColor:colors.appPrimary,
                            //padding:5,
                            padding:0,
                            borderRadius:40,
                            borderWidth:1,
                            borderColor:colors.appPrimary
                            //levation:10
                           }}>
                             <Icon
                                as={MaterialCommunityIcons}
                                name='plus-circle-outline'
                                color={"white"}
                                size={"2xl"}
                            />
                           </Card>
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
            <Tab.Screen name="Setting" component={MyVendorProfileStack}
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
export default VendorBottomTab
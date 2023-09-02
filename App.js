import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StripeProvider } from '@stripe/stripe-react-native';
import { extendTheme, NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AppRoot from './src';
import { store } from './src/store';
GoogleSignin.configure({
  iosClientId: "189973700039-ldji7p1rfc5ma85dkjv578kbeeflqd5k.apps.googleusercontent.com",
  webClientId:"189973700039-tkmshnrff53aol5ij7qqj66pmq0l7m8b.apps.googleusercontent.com"
  // scopes:[
  //     `https://www.googleapis.com/auth/drive.readonly`,
  //     `https://www.googleapis.com/auth/youtube`,
  //     `https://www.googleapis.com/auth/youtube.upload`,
  //     `https://www.googleapis.com/auth/plus.login`
  //     ],
});
const App = () => {
  useEffect(() => {
    messaging().onMessage(onMessageReceived);
  }, [])
  async function onMessageReceived(message) {
    await notifee.requestPermission()
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    console.log(message)
    // Display a notification
    await notifee.displayNotification({
      title: message.notification?.title ?? "Hey",
      body: message.notification?.body ?? "We Hope You like the App",
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  const theme = extendTheme({
    fontConfig: {
      Mulish: {
        100: {
          normal: "Montserrat-Light",
          //italic: "Roboto-LightItalic",
        },
        200: {
          normal: "Montserrat-Light",
          //italic: "Roboto-LightItalic",
        },
        300: {
          normal: "Montserrat-Regular",
          //italic: "Roboto-LightItalic",
        },
        400: {
          normal: "Montserrat-Regular",
          //italic: "Roboto-Italic",
        },
        500: {
          normal: "Montserrat-Medium"
        },
        600: {
          normal: "Montserrat-Medium"
        },
        700: {
          normal: 'Montserrat-SemiBold',
        },
        800: {
          normal: 'Montserrat-SemiBold',
        },
        900: {
          normal: "Montserrat-Bold"
        },
        1000: {
          normal: "Montserrat-Bold"
        }
      },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: "Montserrat",
      body: "Montserrat",
      mono: "Montserrat",
    },
  });
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <StripeProvider
        publishableKey={""}
    // merchantIdentifier="merchant.identifier" // required for Apple Pay
    //urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
        
            <Provider store={store}>
            
                <NativeBaseProvider theme={theme}>
                
                <AppRoot />
               
                </NativeBaseProvider>
                
            </Provider>
            
    </StripeProvider >
   </GestureHandlerRootView>
  )
}
export default App
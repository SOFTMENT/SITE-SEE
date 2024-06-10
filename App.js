import notifee from '@notifee/react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StripeProvider } from '@stripe/stripe-react-native';
import { extendTheme, NativeBaseProvider, View } from 'native-base';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import fonts from './assets/fonts';
import AppRoot from './src';
import { store } from './src/store';
GoogleSignin.configure({
  iosClientId: "236456769546-hbphvbuod79njv10uba6ocf62gc01gj2.apps.googleusercontent.com",
  webClientId:"236456769546-6kto9osph04hr0mjr3i2jf07h7rpjkjp.apps.googleusercontent.com"
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
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, [])
  async function onMessageReceived(message) {
    await notifee.requestPermission()
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    // console.log(message.data.uid+"====",auth().currentUser.uid)
    if(auth().currentUser.uid && auth().currentUser.uid==message.data.uid){
      // Display a notification
      await notifee.displayNotification({
        title: message.data?.title ?? "Hey",
        body: message.data?.body ?? "We Hope You like the App",
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
    
  }
  const theme = extendTheme({
    fontConfig: {
      Mulish: {
        100: {
          normal: fonts.light
          //italic: "Roboto-LightItalic",
        },
        200: {
          normal: fonts.light
          //italic: "Roboto-LightItalic",
        },
        300: {
          normal: fonts.regular,
          //italic: "Roboto-LightItalic",
        },
        400: {
          normal: fonts.regular,
          //italic: "Roboto-Italic",
        },
        500: {
          normal: fonts.medium
        },
        600: {
          normal: fonts.medium
        },
        700: {
          normal: fonts.medium
        },
        800: {
          normal: fonts.medium
        },
        900: {
          normal: fonts.bold,
        },
        1000: {
          normal: fonts.bold
        }
      },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: "ArialNarrow",
      body: "ArialNarrow",
      mono: "ArialNarrow",
    },
  });
  const insets = useSafeAreaInsets()
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <StripeProvider
        publishableKey={""}
    // merchantIdentifier="merchant.identifier" // required for Apple Pay
    //urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
        
            <Provider store={store}>
                <NativeBaseProvider theme={theme}>
                
                <View style={{flex:1,paddingTop: Platform.OS == "ios"?insets.top:insets.top}}>
                <AppRoot />
                </View>
               
                </NativeBaseProvider>
            </Provider>
            
    </StripeProvider >
   </GestureHandlerRootView>
  )
}
export default App
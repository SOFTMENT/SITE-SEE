import { StripeProvider } from '@stripe/stripe-react-native';
import { extendTheme, NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AppRoot from './src'
import { store } from './src/store';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
const App = () => {
  useEffect(()=>{
    messaging().onMessage(onMessageReceived);
    //messaging().setBackgroundMessageHandler(onMessageReceived);
  },[])
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
      Montserrat: {
        100: {
          normal: "Mulish-Light",
          //italic: "Roboto-LightItalic",
        },
        200: {
          normal: "Mulish-Light",
          //italic: "Roboto-LightItalic",
        },
        300: {
          normal: "Mulish-Regular",
          //italic: "Roboto-LightItalic",
        },
        400: {
          normal: "Mulish-Regular",
          //italic: "Roboto-Italic",
        },
        500: {
          normal: "Mulish-Medium"
        },
        600: {
          normal: "Mulish-Medium"
        },
        700: {
          normal: 'Mulish-SemiBold',
        },
        800: {
          normal: 'Mulish-SemiBold',
        },
        900: {
          normal: "Mulish-Bold"
        },
        1000: {
          normal: "Mulish-Bold"
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
    <StripeProvider
      publishableKey={"pk_test_51KX1ZmKZ1tCPc5ZWIwoMsl66CYpVIISPQiUF70YqYjfqACMCf1bSGGcW3FKRa7mOTOpGl1jizbxRDzcV2sY8JnKC00bXANkDmT"}
    // merchantIdentifier="merchant.identifier" // required for Apple Pay
    //urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <AppRoot />
        </NativeBaseProvider>
      </Provider>
    </StripeProvider >
  )
}
export default App
import { StripeProvider } from '@stripe/stripe-react-native';
import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import { Provider } from 'react-redux';
import AppRoot from './src'
import { store } from './src/store';
const App = () => {

  const theme = extendTheme({
    fontConfig: {
      Montserrat: {
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
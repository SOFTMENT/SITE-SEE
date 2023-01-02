import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import AppRoot from './src'
const App = () => {

const theme = extendTheme({
  fontConfig: {
    Montserrat: {
      100: {
        normal:"Montserrat-Light",
        //italic: "Roboto-LightItalic",
      },
      200: {
        normal:"Montserrat-Light",
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
        normal:"Montserrat-Medium"
      },
      600: {
        normal:"Montserrat-Medium"
      },
      700: {
        normal: '"Montserrat-SemiBold',
      },
      800: {
        normal: '"Montserrat-SemiBold',
      },
      900: {
        normal:"Montserrat-Bold"
      },
      1000:{
        normal:"Montserrat-Bold"
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
  return(
    <NativeBaseProvider theme={theme}>
      <AppRoot/>
    </NativeBaseProvider>
  )
}
export default App
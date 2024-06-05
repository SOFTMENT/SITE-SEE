/**
 * @format
 */
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';
messaging().setBackgroundMessageHandler(async remoteMessage => {
   // console.log('Message handled in the background!', remoteMessage);
  });
  function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return (
      <SafeAreaProvider>
        <App/>
      </SafeAreaProvider>
    )
  }
AppRegistry.registerComponent(appName, () => HeadlessCheck);

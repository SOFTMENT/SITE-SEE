import React from 'react';
import { NativeBaseProvider, Button, useDisclose, Center, TextField, Actionsheet } from 'native-base';
import { Keyboard, Platform, KeyboardEvent } from 'react-native';


const useKeyboardBottomInset = () => {
  const [bottom, setBottom] = React.useState(0);
  const subscriptions = React.useRef([]);

  React.useEffect(() => {
    function onKeyboardChange(e) {
      if (
        e.startCoordinates &&
        e.endCoordinates.screenY < e.startCoordinates.screenY
      )
        setBottom(e.endCoordinates.height);
      else setBottom(0);
    }

    if (Platform.OS === 'ios') {
      subscriptions.current = [
        Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidHide', onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', onKeyboardChange),
      ];
    }
    return () => {
      subscriptions.current.forEach((subscription) => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return bottom;
};
export  {useKeyboardBottomInset}
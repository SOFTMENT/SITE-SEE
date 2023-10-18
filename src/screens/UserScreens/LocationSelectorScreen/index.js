import {Icon} from 'native-base';
import React, {useRef, useState} from 'react';
import {Modal, Platform, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import MyButton from '../../../components/MyButton';
import Header from '../../../components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation, setCurrentPosition } from '../../../store/userSlice';
export default LocationSelectorScreen = props => {
  const {navigation} = props
  const mapRef = useRef(null);
  const {setLocationAllState, locationAllState} = props;
  const [localLocation, setLocaLocation] = useState({
    latitude: 22.7196,
    longitude: 70.8577,
  });
  const [address, setAddress] = useState('');
  const [loc, setLoc] = useState(null);
  const dispatch = useDispatch()

  const confirmPressed = () => {
    if(address == '' || loc == null){
      return
    }
    dispatch(setCurrentLocation(address))
    dispatch(setCurrentPosition(loc))
    navigation.goBack()
    
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      console.log('here');
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY`,
      );
      const json = await response.json();
      setAddress(json.results[0]?.formatted_address);
      //console.log(json.results[0])
      return json?.results[0];
      // return json.movies;
    } catch (error) {
      console.error(error);
    }
  };
  const insets = useSafeAreaInsets()
  const {latitude,longitude} = useSelector(state=>state.user.currentPosition)
  return (
    <View style={{flex:1}}>
    <MapView
      key={'AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY'}
      //style={{ flex: 1}}
      //customMapStyle={mapStyles}
      //tintColor="black"
      //userInterfaceStyle="dark"
      ref={mapRef}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={[styles.mapView]}
      onPress={event => {
      }}>
         <Marker
        //draggable
        coordinate={localLocation}
        // onDragEnd={(event)=>{
        //   console.log(event.nativeEvent.)
        // }}
      />
      </MapView>
      <View style={[styles.headingView,{paddingTop:Platform.OS == "ios" ?insets.top:10}]}>
        <TouchableOpacity
          style={styles.crossIconContainer}
          onPress={() => {
            navigation.goBack()
          }}>
          <Icon as={MaterialCommunityIcons} name="chevron-left" size={'xl'} color={"gray.900"}/>
        </TouchableOpacity>
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps={'always'}
          textInputProps={{
            //   onChangeText: (txt) => setAddress(txt),
            //   value: address,
            placeholderTextColor: 'gray',
            //value:address
          }}
          fetchDetails={true}
          styles={styles.autoCompleteStyles}
          placeholder={'Search address'}
          onPress={(data, details = null) => {
            //console.log(data.description)
            setAddress(data.description);
            setLoc({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            const location = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setLocaLocation(location);
            mapRef.current.animateToRegion(location, 2000);
          }}
          query={{
            key: 'AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY',
            language: 'en',
            //components: 'country:us',
          }}
        />
      </View>

     

      <MyButton
        title={'Confim'}
        containerStyle={styles.confirmBtn}
        txtStyle={styles.confirmBtnTxt}
        onPress={() => confirmPressed()}
      />
    </View>
  );
};

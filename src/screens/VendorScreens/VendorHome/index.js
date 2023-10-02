import {startCase} from 'lodash';
import React, {useEffect, useState} from 'react';
import {AppState, Platform, Text, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../../assets/images';
import {spacing} from '../../../common/variables';
import AvatarIcon from '../../../components/AvatarIcon';
import styles from './styles';
import {Icon, Link} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {setCurrentLocation, setCurrentPosition} from '../../../store/userSlice';
import LocationRequiredModal from '../../../components/LocationRequiredModal';
import { handleLocation } from '../../../common/LocationHelper';
import Geolocation from 'react-native-geolocation-service';
let sub = null
export default function VendorHome(props) {
  const {navigation} = props;
  const {userData} = useSelector(state => state.user);
  const {name, profilePic, uid} = userData;
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [locationModal, setLocationModal] = useState(false);
  useEffect(() => {
   
    return () => {
      //focusListener.remove();
      if(sub)
      sub.remove();
    };
  }, []);
  const callLocationPermission = () => {
    handleLocation(handleLocationAcceptance, handleLocationRejection);
    sub = AppState.addEventListener('change', () => {
      handleLocation(handleLocationAcceptance, handleLocationRejection);
    });
  }
  const handleNotNow = () => {
    setLocationModal(false);
  };
  const handleLocationRejection = () => {
    setLocationModal(true);
  };
  const handleLocationAcceptance = () => {
    setLocationModal(false);
    Geolocation.getCurrentPosition(
      value => {
        const location = {
          latitude: value.coords.latitude,
          longitude: value.coords.longitude,
        };
        dispatch(setCurrentPosition(location));
        getAddressFromCoordinates(location.latitude, location.longitude);
        navigation.navigate("MyListingScreen")
      },
      error => {},
      {
        enableHighAccuracy: true,
      },
    );
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY`,
      );
      const json = await response.json();
      dispatch(setCurrentLocation(json.results[0]?.formatted_address));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS == 'ios' ? inset.top : inset.top + spacing.small,
        },
      ]}>
      <View style={styles.topView}>
        <View>
          <Text style={styles.hello}>Dashboard</Text>
        </View>
        <AvatarIcon
          size={60}
          uri={profilePic}
          style={{borderColor: 'gray'}}
          defaultSource={images.defaultUser}
          //borderWidth={1}
        />
      </View>
      <Link
        mt={5}
        onPress={()=>{
            callLocationPermission()
        }}
        _text={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
        style={{
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderBottomColor: 'white',
        }}>
        Use Current Location
      </Link>
      <View style={styles.borderViewContainer}>
        <View style={styles.borderView}></View>
        <Text style={styles.or}> OR </Text>
        <View style={styles.borderView}></View>
      </View>
      <View style={styles.searchContainer}>
        <Icon
          as={MaterialCommunityIcons}
          size="lg"
          name="map-marker-radius"
          color={'black'}
          marginTop={2}
        />
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps={'always'}
          textInputProps={{
            //   onChangeText: (txt) => setAddress(txt),
            //   value: address,
            placeholderTextColor: 'gray',
            //value:address
          }}
          fetchDetails={true}
          styles={{
            textInput: {
              padding: 0,
              backgroundColor: 'transparent',
            },
            container: {
              padding: 0,
            },
            textInputContainer: {
              padding: 0,
            },
          }}
          placeholder={'Search address'}
          onPress={(data, details = null) => {
            dispatch(
              setCurrentPosition({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              }),
            );
            dispatch(setCurrentLocation(data.description));
            navigation.navigate("MyListingScreen")
            //console.log(data.description)
            //   setAddress(data.description);
            //   setLoc({
            //     latitude: details.geometry.location.lat,
            //     longitude: details.geometry.location.lng,
            //   });
            //   const location = {
            //     latitude: details.geometry.location.lat,
            //     longitude: details.geometry.location.lng,
            //     latitudeDelta: 0.01,
            //     longitudeDelta: 0.01,
            //   };
            //   setLocaLocation(location);
            //   mapRef.current.animateToRegion(location, 2000);
          }}
          query={{
            key: 'AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY',
            language: 'en',
            //components: 'country:us',
          }}
        />
      </View>
      <LocationRequiredModal
        handleNotNow={handleNotNow}
        visible={locationModal}
        closeModal={() => setLocationModal(false)}
        handleLocation={() =>
          handleLocation(
            handleLocationAcceptance,
            handleLocationRejection,
            true,
          )
        }
      />
    </View>
  );
}

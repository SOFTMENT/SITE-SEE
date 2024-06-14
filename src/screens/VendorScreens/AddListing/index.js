import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import algoliasearch from 'algoliasearch';
import {geohashForLocation} from 'geofire-common';
import {debounce} from 'lodash';
import {Icon, ScrollView, Select, VStack, useDisclose} from 'native-base';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import branch from 'react-native-branch';
import FastImage from 'react-native-fast-image';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Helper from '../../../common/Helper';
import Util from '../../../common/util';
import {fontSizes, spacing} from '../../../common/variables';
import Header from '../../../components/Header';
import LoaderComponent from '../../../components/LoaderComponent';
import MyButton from '../../../components/MyButton';
import MyTextInput from '../../../components/MyTextInput';
import PhotoPicker from '../../../components/PhotoPicker';
import colors from '../../../theme/colors';
import styles from './styles';
import functions from '@react-native-firebase/functions';
import RNFS from 'react-native-fs';
import {listingTypes} from '../../../config/appConfig';
import UserNameActionSheet from '../../../components/UserNameActionSheet';
import fonts from '../../../../assets/fonts';
const algoliaClient = algoliasearch(
  'MOMHBUJFM8',
  '110bf4874cab087690527dec42643d51',
);
const searchIndex = algoliaClient.initIndex('businessName');
export default function AddListing(props) {
  const {navigation} = props;
  const {isOpen, onToggle, onClose, onOpen} = useDisclose();
  const {
    isOpen: isUserNameSheetOpen,
    onToggle: onUserNameSheetToggle,
    onClose: onUserNameSheetOnClose,
  } = useDisclose();
  const [locationAllState, setLocationAllState] = useState({
    address: null,
    location: {},
  });
  const placesRef = useRef(null);
  const categories = useSelector(state => state.user.categories);
  const [about, setAbout] = useState('');
  const [title, setTitle] = useState('');
  const [purchaseUrl, setPurchaseUrl] = useState('');
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState('');
  const [listingType, setListingType] = useState('');
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [supplierTag, setSupplierTag] = useState(null);
  const {latitude, longitude} =
    useSelector(state => state.user.currentPosition) ?? {};
  const location = useSelector(state => state.user.currentLocation) ?? {};
  useEffect(() => {
    if (location) {
      placesRef.current.setAddressText(location);
      setLocationAllState({
        address: location,
        location: {
          latitude,
          longitude,
        },
      });
    }
  }, [location]);
  const getUserNamesData = useCallback(
    async txt => {
      setLoading(true);
      const res = await searchIndex.search(txt, {
        filters: 'membershipActive:true',
        // restrictSearchableAttributes: ['name']
      });
      console.log(res.hits);
      setUsers(res.hits.filter(hit => hit.uid != auth().currentUser.uid));
      setLoading(false);
    },
    [query],
  );

  const debouncedGetUserNamesData = useMemo(
    () => debounce(getUserNamesData, 1000),
    [getUserNamesData],
  );
  const callDebounceFuntion = txt => {
    if (txt.trim().length) {
      debouncedGetUserNamesData(txt);
    } else {
      setUsers([]);
    }
  };
  const handleImage = index => {
    Keyboard.dismiss();
    setIndex(index);
    onToggle();
  };
  const clearData = () => {
    setTitle('');
    setAbout('');
    setImages([]);
    setIndex(0);
    setCategory('');
    setQuery('');
    setSupplierTag(null);
    setListingType('');
    setPurchaseUrl('');
    // setLocationAllState({
    //     address: null,
    //     location: {},
    // })
  };
  const selectImage = img => {
    if (img) {
      if (images?.[index] != undefined) {
        setImages(images.map((imgg, i) => (index == i ? img : imgg)));
      } else setImages([...images, img]);
    }
  };

  const handleAddSpace = async () => {
    if (!images[0]) {
      Util.showMessage('error', 'First image is compulsory');
    } else if (!title.trim().length) {
      Util.showMessage('error', 'Please provide a valid title');
    } else if (!category) {
      Util.showMessage('error', 'Please select a category');
    } else if (!listingType) {
      Util.showMessage('error', 'Please select a listing type');
    } else if (!about.trim().length) {
      Util.showMessage('error', 'Please provide a valid description');
    } else if (!locationAllState.address) {
      Util.showMessage('error', 'Please add a valid location');
    } else {
      try {
        setLoaderVisibility(true);
        const uid = auth().currentUser.uid;
        const hash = geohashForLocation([
          locationAllState.location.latitude,
          locationAllState.location.longitude,
        ]);
        const ref = firestore().collection('Listing').doc();
        const base64image = await RNFS.readFile(
          decodeURI(images[0].uri),
          'base64',
        );
        const res = await functions().httpsCallable(
          'compareIfListingAlreadyExists',
        )({
          imageUrl: base64image,
          supplierId: uid,
        });
        const compareData = res.data;
        if (compareData.status == 1) {
          Util.showMessage('error', 'This listing already exists.');
          setLoaderVisibility(false);
          return;
        }
        Promise.all(
          images.map((image, ind) => {
            return Helper.uploadImage(
              `ListingImage/${ref.id}_${ind + 1}.png`,
              image,
            );
          }),
        )
          .then(async listingImages => {
            let buo = await branch.createBranchUniversalObject(
              `item/${ref.id}`,
              {
                title,
                contentDescription: about,
                contentMetadata: {
                  customMetadata: {
                    key1: 'value1',
                  },
                },
              },
            );
            let {url} = await buo.generateShortUrl();
            const obj = {
              id: ref.id,
              listingImages,
              shareUrl: url,
              createTime: firebase.firestore.FieldValue.serverTimestamp(),
              title: title.trim(),
              supplierId: uid,
              about: about.trim(),
              category,
              geohash: hash,
              listingType,
              _geoloc: {
                lat: locationAllState?.location?.latitude ?? '',
                lng: locationAllState?.location?.longitude ?? '',
              },
              location: {
                address: locationAllState.address,
                lat: locationAllState?.location?.latitude ?? '',
                lng: locationAllState?.location?.longitude ?? '',
              },
            };
            if (supplierTag) {
              obj.supplierTag = supplierTag;
            }
            if (purchaseUrl.trim().length) {
              obj.purchaseUrl = purchaseUrl.trim();
            }
            await ref.set(obj);
            Util.showMessage(
              'success',
              'Success',
              'Listing added successfully',
            );
            clearData();
            if (location) navigation.navigate('MyListingScreen');
            else navigation.navigate('VendorAllListing');
          })
          .finally(() => {
            setLoaderVisibility(false);
          });
      } catch (error) {
        setLoaderVisibility(false);
        console.log(error);
      }
    }
  };

  const handleClose = index => {
    setImages(images.filter((img, i) => index != i));
  };
  const handleTag = (uid, name) => {
    onUserNameSheetOnClose();
    setQuery(name);
    setUsers([]);
    setSupplierTag(uid);
  };
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      nestedScrollEnabled={false}
      bounces={false}
      keyboardShouldPersistTaps={'always'}>
      <Header navigation={navigation} title="Add Listing" />
      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.thumbnailView}
          onPress={() => handleImage(0)}>
          {images[0] ? (
            <FastImage
              source={{uri: images[0].uri}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          ) : (
            <VStack alignItems={'center'}>
              <Text style={styles.updateText} numberOfLines={1}>
                {images[0] ? images[0].name : 'Add Picture'}
              </Text>
              <Text style={styles.subtitle}>
                {'JPEG or PNG, no larger than 10 MB.'}
              </Text>
            </VStack>
          )}
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}>
          {images.length > 1 &&
            images.slice(1).map((img, index) => {
              return (
                <TouchableOpacity
                  style={styles.addmore}
                  onPress={() => handleImage(index + 1)}>
                  <TouchableOpacity
                    onPress={() => handleClose(index + 1)}
                    style={{
                      position: 'absolute',
                      zIndex: 1000,
                      // backgroundColor:"rgba(0,0,0,0.5)",
                      // padding:5,
                      top: 2,
                      right: 2,
                    }}>
                    <Icon
                      name="close-circle-outline"
                      as={MaterialCommunityIcons}
                      size="md"
                      color={'white'}
                    />
                  </TouchableOpacity>
                  <FastImage
                    source={{uri: img.uri}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })}
          {images[0] && images.length < 10 && (
            <TouchableOpacity style={styles.addmore} onPress={handleImage}>
              <Icon name="plus" as={MaterialCommunityIcons} size="3xl" />
            </TouchableOpacity>
          )}
        </ScrollView>
        <MyTextInput
          containerStyle={{marginTop: 20}}
          //iconName={"lock-outline"}
          //isPass
          placeholder={'Listing Name'}
          value={title}
          autoCapitalize={'words'}
          onChangeText={txt => setTitle(txt)}
          //keyboardType={"number-pad"}
        />
        <Text style={styles.title}>Listing location</Text>
        <GooglePlacesAutocomplete
          ref={placesRef}
          //keyboardShouldPersistTaps={'always'}
          textInputProps={{
            // onChangeText: (txt) => setAddress(txt),
            // value: address,
            placeholderTextColor: 'gray',
            //value:address
          }}
          fetchDetails={true}
          styles={{
            textInput: {
              borderRadius: 20,
              backgroundColor: colors.whiteDark,
              color: colors.black,
              fontSize: fontSizes.extraExtraSmall,
              fontFamily: fonts.regular,
            },
            listView: {
              backgroundColor: colors.whiteDark,
            },
            description: {
              color: colors.grey,
              fontFamily: fonts.regular,
            },
          }}
          //styles={styles.autoCompleteStyles}
          placeholder={'Search address'}
          onPress={(data, details = null) => {
            setLocationAllState({
              ...locationAllState,
              address: data.description,
              location: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
            });
          }}
          query={{
            key: 'AIzaSyCFjK92eaOWd5f2Aj1U5enbOHuIZ3WKEew',
            language: 'en',
            //components: 'country:us',
          }}
        />
        <Text style={styles.title}>Select listing category</Text>
        <Select
          _actionSheet={{useRNModal: true}}
          accessibilityLabel="Select Category"
          placeholder="Select"
          //px={spacing.medium}
          bgColor={colors.whiteDark}
          py={Platform.OS == 'ios' ? 4 : 2}
          borderRadius={spacing.large}
          borderWidth={0}
          // borderColor={colors.borderColor}
          dropdownIcon={
            <Icon
              //bgColor={colors.whiteDark}
              name="chevron-down"
              as={MaterialCommunityIcons}
              size="md"
              marginRight={3}
            />
          }
          selectedValue={category}
          color={'black'}
          onValueChange={itemValue => setCategory(itemValue)}>
          {categories.sortmap((item, index) => {
            return <Select.Item key={index} value={item} label={item} />;
          })}
        </Select>
        <Text style={styles.title}>Select listing type</Text>
        <Select
          //_actionSheet={{useRNModal: true}}
          accessibilityLabel="Select Type"
          placeholder="Select"
          //px={spacing.medium}
          bgColor={colors.whiteDark}
          py={Platform.OS == 'ios' ? 4 : 2}
          borderRadius={spacing.large}
          borderWidth={0}
          // borderColor={colors.borderColor}
          dropdownIcon={
            <Icon
              //bgColor={colors.whiteDark}
              name="chevron-down"
              as={MaterialCommunityIcons}
              size="md"
              marginRight={3}
            />
          }
          selectedValue={listingType}
          color={'black'}
          onValueChange={itemValue => setListingType(itemValue)}>
          {listingTypes.map((item, index) => {
            return <Select.Item key={index} value={item} label={item} />;
          })}
        </Select>
        <Pressable onPress={onUserNameSheetToggle}>
          <View pointerEvents="none">
            <MyTextInput
              endIconButton={'chevron-down'}
              containerStyle={{marginTop: 20}}
              nonEditable={true}
              value={query}
              placeholder={'Tag Supplier'}
              onChangeText={txt => callDebounceFuntion(txt)}
            />
          </View>
        </Pressable>

        {/* {
              loading &&
             <ActivityIndicator size={"small"}/>
          }
          {users.slice(0,5).map(item=>{
            return(
              <TouchableOpacity onPress={()=>handleTag(item.uid,item.name)} style={{marginVertical:5,marginLeft:10,padding:6,borderWidth:1,borderRadius:10,borderColor:colors.borderColor}}>
                <Text>@ {item.name}</Text>
              </TouchableOpacity>
            )
          })} */}
        <MyTextInput
          containerStyle={{marginTop: 20}}
          placeholder={'Purchase Link'}
          value={purchaseUrl}
          onChangeText={txt => setPurchaseUrl(txt)}
          keyboardType={'url'}
        />
        {/* <Text style={styles.title}>Brief Description</Text> */}
        <MyTextInput
          numberOfLines={2}
          containerStyle={{marginTop: 20}}
          txtInputStyle={{height: 100, textAlignVertical: 'top'}}
          multiline={true}
          //iconName={"lock-outline"}
          //isPass
          placeholder={'Listing Description'}
          value={about}
          onChangeText={txt => setAbout(txt)}
          autoCapitalize={'words'}
          //keyboardType={"number-pad"}
        />

        <MyButton
          title={'Add Listing'}
          containerStyle={{
            marginTop: 20,
          }}
          txtStyle={{
            color: 'white',
          }}
          onPress={handleAddSpace}
        />
      </View>
      <PhotoPicker
        isOpen={isOpen}
        onClose={onClose}
        isVideo={false}
        setImage={selectImage}
        isTF={true}
      />
      <LoaderComponent
        visible={loaderVisibility}
        title={'Uploading pictures'}
      />
      <UserNameActionSheet
        isOpen={isUserNameSheetOpen}
        onClose={onUserNameSheetOnClose}
        callDebounceFuntion={callDebounceFuntion}
        query={query}
        loading={loading}
        users={users}
        handleTag={handleTag}
      />
    </KeyboardAwareScrollView>
  );
}

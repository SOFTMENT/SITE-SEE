import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '../../../components/Header';
import FastImage from 'react-native-fast-image';
import {
  HStack,
  Icon,
  Select,
  useDisclose,
  VStack,
  ScrollView,
} from 'native-base';
import ImageLabeling from '@react-native-ml-kit/image-labeling';
import PhotoPicker from '../../../components/PhotoPicker';
import MyTextInput from '../../../components/MyTextInput';
import {spacing} from '../../../common/variables';
import colors from '../../../theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {propertyCategories} from '../../../config/appConfig';
import MyButton from '../../../components/MyButton';
import LocationSelector from '../../../components/LocationSelector';
import Util from '../../../common/util';
import Helper from '../../../common/Helper';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LoaderComponent from '../../../components/LoaderComponent';
import {geohashForLocation} from 'geofire-common';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { useSelector } from 'react-redux';

export default function AddListing(props) {
  const {navigation, route} = props;
  //const {getSpaces} = route.params
  const {isOpen, onToggle, onClose, onOpen} = useDisclose();
  const [locationAllState, setLocationAllState] = useState({
    address: null,
    location: {},
  });
  const categories = useSelector(state=>state.user.categories)
  const [about, setAbout] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState(categories[0]);
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const handleImage = index => {
    setIndex(index);
    onToggle();
  };
  useEffect(()=>{
    console.log(locationAllState)
  },[locationAllState])
  const clearData = () => {
    setTitle('')
    setAbout('')
    setImages([])
    setIndex(0)
    setCategory(categories[0])
    setLocationAllState({
        address: null,
        location: {},
    })
  }
  const selectImage = img => {
    if(img){
      if (images?.[index] != undefined) {
        setImages(images.map((imgg, i) => (index == i ? img : imgg)));
      } else setImages([...images, img]);
    }
   
  };
  const generateLabels = async() => {
    let labels = []
    for(const img of images){
      const label = await ImageLabeling.label(Platform.OS=="ios"?`file:///${img.path}`:img.path)
      label.map(item=>{
        const index = labels.findIndex(v=>v.text == item.text)
        if(index>=0){
          labels[index] = {
            ...labels[index],
            confidence:Math.max(labels[index].confidence,item.confidence)
          }
        }
        else{
          labels.push(item)
        }
      })
      labels.sort((obj1,obj2)=>obj2.confidence-obj1.confidence)
    }
    return labels.slice(0,5)
  }
  const handleAddSpace = async () => {
    // const labels = await ImageLabeling.label("https://firebasestorage.googleapis.com/v0/b/site-see-32c16.appspot.com/o/ListingIma);
    //     console.log(labels)
    //     return
   //const labels = await ImageLabeling.label(Platform.OS=="ios"?`file:///${img.path}`:img.path)
  //  const labels = await generateLabels()
  //  console.log(labels)
   //return
    if (!images[0]) {
      Util.showMessage('error', 'First image is compulsory');
    } else if (!title) {
      Util.showMessage('error', 'Please provide a valid title');
    } else if (!about) {
      Util.showMessage('error', 'Please provide a valid description');
    } else if (!locationAllState.address) {
      Util.showMessage('error', 'Please add a valid location');
    } else {
      try {
        setLoaderVisibility(true);
        const uid = auth().currentUser.uid;
        let spaceImages = [];
        const hash = geohashForLocation([
          locationAllState.location.latitude,
          locationAllState.location.longitude,
        ]);
        const ref = firestore().collection('Listing').doc();
        
        Promise.all(images.map((image,ind)=>{
            return Helper.uploadImage(
                `ListingImage/${ref.id}_${ind+1}.png`,
                image,
              );
        }))
        .then( async listingImages=>{
            await ref.set({
            id: ref.id,
            listingImages,
            createTime: firebase.firestore.FieldValue.serverTimestamp(),
            title,
            supplierId:uid,
            about,
            category,
            geohash: hash,
            _geoloc:{
                lat: locationAllState?.location?.latitude ?? '',
                lng: locationAllState?.location?.longitude ?? '',
            },
            location: {
                address: locationAllState.address,
                lat: locationAllState?.location?.latitude ?? '',
                lng: locationAllState?.location?.longitude ?? '',
            },
            });
           Util.showMessage('success', 'Success', 'Listing added successfully');
           clearData()
        })
        .finally(()=>{
            setLoaderVisibility(false)
        })
        
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const handleClose = index => {
    setImages(images.filter((img, i) => index != i));
  };
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      nestedScrollEnabled={false}
      bounces={false}
      keyboardShouldPersistTaps={'handled'}>
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
          {images.length >1 && images.slice(1).map((img, index) => {
            return (
              <TouchableOpacity
                style={styles.addmore}
                onPress={() => handleImage(index + 1)}>
                <TouchableOpacity
                  onPress={() => handleClose(index)}
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
          containerStyle={{marginTop:20}}
          //iconName={"lock-outline"}
          //isPass
          placeholder={'Listing Name'}
          value={title}
          onChangeText={txt => setTitle(txt)}
          //keyboardType={"number-pad"}
        />
        <Text style={styles.title}>Listing location</Text>
        <GooglePlacesAutocomplete
          //keyboardShouldPersistTaps={'always'}
          textInputProps={{
            //   onChangeText: (txt) => setAddress(txt),
            //   value: address,
            placeholderTextColor: 'gray',
            //value:address
          }}
          fetchDetails={true}
          styles={{
           
            textInput:{
                borderRadius:20
            }
          }}
          //styles={styles.autoCompleteStyles}
          placeholder={'Search address'}
          onPress={(data, details = null) => {
            console.log(data.description)
            setLocationAllState({...locationAllState,address:data.description,
                location:{
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                }
            });
          }}
          query={{
            key: 'AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY',
            language: 'en',
            //components: 'country:us',
          }}
        />
         <Text style={styles.title}>Enter listing category</Text>
        <Select
          _actionSheet={{useRNModal: true}}
          accessibilityLabel="Select Category"
          placeholder="Category"
          //px={spacing.medium}
          bgColor={'white'}
          py={Platform.OS == 'ios' ? 4 : 2}
          borderRadius={spacing.large}
          borderWidth={1}
          borderColor={colors.borderColor}
          dropdownIcon={
            <Icon
              bgColor={'white'}
              name="chevron-down"
              as={MaterialCommunityIcons}
              size="md"
              marginRight={3}
            />
          }
          selectedValue={category}
          color={'black'}
          onValueChange={itemValue => setCategory(itemValue)}>
          {categories.map((item,index) => {
            return (
              <Select.Item
                key={index}
                value={item}
                label={item}
              />
            );
          })}
        </Select>
        
        {/* <Text style={styles.title}>Brief Description</Text> */}
        <MyTextInput
          numberOfLines={2}
          containerStyle={{marginTop:20}}
          txtInputStyle={{height: 100,textAlignVertical: 'top'}}
          multiline={true}
          //iconName={"lock-outline"}
          //isPass
          placeholder={'Listing Description'}
          value={about}
          onChangeText={txt => setAbout(txt)}
          //keyboardType={"number-pad"}
        />
       
       
        <MyButton
          title={'Add Listing'}
          containerStyle={{
            marginTop: 20,
          }}
          txtStyle={
            {
                color:"white"
            }
          }
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
    </KeyboardAwareScrollView>
  );
}

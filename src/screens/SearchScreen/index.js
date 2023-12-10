import React, { useRef, useState } from 'react';
import { Keyboard, Platform, TouchableOpacity, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
import algoliasearch from 'algoliasearch';
import { FlatList, HStack, IconButton, Input } from 'native-base';
import { Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { spacing } from '../../common/variables';
import CenteredLoader from '../../components/CenteredLoader';
import Header from '../../components/Header';
import NoResults from '../../components/NoResults';
import { setUserData } from '../../store/userSlice';
import colors from '../../theme/colors';
import UserProductCard from '../UserScreens/UserProductCard';
import styles from './styles';
const algoliaClient = algoliasearch(
  'MOMHBUJFM8',
  '110bf4874cab087690527dec42643d51',
);
const index = algoliaClient.initIndex('title');
let firstLoad = true;

const SearchScreen = props => {
  const {route, navigation} = props;
  const [value, setValue] = useState('');
  const [hits, setHits] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const {favorites,userData} = useSelector(state => state.user);
  const [isFocus,setIsFocus] = useState(true)
  const dispatch = useDispatch()
  const {latitude, longitude} = useSelector(
    state => state.user.currentPosition,
  );
  const textInputRef = useRef();
  const getUserData = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get()
      .then(res => {
        dispatch(setUserData(res.data()));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleProfile = () => {
    onToggle();
  };
  const updateSearchHistory = (term) => {
    let searchArray = Array.isArray(userData?.searchHistory)? Array.from(userData.searchHistory) : []
    const index = searchArray.indexOf(term);
    if (index !== -1) {
      // If the element exists in the array, remove it and push it to the front.
      searchArray.splice(index, 1); // Remove the element.
      searchArray.unshift(term);   // Push it to the front.
    }
    else
    searchArray.push(term)
    // Ensure the array contains a maximum of 5 terms.
    if (searchArray.length > 5) {
      searchArray.shift(); // Remove the oldest term from the beginning of the array.
    }
    try {
      firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .update({
        searchHistory:searchArray
      })
      .then(()=>{
        getUserData()
      })
    } catch (error) {
      
    }
  }
  const handleRecent = term => {
    setValue(term)
    search(term)
  }
  const search = (term) => {
    Keyboard.dismiss()
    if(term.trim() == ""){
      setValue("")
      return
    }
    setLoading(true);
    // updateSearchHistory(term)
    index
      .search(term,{
        aroundLatLng: `${latitude},${longitude}`,
        aroundRadius: 60,
      } )
      .then(({hits}) => {
        if (hits.length == 0) setNoData(true);
        else setNoData(false);
        setHits(hits);
        if(hits.length >0){
          handleSearchHistory(hits,term)
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSearchHistory = (hits,term) => {
    try {
      const listingIds = hits.map((hit)=>hit.id)
      firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("SearchHistory")
      .add({
        searchTime:firebase.firestore.FieldValue.serverTimestamp(),
        listingIds,
        term
      })
    } catch (error) {
      
    }
  }
  const renderCard = ({item}) => {
    return (
      <UserProductCard
        item={item}
        favorites={favorites}
        navigation={navigation}
      />
    );
  };
  const keyExtractor = item => {
    return item.id;
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Search" back />
      <View style={styles.mainView}>
        <HStack space={2} mb={5} px={5}>
          <Input
            placeholder="Search"
            variant="outlined"
            flex={1}
            // ref={textInputRef}
            _focus={{borderColor: colors.appDefaultColor}}
            borderRadius={30}
            bgColor={'white'}
            py={Platform.OS == 'ios' ? 4 : 2}
            color={'black'}
            borderWidth={1}
            borderColor={colors.appDefaultColor}
            //bg={"gray.800"}
            onChangeText={txt => setValue(txt)}
            value={value}
            onSubmitEditing={() => search(value)}
            autoComplete="off"
            autoCapitalize="none"
            autoFocus
            // onBlur={()=>{
            //   setIsFocus(false)
            // }}
            // onFocus={()=>{
            //   setIsFocus(true)
            // }}
          />
          <IconButton
            //variant={"solid"}
            bg={colors.black}
            px={3}
            borderRadius={10}
            // borderWidth={1}
            // borderColor={"gray.400"}
            onPress={() => search(value)}
            _icon={{
              size: 'xl',
              name: 'magnify',
              color: 'white',
              as: MaterialCommunityIcons,
            }}
          />
        </HStack>
        <TouchableOpacity onPress={()=>{
          navigation.navigate("UserSearchHistory")
        }}>
          <Text style={styles.recentSearch}>Show Search History</Text>
        </TouchableOpacity>
        {/* { userData?.searchHistory && userData?.searchHistory?.length > 0 && isFocus &&
          <View style={styles.searchHistory}>
          <Text style={styles.recentSearch}>RECENT SEARCHES</Text>
          {
             userData.searchHistory.map(term=>{
              return(
                <TouchableOpacity style={styles.searchH} onPress={()=>{
                  handleRecent(term)
                }}>
                  <Text style={styles.term}>{term}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
       } */}
        {/* <AutocompleteInput
          data={userData.searchHistory}
          autoCapitalize='none'
          value={value}
          onChangeText={(text) => setValue(text)}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => <Text>{item}</Text>,
          }}
        /> */}
        {loading ? (
          <CenteredLoader />
        ) : noData ? (
          <NoResults />
        ) : (
          <FlatList
            style={{paddingHorizontal: spacing.medium, flex: 1}}
            data={hits}
            numColumns={2}
            renderItem={renderCard}
            keyExtractor={keyExtractor}
            bounces={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};
export default SearchScreen;

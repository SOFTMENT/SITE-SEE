import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {format} from 'date-fns';
import {FlatList, HStack, Icon, Link, VStack, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../../assets/images';
import {spacing} from '../../../common/variables';
import AvatarIcon from '../../../components/AvatarIcon';
import Header from '../../../components/Header';
import {setFavorites} from '../../../store/userSlice';
import colors from '../../../theme/colors';
import styles from './styles';
import CenteredLoader from '../../../components/CenteredLoader';
import NoResults from '../../../components/NoResults';
import UserProductCard from '../UserProductCard';

export default function FavoritesScreen(props) {
  const {route, navigation} = props;
  const {favorites} = useSelector(state => state.user);
  const uid = auth().currentUser.uid;
  const [data, setData] = useState([]);
  const [filteredData,setFilteredData] = useState([])
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [searchValue,setSearchValue] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    if(favorites)
    getFavoritesData();
  }, [favorites]);
  const getFavoritesData = async () => {
    try {
      setLoading(true);
      console.log(favorites.entries())
      const favouritesData = [];
      for (const [index, obj] of favorites.entries()) {
        const docSnap = await firestore()
          .collection('Listing')
          .doc(obj.id)
          .get();
        //console.log(docSnap.exists)
        if (docSnap.exists) {
          favouritesData[index] = docSnap.data();
        }
      }
      if (favouritesData.length == 0) setNoData(true);
      else setNoData(false);
      setFilteredData(favouritesData)
      setData(favouritesData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const renderCard = ({item}) => {
    return <UserProductCard item={item} favorites={favorites} navigation={navigation}/>
  };
  const keyExtractor = item => {
    return item.id;
  };
  const handleSearch = txt => {
    setSearchValue(txt.trim())
    if(txt.trim().length == 0){
      if(data.length == 0)setNoData(true)
      else setNoData(false)
      setFilteredData(data)
    }
    else{
      const newData = data.filter(item=>item.title.toLowerCase().startsWith(txt.trim().toLowerCase()))
      if(newData.length == 0)setNoData(true)
      else{
        setNoData(false)
      }
      setFilteredData(newData)
    }
  }
  return (
    <View style={styles.container}>
      <Header 
        isSearch  
        searchValue={searchValue}
        handleSearch={handleSearch}
        navigation={navigation} 
        extraStyle={{paddingBottom: 0}} />
      <Text style={styles.pageTitle}>
        Wishlist
      </Text>
      {loading ? (
        <CenteredLoader />
      ) : noData ? (
        <NoResults />
      ) : (
        <FlatList
          style={{paddingHorizontal: spacing.medium, flex: 1}}
          data={filteredData}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

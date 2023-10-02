import React, { useState } from 'react';
import {Platform, View} from 'react-native';

import algoliasearch from 'algoliasearch';
import {FlatList, HStack, IconButton, Input} from 'native-base';
import Header from '../../components/Header';
import colors from '../../theme/colors';
import styles from './styles';
import { spacing } from '../../common/variables';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserProductCard from '../UserScreens/UserProductCard';
import { useSelector } from 'react-redux';

const algoliaClient = algoliasearch(
  'MOMHBUJFM8',
  '110bf4874cab087690527dec42643d51',
);
const index = algoliaClient.initIndex('title');
let firstLoad = true;

const SearchScreen = (props) => {
  const {route, navigation} = props;
  const [value,setValue] = useState("")
  const [hits,setHits] = useState([])
  const {favorites} = useSelector(state => state.user);
  const {latitude,longitude} = useSelector(state => state.user.currentPosition);
  const search = () => {
    index.search(value,
    {
        aroundLatLng: `${latitude},${longitude}`,
        aroundRadius:7000
    }
    )
    .then(({hits})=>{
        setHits(hits)
    })
  }
  const renderCard = ({item}) => {
    return <UserProductCard item={item} favorites={favorites} navigation={navigation}/>
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
            _focus={{borderColor: colors.appPrimary}}
            borderRadius={30}
            bgColor={'white'}
            py={Platform.OS == 'ios' ? 4 : 2}
            color={'black'}
            borderWidth={1}
            borderColor={colors.appPrimary}
            //bg={"gray.800"}
            onChangeText={txt => setValue(txt)}
            value={value}
            onSubmitEditing={() => search()}
            autoFocus
            autoComplete='off'
            autoCapitalize='none'
          />
          <IconButton
            //variant={"solid"}
            bg={colors.appPrimary}
            borderRadius={10}
            // borderWidth={1}
            // borderColor={"gray.400"}
            onPress={() => search()}
            _icon={{
              size: 'xl',
              name: 'magnify',
              color: 'white',
              marginLeft: spacing.extraExtraSmall,
              as: MaterialCommunityIcons,
            }}
          />
        </HStack>
        <FlatList
          style={{paddingHorizontal: spacing.medium, flex: 1}}
          data={hits}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
export default SearchScreen;

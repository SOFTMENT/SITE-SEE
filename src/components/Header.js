import {HStack, Icon, IconButton, Menu} from 'native-base';
import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../assets/fonts';
import {fontSizes, itemSizes, spacing} from '../common/variables';
import {navigateAndReset} from '../navigators/RootNavigation';
import ReportUserDialog from './ReportUserDialog';
const Header = ({
  navigation,
  title,
  extraStyle,
  back,
  isSearch,
  handleSearch,
  searchValue,
  rightIcon,
  onRightIconPress,
  rightIconColor,
  onBackPress,
  rightIsComponent,
}) => {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBack = () => {
    try {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigateAndReset('OnboardingScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[styles.container, extraStyle, {paddingTop: Platform.OS == "ios"?insets.top:insets.top+15}]}>
      {back ? (
        <IconButton
          onPress={onBackPress ? onBackPress : handleBack}
          _pressed={{backgroundColor: 'transparent'}}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="2xl"
              name="chevron-left"
              color={'white'}
            />
          }
        />
      ) : (
        <View />
      )}
      {isSearch ? (
        <HStack flex={1} bgColor={'white'} px={2} mt={Platform.OS=="ios"?0:4} py={Platform.OS=="ios"?2:0}borderRadius={20} w={'100%'} alignItems={"center"}>
          <Icon
            as={MaterialCommunityIcons}
            size="lg"
            name={'magnify'}
            color={'black'}
            mr={2}
          />
          <TextInput
            placeholder="Search wishlist"
            style={[styles.txtInput,{flex:1}]}
            autoCapitalize="none"
            autoComplete={'off'}
            onChangeText={handleSearch}
            value={searchValue}
          />
        </HStack>
      ) : (
        <Text style={[styles.title, back && {marginLeft: -5}]}>{title}</Text>
      )}
      {rightIcon ? (
        rightIsComponent ? (
          <Menu
            closeOnSelect={true}
            placement="bottom right"
            trigger={triggerProps => {
              return (
                <Pressable {...triggerProps}>
                  <Icon
                    as={MaterialCommunityIcons}
                    size="xl"
                    name={'dots-vertical'}
                    color={'white'}
                  />
                </Pressable>
              );
            }}>
            <Menu.Item onPress={() => setMenuOpen(true)}>Report</Menu.Item>
          </Menu>
        ) : (
          <IconButton
            //bgColor={"red.100"}
            onPress={onRightIconPress}
            _pressed={{backgroundColor: 'transparent'}}
            icon={
              <Icon
                as={MaterialCommunityIcons}
                size="xl"
                name={rightIcon}
                color={'white'}
              />
            }
          />
        )
      ) : isSearch ? (
        <View />
      ) : (
        <View style={{margin: 18}} />
      )}
      <ReportUserDialog visible={menuOpen} setMenuOpen={setMenuOpen} type={"Product"}/>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: spacing.medium,
    //paddingTop: Platform.OS == 'ios' ? Util.getHeight(5) :spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    //flex:1,
    //textAlign:"center",
    color: 'white',
    fontFamily: fonts.bold,
    fontSize: fontSizes.medium,
    flex: 1,
    marginLeft: 40,
    textAlign: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: itemSizes.item30,
    height: itemSizes.item30,
    tintColor: 'white',
  },
  txtInputContainer: {},
  txtInput: {
    color: 'black',
    fontFamily: fonts.regular,
  },
});

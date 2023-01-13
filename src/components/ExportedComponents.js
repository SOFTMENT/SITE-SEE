import { Image, TouchableOpacity } from "react-native"
import images from "../assets/images"
import { itemSizes } from "../common/variables"
import PropTypes from 'prop-types';
import React from "react";
import auth from '@react-native-firebase/auth';
import { navigateAndReset } from "../navigators/RootNavigation";
import { Icon } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../theme/colors";
export const Back = (props) => {
    const {navigation} = props
    return(
        <TouchableOpacity
            style={{width:itemSizes.item30,height:itemSizes.item30}}
            onPress={()=>{
                try {
                    if(navigation.canGoBack())
                    {
                        navigation.goBack()
                    }
                    else{
                        navigateAndReset("UserSelectScreen")
                    }
                } catch (error) {
                    console.log(error)
                }
            }}
        >
            {/* <Image
                resizeMode="contain"
                source={images.backArrow}
                style={{width:itemSizes.item30,height:itemSizes.item30,tintColor:"#333"}}
            /> */}
            <Icon
                  as={MaterialCommunityIcons} 
                  name="chevron-left" 
                  color={colors.appPrimary}
                  size={"4xl"}
            />
        </TouchableOpacity>
    )
}
export const IconButton = (props) => {
    const {onPress,icon,containerStyle, iconStyle} = props
    return(
        <TouchableOpacity
            style={[containerStyle]}
            onPress={onPress}
        >
            <Image
                resizeMode="contain"
                source={icon}
                style={[{width:itemSizes.item25,height:itemSizes.item25},iconStyle]}
            />
        </TouchableOpacity>
    )
}
Back.propTypes = {
    navigation : PropTypes.object
}
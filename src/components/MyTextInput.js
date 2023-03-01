import { Image, Platform, StyleSheet, TextInput, View, ViewStyle } from "react-native"
import images from "../assets/images"
import { fontSizes, itemSizes, spacing } from "../common/variables"
import colors from "../theme/colors"
import React, { useState } from "react"
import fonts from "../../assets/fonts"
import PropTypes from 'prop-types';
import { IconButton } from "./ExportedComponents"
import { Text } from "react-native"
import { Icon } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const MyTextInput = (props) => {
    const { containerStyle,lowerBorder,nonEditable , iconName, isPass, placeholder, onChangeText, value, keyboardType,subPlace, placeholderTextColor } = props
    const [secureText, setSecureText] = useState(true)
    return (
        <View style={[containerStyle]}>
            <Text style={[styles.placeholderText,placeholderTextColor&&{color:placeholderTextColor},lowerBorder&&{marginLeft:spacing.small,marginBottom:0}]}>
                {placeholder}</Text>
            <View style={[styles.container,lowerBorder?styles.lowerBorderStyle:{borderWidth:1}]}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={isPass ? secureText : false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={subPlace}
                    editable={!nonEditable}
                    // placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor?placeholderTextColor:"rgba(256,256,256,0.3)"}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType ? keyboardType : "default"}
                />
               <Icon 
                    as={MaterialCommunityIcons} 
                    name={iconName} 
                    color={colors.borderColor}  
                    size={"lg"}
                />
                {/* {
                isPass
                &&
                <IconButton
                    onPress={()=>setSecureText(!secureText)}
                    icon={secureText?images.viewPass:images.hidePass}
                    iconStyle={styles.passStyle}
                />
            } */}
            </View>
        </View>
    )
}
MyTextInput.propTypes = {
    containerStyle: PropTypes.shape(ViewStyle),
    isPass: PropTypes.bool,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    iconName:PropTypes.string,
    keyboardType:PropTypes.string
}
export default MyTextInput
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: spacing.small,
       // borderWidth: 1,
        paddingVertical: Platform.OS == "ios" ? spacing.medium : spacing.small,
        paddingHorizontal:spacing.small,
        //paddingVertical:0,
        borderColor: colors.borderColor,
        alignItems: "center",
        backgroundColor: "transparent"
    },
    lowerBorderStyle:{
        borderBottomWidth:0.3,
        paddingVertical: Platform.OS == "ios" ? spacing.small : spacing.extraExtraSmall,
        paddingHorizontal:0,
        paddingRight:10
    },
    icon: {
        width: itemSizes.item15,
        height: itemSizes.item15,
        tintColor: colors.borderColor
    },
    input: {
        flex: 1,
        paddingHorizontal: spacing.semiMedium,
        fontFamily: fonts.semiBold,
        paddingVertical: 0,
        fontSize: fontSizes.extraExtraSmall,
        color: "white"
    },
    placeholderText: {
        fontSize: fontSizes.tiny,
        color: "rgba(255, 255, 255, 0.6)",
        fontFamily: fonts.semiBold,
        marginBottom:spacing.extraExtraSmall
    },
    passContainer: {

    },
    passStyle: {
        width: itemSizes.item20,
        height: itemSizes.item20,
        tintColor: colors.appSecondary
    }
})
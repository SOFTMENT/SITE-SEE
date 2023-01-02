import { Image, Platform, StyleSheet, TextInput, View, ViewStyle} from "react-native"
import images from "../assets/images"
import { fontSizes, itemSizes, spacing } from "../common/variables"
import colors from "../theme/colors"
import React, { useState } from "react"
import fonts from "../../assets/fonts"
import PropTypes from 'prop-types';
import { IconButton } from "./ExportedComponents"
const MyTextInput = (props) => {
    const {containerStyle,icon,isPass,placeholder,onChangeText,value,keyboardType} = props
    const [secureText,setSecureText] = useState(true)
    return(
        <View style={[styles.container,containerStyle]}>
            <Image
                style={styles.icon}
                source={icon}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={isPass?secureText:false}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor="lightgrey"
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType?keyboardType:"default"}
            />
            {
                isPass
                &&
                <IconButton
                    onPress={()=>setSecureText(!secureText)}
                    icon={secureText?images.viewPass:images.hidePass}
                    iconStyle={styles.passStyle}
                />
            }
        </View>
    )
}
MyTextInput.propTypes = {
    containerStyle:PropTypes.shape(ViewStyle),
    isPass:PropTypes.bool,
    placeholder:PropTypes.string,
    onChangeText:PropTypes.func,
    value:PropTypes.string
}
export default MyTextInput
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        borderRadius:spacing.small,
        //borderWidth:2,
        padding:Platform.OS=="ios"?spacing.medium:spacing.small,
        //paddingVertical:0,
        borderColor:colors.appPrimaryLight,
        alignItems:"center",
        backgroundColor:"white"
    },
    icon:{
        width:itemSizes.item20,
        height:itemSizes.item20,
        tintColor:colors.appSecondary
    },
    input:{
        flex:1,
        paddingHorizontal:spacing.semiMedium,
        fontFamily:fonts.semiBold,
        paddingVertical:0,
        fontSize:fontSizes.extraExtraSmall,
        color:"#333"
    },
    passContainer:{

    },
    passStyle:{
        width:itemSizes.item20,
        height:itemSizes.item20,
        tintColor:colors.appSecondary
    }
})
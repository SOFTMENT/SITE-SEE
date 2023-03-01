import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import images from "../../assets/images";
import React from "react";
const styles = StyleSheet.create({
    imageStyle:{
        width:50,
        height:50,
        borderRadius:25
    }
})
export default AvatarIcon = ({uri,style,size}) => {
    return(
        <FastImage
            style={[styles.imageStyle,size&&{width:size,height:size,borderRadius:size/2},style]}
            resizeMode={"cover"}
            source={{uri:uri}}
            defaultSource={images.imagePlaceholder}
        />
    )
}
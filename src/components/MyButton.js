import PropTypes from 'prop-types'
import React from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"
import fonts from "../../assets/fonts"
import { fontSizes, spacing } from "../common/variables"
import colors from "../theme/colors"
const MyButton = (props) => {
    const { containerStyle, onPress, title, loading, txtStyle,icon,disabled} = props
    return (
        <TouchableOpacity
            disabled={loading || disabled}
            onPress={onPress}
            style={[styles.container,containerStyle]}>
            <Text style={[styles.next,txtStyle]}>{title}</Text>
            {loading&&<ActivityIndicator size={"small"} color={colors.backgroundColor} style={{marginLeft:5}}/>}
            {!loading && icon}
        </TouchableOpacity>
    )
}
MyButton.propTypes = {
    containerStyle: PropTypes.object,
    onPress: PropTypes.func,
    title: PropTypes.string
}
export default MyButton
const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        backgroundColor:colors.btnColor,
        justifyContent: 'center',
        alignItems: "center",
        padding: spacing.medium,
        width: "100%",
        alignSelf: 'center',
        borderRadius: spacing.small
    },
    next:{
        color:"black",
        fontFamily:fonts.bold,
        fontSize:fontSizes.extraExtraSmall
    },
})
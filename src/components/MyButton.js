import PropTypes from 'prop-types'
import React from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"
import fonts from "../../assets/fonts"
import { fontSizes, spacing } from "../common/variables"
import colors from "../theme/colors"
const MyButton = (props) => {
    const { containerStyle, onPress, title, loading, txtStyle,icon} = props
    return (
        <TouchableOpacity
            disabled={loading}
            onPress={onPress}
            style={[styles.container,containerStyle]}>
            <Text style={[styles.next,txtStyle]}>{title}</Text>
            {loading&&<ActivityIndicator size={"small"} color={"white"} style={{marginLeft:5}}/>}
            {icon}
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
        backgroundColor: colors.appSecondary,
        justifyContent: 'center',
        alignItems: "center",
        padding: spacing.medium,
        width: "100%",
        alignSelf: 'center',
        borderRadius: spacing.small
    },
    next:{
        color:"white",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall
    },
})
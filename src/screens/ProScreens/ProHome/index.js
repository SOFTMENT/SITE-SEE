import { startCase } from "lodash"
import { Avatar } from "native-base"
import React, { useState } from "react"
import { Platform, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { connect } from "react-redux"
import Util from "../../../common/util"
import AvatarIcon from "../../../components/AvatarIcon"
import styles from "./styles"
const ProHome = (props) => {
    const insets = useSafeAreaInsets()
    const {userData, navigation} = props
    const {profilePic,name} = userData ?? {}
    const [trainers,setTrainers] = useState([])
    return (
        <View style={[styles.container, Platform.OS == "ios" && { paddingTop: insets.top }]}>
            <View style={styles.topView}>
                <View>
                    <Text style={styles.hello}>Hello,</Text>
                    <Text style={styles.name}>{startCase(name)}</Text>
                </View>
                <AvatarIcon
                    size={60}
                    uri={profilePic}
                />
                    {/* {Util.getNameInitial(name)}
                </Avatar> */}
            </View>
            
        </View>
    )
}
const mapStateToProps = (state) => {
    return{
        userData:state.user.userData
    }
}
export default connect(mapStateToProps)(ProHome)
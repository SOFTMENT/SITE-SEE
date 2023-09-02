import firestore from '@react-native-firebase/firestore'
import { startCase } from "lodash"
import { Icon, Pressable } from "native-base"
import React, { useEffect, useState } from "react"
import { FlatList, Platform, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { connect } from "react-redux"
import AvatarIcon from '../../../components/AvatarIcon'
import TrainerCard from "./components/TrainerCard"
import styles from "./styles"
const ProHome = (props) => {
    const insets = useSafeAreaInsets()
    const { userData, navigation } = props
    const { profilePic, name } = userData
    const [trainers, setTrainers] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        try {
            firestore()
                .collection("Users")
                .where("isUser", "==", false)
                .where("status","==","approved")
                .where("accountStatus", "==", true)
                .get()
                .then(snapshot => {
                    const data = []
                    console.log(snapshot.size)
                    snapshot.forEach((doc) => {
                        data.push(doc.data())
                    })
                    setTrainers(data)
                })

        } catch (error) {

        }
    }
    const renderItem = ({ item }) => {
        return (
            <TrainerCard data={item} navigation={navigation} />
        )
    }
    const keyExtractor = (item) => {
        return item.uid
    }
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
                    style={{borderWidth:1,borderColor:"gray"}}
                    //borderWidth={1}   
                />
                    {/* {Util.getNameInitial(name)}
                </Avatar> */}
            </View>
            <Pressable style={styles.searchBox} backgroundColor={"gray.800"} onPress={()=>navigation.navigate("SearchScreen")}>
                <Icon
                    as={MaterialCommunityIcons}
                    size="lg"
                    name='magnify'
                    mr={5}
                />
                <Text style={styles.placeholder}>Search Trainers</Text>
            </Pressable>
            <FlatList
                data={trainers}
                style={{ flex: 1 }}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        userData: state.user.userData
    }
}
export default connect(mapStateToProps)(ProHome)
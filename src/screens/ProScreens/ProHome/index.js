import { Avatar, HStack, Icon, IconButton, Input } from "native-base"
import React, { useEffect, useState } from "react"
import { FlatList, Platform, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import images from "../../../assets/images"
import styles from "./styles"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { spacing } from "../../../common/variables"
import { connect } from "react-redux"
import Util from "../../../common/util"
import { startCase } from "lodash"
import firestore from '@react-native-firebase/firestore';
import TrainerCard from "./components/TrainerCard"
const ProHome = (props) => {
    const insets = useSafeAreaInsets()
    const {userData, navigation} = props
    const {profileUrl,name} = userData ?? {}
    const [trainers,setTrainers] = useState([])
    useEffect(()=>{
        getData()
    },[])
    const getData = () => {
        try {
            firestore()
            .collection("Users")
            .where("isUser","==",false)
            .get()
            .then(snapshot=>{
                const data = []
                console.log(snapshot.size)
                snapshot.forEach((doc)=>{
                    data.push(doc.data())
                })
                setTrainers(data)
            })

        } catch (error) {
            
        }
    }
    const renderItem = ({item})=>{
        return(
            <TrainerCard data={item} navigation={navigation}/>
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
                <Avatar
                    size={"lg"}
                    source={{uri:profileUrl}}
                    bg={"gray.700"}
                >
                    {Util.getNameInitial(name)}
                </Avatar>
            </View>
            <HStack space={2} my={5}>
                <Input
                    placeholder="Search" 
                    variant="outlined" 
                    flex={1}
                    borderRadius={10} 
                    py={5}
                    color={"white"}
                    bg={"gray.800"}
                    //borderWidth={0}
                    InputLeftElement={
                        <Icon size={"xl"} 
                            name="magnify" 
                            color="gray.300" 
                            marginLeft={spacing.extraExtraSmall}
                            as={MaterialCommunityIcons} />
                    } 
                />
                <IconButton
                    variant={"solid"}
                    bg={"gray.800"}
                    borderRadius={10}
                    _icon={{
                        size:"xl" ,
                        name:"filter-variant" ,
                        color:"gray.300" ,
                        marginLeft:spacing.extraExtraSmall,
                        as:MaterialCommunityIcons
                    }}
                />
            </HStack>
            <FlatList
                data={trainers}
                style={{flex:1}}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    )
}
const mapStateToProps = (state) => {
    return{
        userData:state.user.userData
    }
}
export default connect(mapStateToProps)(ProHome)
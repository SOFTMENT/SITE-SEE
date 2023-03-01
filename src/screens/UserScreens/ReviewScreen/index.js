import { Avatar, HStack, Icon, Progress, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Util from '../../../common/util'
import { spacing } from '../../../common/variables'
import Header from '../../../components/Header'
import colors from '../../../theme/colors'
import styles from './styles'
import firestore from '@react-native-firebase/firestore'
import AvatarIcon from '../../../components/AvatarIcon'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
//vaibhav834.sharma@gmail.com
//123456
const ReviewScreen = (props) => {
    // Create formatter (English).
    const timeAgo = new TimeAgo("en-US")
    const { navigation, route } = props
    const { trainerData } = route.params
    const { thumbnailUrl, videoUrl, name, ratingCount,ratingObj, experience, trainingFee, about, workingTime, uid, profilePic } = trainerData
    const [reviews,setReviews] = useState([])
    useEffect(()=>{
        loadReviews()
    },[])
    const loadReviews = () => {
        firestore()
        .collection("Users")
        .doc(uid)
        .collection("Reviews")
        .get()
        .then((snapshot)=>{
            const l = []
            snapshot.forEach(doc=>{
                l.push(doc.data())
            })
            setReviews(l)
        })
    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.listItem}>
                <HStack alignItems={"center"}>
                    <AvatarIcon uri={item.userPic}/>
                    <Text style={styles.name}>{item.name}</Text>
                    <HStack alignItems={"center"} space={1} mx={3} py={0.5} px={2} bg={"white"} borderRadius={3}>
                        <Icon as={MaterialCommunityIcons}
                            name="star"
                            color={colors.ratingColor}
                            size={4}
                        />
                        <Text style={styles.rating}>{item.rating}</Text>
                    </HStack>
                    <Text style={styles.ago}>{timeAgo.format(item.createTime.toDate())}</Text>
                </HStack>
                <Text style={styles.reviewText}>
                    {item.review}
                </Text>
            </View>
        )
    }
    const keyExtractor = (item) => item.id
    return (
        <View style={styles.container}>
            <Header title="Reviews" back navigation={navigation} />
            <View style={styles.mainView}>
                <HStack alignItems={"center"}>
                    <Text style={styles.left}>{Util.calculateRating(ratingObj,ratingCount)}</Text>
                    <VStack flex={0.7}>
                        {
                            Object.keys(ratingObj).map(key=>{

                                return(
                                    <HStack alignItems={"center"} mb={2}>
                                        <Text style={styles.ratingNum}>{key}</Text>
                                        <Progress
                                            flex={0.9}
                                            value={(ratingObj[key] / ratingCount)*100}
                                            size={"sm"}
                                            colorScheme="yellow"
                                            
                                        />
                                    </HStack>
                                )
                            })
                        }
                    </VStack>
                </HStack>
                
                <Text style={styles.review}>{"Reviews"}</Text>
                <View style={{ flex: 1 }}>
                    <FlatList
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        data={reviews}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        style={{ marginVertical: spacing.small }}
                    // style={{flex:1}}
                    />
                </View>
                {/* <MyButton
                    title={"Write a review"}
                    //containerStyle={styles.btn}
                    onPress={handleNav}
                    icon={
                        <Icon as={MaterialCommunityIcons}
                            name="chevron-right"
                            color={"black"}
                            size={6}
                        />
                    }
                //onPress={handleRegister}
                //loading={loading}
                /> */}
            </View>
        </View>
    )
}

export default ReviewScreen

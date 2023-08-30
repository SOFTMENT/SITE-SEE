import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'
import FastImage from 'react-native-fast-image'
import { Card, HStack, Icon } from 'native-base'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import colors from '../../../../theme/colors'
import {distanceBetween} from 'geofire-common'
import { useSelector } from 'react-redux'
export default function NearbyHome(props) {
    const { item, navigation } = props
    const {latitude,longitude} = useSelector(state=>state.user.currentPosition)
    const {lat,lng} = item.location
    const distance = distanceBetween([latitude,longitude],[lat,lng])
    return (
       <TouchableOpacity onPress={()=>navigation.navigate("AdDetail", { item })}>
        <Card style={styles.container} padding={0} on>
            <FastImage
                source={{ uri: item.spaceImages[0]}}
                style={styles.image}
            />
            <View style={{padding:7}}>
                <Text style={styles.spaceTitle}>
                    {item.title}
                </Text>
                <HStack mt={2}>
                    <Icon
                        as={MaterialCommunityIcons}
                        size="sm"
                        name='map-marker-outline'
                        mr={1}
                        color={colors.appPrimary}
                    />
                    <Text style={styles.subtitle}>{distance.toFixed(1)} km away</Text>
                </HStack>
            </View>
        </Card>
       </TouchableOpacity>
    )
}
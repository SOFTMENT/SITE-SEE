import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'native-base'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import CenteredLoader from '../../../components/CenteredLoader'
import Header from '../../../components/Header'
import NoResults from '../../../components/NoResults'
import SpaceCard from '../SpaceCard'
import styles from './styles'
const radius = 10 * 1000
export default function FavoritesScreen(props) {
    const { navigation, route } = props
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [noData, setNoData] = useState(false)
    const {favorites} = useSelector(state=>state.user)
    useEffect(() => {
       getFavorites()
    }, [favorites])
    const getFavorites = async () => {
        try {
            setLoading(true)
            const favouritesData = []
            for (const [index,obj] of favorites.entries()){
                const docSnap = 
                await firestore()
                .collection("Space")
                .doc(obj.id)
                .get()
                //console.log(docSnap.exists)
                if(docSnap.exists){
                    console.log("----fav",docSnap.data())
                    favouritesData[index] = docSnap.data()
                }
            }
            if (favouritesData.length == 0) setNoData(true)
            else setNoData(false)
            setData(favouritesData)
        } catch (error) {

        }
        finally {
            setLoading(false)
        }
    }
    const renderCard = ({ item }) => {
        return <SpaceCard data={item} navigation={navigation} isFav/>
    }
    const keyExtractor = (item) => {
        return item.id
    }
    return (
        <View style={styles.container}>
            <Header
                title={"Favourites"}
                back
                navigation={navigation}
                // rightIcon={"tune-vertical-variant"}
                // onRightIconPress={onOpen}
            />
            {
                loading ?
                    <CenteredLoader /> :
                    (
                        noData ?
                            <NoResults />
                            :
                            <FlatList
                                data={data}
                                renderItem={renderCard}
                                keyExtractor={keyExtractor}
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                            />
                    )
            }
        </View>
    )
}
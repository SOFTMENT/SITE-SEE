import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import CenteredLoader from '../../components/CenteredLoader';
import { View } from 'react-native';
import { navigateAndReset } from '../../navigators/RootNavigation';
import styles from './styles';
const HomeScreen = (props) => {
    const { route, navigation } = props
    const { uid } = route.params
    useEffect(() => {
        try {
            firestore()
                .collection("Users")
                .doc(uid)
                .get()
                .then(user => {
                    if (user.exists) {
                        if (user.data().profileCompleted)
                            if (user.data().isUser) {
                                navigateAndReset("UserBottomTab")
                            }
                            else
                                navigateAndReset("ProBottomTab")
                        else {
                            if (user.data().isUser) {
                                navigateAndReset("MyUserOnBoardStack")
                            }
                            else
                                navigateAndReset("ProOnBoard")
                        }
                        //setLoading(false)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return <CenteredLoader />
}
export default HomeScreen
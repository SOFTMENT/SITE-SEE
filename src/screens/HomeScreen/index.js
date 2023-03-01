import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import CenteredLoader from '../../components/CenteredLoader';
import { navigateAndReset } from '../../navigators/RootNavigation';
import { setUserData } from '../../store/userSlice';
const HomeScreen = (props) => {
    const { route, navigation} = props
    console.log(setUserData)
    const dispatch = useDispatch()
    const uid = auth().currentUser.uid
    useEffect(() => {
        try {
            firestore()
                .collection("Users")
                .doc(uid)
                .get()
                .then(user => {
                    if (user.exists) {
                        if (user.data().profileCompleted)
                            {
                                dispatch(setUserData(user.data()))
                            if (user.data().isUser) {
                                navigateAndReset("UserBottomTab")
                            }
                            else
                                navigateAndReset("ProBottomTab")
                            }
                        else {
                            if (user.data().isUser) {
                                navigateAndReset("MyUserOnBoardStack")
                            }
                            else
                                navigateAndReset("MyProOnBoardStack")
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
const mapDispatchToProps = (dispatch) => {
    return{
        setUserData:(data)=>dispatch(setUserData(data))
    }
}
export default connect(null,mapDispatchToProps)(HomeScreen)
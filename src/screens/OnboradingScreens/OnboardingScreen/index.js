import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VStack } from 'native-base'
import colors from '../../../theme/colors'
import FastImage from 'react-native-fast-image'
import images from '../../../assets/images'
import MyButton from '../../../components/MyButton'
import { spacing } from '../../../common/variables'
export default function OnboardingScreen(props) {
  const {navigation} = props
  const inset = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingTop: inset.top+spacing.medium }]}>
      <VStack space={5} justifyContent={"space-between"} alignItems={"center"} flexDirection="row">
        <View style={[styles.borderView, { backgroundColor: colors.btnColor }]} />
        <View style={styles.borderView} />
      </VStack>
      <View style={styles.imageView}>
        <FastImage
          source={images.onboard}
          style={styles.img}
        />
        <View style={styles.imageBack} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.heading}>
          Reach out to vendors for advertise your business.
        </Text>
        {/* <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur estibulu.
        </Text> */}
        <MyButton
          title="Continue"
          onPress={()=>{
            navigation.navigate("OnboardingScreen1")
          }}
          containerStyle={{
            position:"absolute",
            bottom:0
          }}
        />
      </View>
    </View>
  )
}

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VStack } from 'native-base'
import colors from '../../../theme/colors'
import FastImage from 'react-native-fast-image'
import images from '../../../assets/images'
import MyButton from '../../../components/MyButton'
import { navigateAndReset } from '../../../navigators/RootNavigation'
import { spacing } from '../../../common/variables'
export default function OnboardingScreen1(props) {
  const {navigation} = props
  const inset = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingTop: inset.top + spacing.medium }]}>
      <VStack space={5} justifyContent={"space-between"} alignItems={"center"} flexDirection="row">
        <View style={[styles.borderView]} />
        <View style={[styles.borderView, { backgroundColor: colors.btnColor }]} />
      </VStack>
      <View style={styles.imageView}>
        <FastImage
          source={images.onboard1}
          style={styles.img}
        />
        <View style={styles.imageBack} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.heading}>
          Offer physical space for advertising & Offer designing services.
        </Text>
        {/* <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur estibulu.
        </Text> */}
        <MyButton
          onPress={()=>{
            navigateAndReset("LogOrRegister")
          }}
          title="Lets Get Started"
          containerStyle={{
            position:"absolute",
            bottom:0
          }}
        />
      </View>
    </View>
  )
}

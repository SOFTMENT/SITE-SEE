import { Icon, IconButton, View } from "native-base"
import React from "react"
import Video from "react-native-video"
import styles from "./styles"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
const VideoPlayer = (props) => {
    const { route, navigation } = props
    const { videoUrl } = route.params
    return (
        <View style={styles.container}>
            <IconButton
                    onPress={()=>navigation.goBack(null)}
                    _pressed={{backgroundColor:"transparent"}}
                    style={styles.backIcon}
                    zIndex={100}
                    icon={
                        <Icon
                        as={MaterialCommunityIcons}
                        size="4xl"
                        name="chevron-left"
                        color={"white"}
                        />
                    }
                />
            <Video source={{ uri: videoUrl }}   // Can be a URL or a local file.                                      // Store reference
                //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={(err)=>console.log(err)}               // Callback when video cannot be loaded
                style={styles.backgroundVideo} 
                controls={true}
            />
                
        </View>
    )
}
export default VideoPlayer
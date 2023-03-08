import DocumentPicker,{ types } from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs'
export default {
    async pickDocument(image) {
        try {
            const result = await DocumentPicker.pick({
                allowMultiSelection: false,
                type: image ? [types.images] : [types.video],
                copyTo: "documentDirectory"

            })
            console.log(result[0].fileCopyUri)
            return {name:result[0].name,uri:result[0].fileCopyUri,type:result[0].type}
        } catch (error) {
            console.log(error)
            if (DocumentPicker.isCancel(error)) {
                throw "Please select a file"
                // User cancelled the picker, exit any dialogs or menus and move on
            }
            throw "something went wrong"
        }

    },
    async pickVideo(image) {
        try {
            const result = await DocumentPicker.pick({
                allowMultiSelection: false,
                type: image ? [types.images] : [types.video],
                copyTo: "documentDirectory"

            })
            console.log(result[0].fileCopyUri)
            return result[0]
        } catch (error) {
            console.log(error)
            if (DocumentPicker.isCancel(error)) {
                throw "Please select a file"
                // User cancelled the picker, exit any dialogs or menus and move on
            }
            throw "something went wrong"
        }

    },
    uploadImage : async(imageLoc,source)=>{
        const reference = storage().ref(imageLoc); 
        const data = await RNFS.readFile(decodeURI(source.uri), 'base64')
        await reference.putString(data,"base64",{
            contentType:source.type,

        })
        const url = await reference.getDownloadURL()
        return url
    }
}
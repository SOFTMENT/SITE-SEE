import { Linking } from "react-native"

export default {
     makeCall(phone){
        Linking.openURL(`tel:${phone}`)
    },
    openBrowser(link){
        Linking.openURL(`${link}`)
    },
    openMail(mail){
        Linking.openURL(`mailto:${mail}`)
    },
    openSms(phone){
        Linking.openURL(`sms:${phone}`)
    }
}
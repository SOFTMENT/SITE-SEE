import { AlertDialog, Button, Input, Text, Toast, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import Util from "../../common/util";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/userSlice";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const UpdateVendorProfileDialog = ({visible,setMenuOpen,title}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {businessName,webUrl:webUrll,websiteName:webName,userType} = useSelector(state => state.user.userData)??{};
  const [value,setValue] = useState(businessName??"")
  const [webUrl,setWebUrl] = useState(webUrll??'')
  const [websiteName,setWebsiteName] = useState(webName??'')
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const toast = useToast();
  useEffect(()=>{
    if(isOpen){
      setValue(businessName??"")
      setWebUrl(webUrl??"")
    }
  },[isOpen])
  const onClose = () => {
    setIsOpen(false)
    setMenuOpen(false)
  };
  const cancelRef = React.useRef(null);
  useEffect(()=>{
    setIsOpen(visible)
  },[visible])
  const getUserData = () => {
    firestore()
      .collection('Suppliers')
      .doc(auth().currentUser.uid)
      .get()
      .then(res => {
        dispatch(setUserData({...res.data(),userType}));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleSubmit = async() => {
    if(!value.trim().length){
      Toast.show({
        description:"Please add a Business name.",
        style:{marginBottom:30}
      })
      return
    }
    if (websiteName.trim().length && !webUrl.trim().length) {
      Keyboard.dismiss()
      Toast.show({
          description:"Please provide Website Name with Website Url",
          style:{marginBottom:30}
      })
      return
    }
    if (!websiteName.trim().length && webUrl.trim().length) {
        Keyboard.dismiss()
        Toast.show({
            description:"Please provide Website Name with Website Url",
            style:{marginBottom:30}
        })
        return
    }
    setLoading(true)
    const res = await checkForDuplicateUsername()
    if(res){
      Keyboard.dismiss()
      toast.show({
        avoidKeyboard:true,
        description:"This business name already exists.",
        style:{
          marginBottom:30,
        },
        duration:3000
      })
    }
    else{
      const obj = {
        businessName:value.trim(),
        webUrl:webUrl.trim(),
        websiteName:websiteName.trim()
      }
      if(webUrl.trim().length){
        obj.webUrl = webUrl.trim()
      }
      if(websiteName.trim().length){
          obj.websiteName = websiteName.trim()
      }
      await firestore()
      .collection("Suppliers")
      .doc(auth().currentUser.uid)
      .update(obj)
      toast.show({
        avoidKeyboard:true,
        description:"Profile updated!",
        style:{
          marginBottom:30,
        },
        duration:3000
      })
      getUserData()
      onClose()
    }
    setLoading(false)
    
  }
  const checkForDuplicateUsername = async() => {
    if(businessName != value.trim()){
      const docs = await firestore()
      .collection("Suppliers")
      .where("businessName","==",value)
      .get()
      if(docs.empty){
        return false
      }
      else{
        return true
      }
    }
    return false
   
  }
  return( 
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{`Update ${title}`}</AlertDialog.Header>
          <KeyboardAwareScrollView>

          <AlertDialog.Body>
            <Text>Business Name</Text>
            <Input
                placeholder={"Business Name"}
                value={value}
                onChangeText={(txt)=>setValue(txt)}
            />
            <Text mt={2}>Website Name</Text>
            <Input
                placeholder={"Website Name"}
                value={websiteName}
                onChangeText={(txt)=>setWebsiteName(txt)}
            />
            <Text mt={2}>Website Url</Text>
            <Input
                placeholder={"Website Url"}
                value={webUrl}
                onChangeText={(txt)=>setWebUrl(txt)}
                
                keyboardType="url"
            />
          </AlertDialog.Body>
          </KeyboardAwareScrollView>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={handleSubmit} isLoading={loading}>
                Submit
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    )
};
export default UpdateVendorProfileDialog
    
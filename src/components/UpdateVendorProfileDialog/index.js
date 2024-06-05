import { AlertDialog, Button, Input, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import Util from "../../common/util";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/userSlice";
import { Keyboard } from "react-native";
const UpdateVendorProfileDialog = ({visible,setMenuOpen,title}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {businessName,webUrl:webUrll} = useSelector(state => state.user.userData)??{};
  const [value,setValue] = useState(businessName??"")
  const [webUrl,setWebUrl] = useState(webUrll??'')
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
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get()
      .then(res => {
        dispatch(setUserData(res.data()));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleSubmit = async() => {
    if(!value.trim().length){
      Util.showMessage("error","Please add a Business name.")
      return
    }
    else if(!webUrl.trim().length){
      Util.showMessage("error","Please add a website url.")
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
      await firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .update({
        name:value.trim(),
        webUrl:webUrl.trim()
      })
      getUserData()
      onClose()
    }
    setLoading(false)
    
  }
  const checkForDuplicateUsername = async() => {
    if(businessName != value.trim()){
      const docs = await firestore()
      .collection("Users")
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
          <AlertDialog.Body>
            <Input
                placeholder={"Business Name"}
                value={value}
                onChangeText={(txt)=>setValue(txt)}
            />
            <Input
                placeholder={"Website Url"}
                value={webUrl}
                onChangeText={(txt)=>setWebUrl(txt)}
                mt={2}
                keyboardType="url"
            />
          </AlertDialog.Body>
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
      </AlertDialog>)
};
export default UpdateVendorProfileDialog
    
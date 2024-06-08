import { AlertDialog, Button, Input } from "native-base";
import React, { useEffect, useState } from "react";
import Util from "../../common/util";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/userSlice";
const UpdateNameDialog = ({visible,setMenuOpen,title}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {userType,name} = useSelector(state=>state.user.userData)
  const [value,setValue] = useState(name??"")
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
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
      .collection(userType)
      .doc(auth().currentUser.uid)
      .get()
      .then(res => {
        dispatch(setUserData({...res.data(),userType}));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleSubmit = () => {
    if(!value.trim()){
      Util.showMessage("error","Please add a name.")
      return
    }
    setLoading(true)
    firestore()
    .collection(userType)
    .doc(auth().currentUser.uid)
    .update({
      name:value
    })
    .then(()=>{
      setValue(value)
      getUserData()
      onClose()
    })
    .finally(()=>{
      setLoading(false)
    })
  }
  return( 
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{`Update ${title}`}</AlertDialog.Header>
          <AlertDialog.Body>
            <Input
                placeholder={title}
                value={value}
                onChangeText={(txt)=>setValue(txt)}
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
export default UpdateNameDialog
    
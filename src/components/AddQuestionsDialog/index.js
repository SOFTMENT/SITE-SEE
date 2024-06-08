import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { AlertDialog, Button, Input, Toast } from "native-base";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
const AddQuestionsDialog = ({visible,onClose}) => {
  const [value,setValue] = useState('')
  const [loading,setLoading] = useState(false)
  const {userType} = useSelector(state=>state.user.userData)
  const cancelRef = React.useRef(null);
  const handleSubmit = async() => {
    if(!value.trim().length){
      Toast.show({
        description:"Please add a Question.",
        style:{marginBottom:30}
      })
      return
    }
    setLoading(true)
    await firestore()
    .collection(userType)
    .doc(auth().currentUser.uid)
    .collection("Questions") 
    .add({
      title:value.trim(),
      createDate:firebase.firestore.FieldValue.serverTimestamp()
    })
    setLoading(false)
    handleClose()
  }
  const handleClose = () => {
    setValue('')
    onClose()
  }
  return( 
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={visible} onClose={handleClose}>

        <AlertDialog.Content>

          <AlertDialog.CloseButton />
          <AlertDialog.Header>{`Add Question`}</AlertDialog.Header>

          <AlertDialog.Body>
            <Input
                placeholder={"Questions"}
                value={value}
                onChangeText={(txt)=>setValue(txt)}
            />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={handleClose} ref={cancelRef}>
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
export default AddQuestionsDialog
    
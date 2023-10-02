import { AlertDialog, Button, Input } from "native-base";
import React, { useEffect } from "react";
import Util from "../../common/util";

const ReportUserDialog = ({visible,setMenuOpen,type}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => {
    setIsOpen(false)
    setMenuOpen(false)
  };
  const cancelRef = React.useRef(null);
  useEffect(()=>{
    setIsOpen(visible)
  },[visible])
  return( 
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{`Report ${type}`}</AlertDialog.Header>
          <AlertDialog.Body>
            <Input
                placeholder="Comment"
            />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={()=>{
                Util.showMessage("error","We have recieved your report!")
                onClose()
              }}>
                Submit
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>)
};
export default ReportUserDialog
    
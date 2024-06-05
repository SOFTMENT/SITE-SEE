import { Actionsheet, Box, KeyboardAvoidingView, Text, View,  } from 'native-base'
import React from 'react';
import MyTextInput from '../MyTextInput';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import {useKeyboardBottomInset} from '../../hooks/useKeyboardBottomInset';
const UserNameActionSheet = ({isOpen,onClose,query,loading,users,handleTag,callDebounceFuntion}) => {
   const bottomInset = useKeyboardBottomInset();
   return (
    <Actionsheet isOpen={isOpen} onClose={onClose} useRNModal={true} >
      <Actionsheet.Content>
        <View h={"100%"} w={"100%"}>
            <MyTextInput
                containerStyle={{marginTop: 20,width:"100%"}}
                placeholder={'Tag Supplier'}
                // value={query}
                onChangeText={txt => callDebounceFuntion(txt)}
            />
            {
                loading &&
                <ActivityIndicator size={"small"}/>
            }
            {users.slice(0,5).map(item=>{
                return(
                <TouchableOpacity 
                    onPress={()=>handleTag(item.uid,item.name)} 
                    style={{marginVertical:5,width:"100%",padding:6,borderWidth:1,borderRadius:10,borderColor:colors.borderColor}}>
                    <Text>@ {item.name}</Text>
                </TouchableOpacity>
                )
            })}
        </View>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
export default UserNameActionSheet

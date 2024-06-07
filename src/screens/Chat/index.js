import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import TimeAgo from 'javascript-time-ago';
import {
  Center,
  HStack,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  useDisclose
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import images from '../../assets/images';
import Helper from '../../common/Helper';
import Util from '../../common/util';
import AvatarHeader from '../../components/AvatarHeader';
import PhotoPicker from '../../components/PhotoPicker';
import styles from './styles';
import colors from '../../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../common/variables';
import LoaderComponent from '../../components/LoaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CenteredLoader from '../../components/CenteredLoader';
const Chat = props => {
  const {userData, navigation, route} = props;
  const {userType} = userData
  const {params} = route;
  const timeAgo = new TimeAgo('en-US');
  const [lastMessage, setLastMessage] = useState(params.lastMessage);
  const [chats, setChats] = useState([]);
  const uid = auth().currentUser.uid;
  const {isOpen, onToggle, onClose, onOpen} = useDisclose();
  const [loader,setLoader] = useState(false)
  const [supplierData,setSupplierData] = useState(null)
  const [questions,setQuestions] = useState([])
  const [loading,setLoading] = useState(false)
  const [noData,setNoData] = useState(false)
  const handleImage = index => {
    onToggle();
  };
  const selectImage = img => {
    if (img) {
      sendImage(img);
    }
  };
  useEffect(()=>{
    if(userType == "User")
    getPreDeterminedQuetionsAndResponses()
  },[])
  useEffect(()=>{
    console.log('sss')
    let timer = null;
    const updateAutoResponse = async() =>{
      if(supplierData?.autoChatMode){
        if(supplierData?.autoChatMode == "questions"){
          console.log('asdas')
          if(chats.length % 2 == 1){
            timer = setTimeout(()=>{
              let questionLength = questions.length
              let questionIndex = Math.floor(chats.length / 2 )
              console.log(questions,questionIndex)
              if(questionIndex+1>questionLength)
              return
              let docId = firestore().collection('Chats').doc().id;
              console.log(
                questions[questionIndex]?.title,
                supplierData.uid,
              )
              const messageObj = {
                message: questions[questionIndex]?.title,
                senderUid: supplierData.uid,
                messageId: docId,
                //senderImage:profilePic,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                //senderName: name
              };
              setMessage(docId, uid, supplierData?.uid, messageObj);
              setMessage(docId, supplierData?.uid, uid, messageObj);
              setMessage(supplierData?.uid, uid, 'LastMessage', {
                message: questions[questionIndex]?.title,
                senderUid: supplierData?.uid,
                isRead: false,
                //senderImage:lastMessage.senderImage,
                //senderName: lastMessage.senderName,
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });
              setMessage(uid, supplierData.uid, 'LastMessage', {
                message: questions[questionIndex]?.title,
                senderUid: uid,
                isRead: true,
                //senderImage:profilePic,
                //senderName: name,
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });
              },2000)
          }
        }
        else if(supplierData?.autoChatMode == "response"){
          if(chats.length == 1){
            try {
              timer = setTimeout(()=>{
                let docId = firestore().collection('Chats').doc().id;
                const messageObj = {
                  message: supplierData.autoResponse,
                  senderUid: supplierData.uid,
                  messageId: docId,
                  //senderImage:profilePic,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                  //senderName: name
                };
                setMessage(docId, uid, supplierData?.uid, messageObj);
                setMessage(docId, supplierData?.uid, uid, messageObj);
                setMessage(supplierData?.uid, uid, 'LastMessage', {
                  message: supplierData?.autoResponse,
                  senderUid: supplierData?.uid,
                  isRead: false,
                  //senderImage:lastMessage.senderImage,
                  //senderName: lastMessage.senderName,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
                setMessage(uid, supplierData.uid, 'LastMessage', {
                  message: supplierData?.autoResponse,
                  senderUid: uid,
                  isRead: true,
                  //senderImage:profilePic,
                  //senderName: name,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
                },2000)
              //setChatText("")
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }
    if(userType == "User")
    updateAutoResponse()
    return () => {
      if(timer)clearTimeout(timer)
    }
  },[chats])
  useEffect(() => {
    if (lastMessage) {
      const {senderUid} = lastMessage;
      if(lastMessage.regarding){
       handleImageWithText(lastMessage)
      }
      getRecipientData(senderUid);
      setLoading(true)
      const unsubscribe = firestore()
        .collection('Chats')
        .doc(uid)
        .collection(senderUid)
        .orderBy('date', 'desc')
        .onSnapshot(querySnapshot => {
          const newArray = [];
          querySnapshot.forEach(doc => {
            newArray.push({...doc.data(), id: doc.id});
          });
          setChats(newArray);
          if (newArray.length == 0) setNoData(true);
          else setNoData(false);
          setLoading(false);
        });
      return unsubscribe;
    }
  }, []);
  const getPreDeterminedQuetionsAndResponses = () => {
    const {senderUid} = lastMessage;
    AsyncStorage.getItem("userType")
    .then(async val=>{
      if(val && val == "User"){
        const res = await firestore()
        .collection("Users")
        .doc(senderUid)
        .get()
        if(res.exists)
          setSupplierData(res.data())
        const res1 = await firestore()
          .collection("Users")
          .doc(senderUid)
          .collection("Questions")
          .orderBy("createDate","asc")
          .get()
          if(!res1.empty)
            {
              const localData = []
              res1.docs.map(doc=>{
                localData.push(doc.data())
              })
              console.log(localData)
              setQuestions(localData)
            }
      }
    })
  }
  const getRecipientData = async senderUid => {
    const res = await firestore().collection('Users').doc(senderUid).get();
    const data = res.data();
    setLastMessage({
      ...lastMessage,
      senderImage: data.profilePic,
      senderName: data.name,
    });
  };
  const navigateToListing = (item) => {
    //console.log(item)
    try {
      firestore()
      .collection("Listing")
      .doc(item.listingId)
      .get()
      .then((res)=>{
        if(res.exists){
          navigation.navigate("VendorListingDetail",{item:res.data()})
        }
      })
    } catch (error) {
      
    }
  }
  const renderChats = ({item}) => {
    if (item.senderUid == uid)
    return  item.isImgWithText?
   <View>
     <View 
      style={[styles.rightMsg,{backgroundColor:colors.black,borderRadius:10,width:200}]}>
        <FastImage
          defaultSource={images.imagePlaceholder}
          source={{uri: item.img}}
          style={[styles.rightImage,{borderWidth:0}]}
          resizeMode="cover"
        />
        <Text style={[styles.txt,{padding:10}]}>
          {item.message}
        </Text>
      </View>
       <Text style={[styles.timeAgoRight]}>
       {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
     </Text>
   </View>
    : item.message ? (
      <View style={styles.rightMsg}>
        <View style={styles.rightMsgInner}>
          <Text style={styles.txt}>{item.message}</Text>
        </View>
        <Text style={[styles.timeAgoRight]}>
          {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
        </Text>
      </View>
    ) : (
      <View>
        <FastImage
          defaultSource={images.imagePlaceholder}
          source={{uri: item.img}}
          style={styles.rightImage}
          resizeMode="cover"
        />
        <Text style={[styles.timeAgoRight,{marginBottom:10}]}>
          {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
        </Text>
      </View>
    );
    return(
    item.isImgWithText?
    <TouchableOpacity onPress={()=>navigateToListing(item)}>
     <View 
      style={[styles.leftMsg,{backgroundColor:colors.black,borderRadius:10,width:200}]}>
        <FastImage
          defaultSource={images.imagePlaceholder}
          source={{uri: item.img}}
          style={[styles.leftImage,{borderWidth:0}]}
          resizeMode="cover"
        />
        <Text style={[styles.txt,{padding:10}]}>
          {item.message}
        </Text>
      </View>
       <Text style={[styles.timeAgoLeft]}>
       {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
     </Text>
   </TouchableOpacity>
    :
    item.message ? (
      <View style={styles.leftMsg}>
        <View style={styles.leftMsgInner}>
          <Text style={styles.txt}>{item.message}</Text>
        </View>
        <Text style={styles.timeAgoLeft}>
          {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
        </Text>
      </View>
    ) : (
      <View>
        <FastImage
          defaultSource={images.imagePlaceholder}
          source={{uri: item.img}}
          style={styles.leftImage}
          resizeMode="cover"
        />
        <Text style={[styles.timeAgoLeft,{marginBottom:10}]}>
          {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
        </Text>
      </View>
    ))
  };
  const keyExtractor = item => {
    return item.id;
  };

  const setMessage = (messageId, senderUid, recUid, messageObj) => {
    try {
      firestore()
        .collection('Chats')
        .doc(senderUid)
        .collection(recUid)
        .doc(messageId)
        .set(messageObj);
    } catch (error) {
      console.log(error);
      Util.showMessage('error', 'Something went wrong');
    }
  };
  const sendImage = async (img,isUri) => {
    try {
      setLoader(true)
      let docId = firestore().collection('Chats').doc().id;
      const imgUri = isUri ? img:await Helper.uploadImage(
        `ChatImage/${uid}/${docId.png}`,
        img,
      );
      const messageObj = {
        img: imgUri,
        senderUid: uid,
        messageId: docId,
        //senderImage:profilePic,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        //senderName: name
      };
      setMessage(docId, uid, lastMessage.senderUid, messageObj);
      setMessage(docId, lastMessage.senderUid, uid, messageObj);
     setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageWithText = async () => {
    try {
      //console.log(lastMessage)
      let docId = firestore().collection('Chats').doc().id;
      const messageObj = {
        img: lastMessage.imageUri,
        senderUid: uid,
        messageId: docId,
        message:lastMessage.regarding,
        isImgWithText:true,
        listingId:lastMessage.listingId,
        //senderImage:profilePic,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        //senderName: name
      };
      setMessage(docId, uid, lastMessage.senderUid, messageObj);
      setMessage(docId, lastMessage.senderUid, uid, messageObj);
      setMessage(lastMessage.senderUid, uid, "LastMessage", {
          message: lastMessage.regarding,
          senderUid: lastMessage.senderUid,
          isRead: true,
          //senderImage:lastMessage.senderImage,
          //senderName: lastMessage.senderName,
          date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setMessage(uid, lastMessage.senderUid, "LastMessage", {
          message: lastMessage.regarding,
          senderUid: uid,
          isRead: false,
          //senderImage:profilePic,
          //senderName: name,
          date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      //setChatText("")
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = chatText => {
    //setChatText(chatText.trim())
    if (chatText.trim().length > 0) {
      try {
        let docId = firestore().collection('Chats').doc().id;
        const messageObj = {
          message: chatText.trim(),
          senderUid: uid,
          messageId: docId,
          //senderImage:profilePic,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          //senderName: name
        };
        setMessage(docId, uid, lastMessage.senderUid, messageObj);
        setMessage(docId, lastMessage.senderUid, uid, messageObj);
        setMessage(lastMessage.senderUid, uid, 'LastMessage', {
          message: chatText.trim(),
          senderUid: lastMessage.senderUid,
          isRead: true,
          //senderImage:lastMessage.senderImage,
          //senderName: lastMessage.senderName,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setMessage(uid, lastMessage.senderUid, 'LastMessage', {
          message: chatText.trim(),
          senderUid: uid,
          isRead: false,
          //senderImage:profilePic,
          //senderName: name,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        });
        //setChatText("")
      } catch (error) {
        console.log(error);
      }
    }
  };
  //console.log(lastMessage)
  const RenderHeader = () => {
    const [chatText, setChatText] = useState('');
    const insets = useSafeAreaInsets()
    return (
      <KeyboardAvoidingView 
        keyboardVerticalOffset={insets.top}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <HStack style={styles.inputBox} alignItems={'center'}>
          <TextInput
            style={{flex: 1, color: 'black',maxHeight:100}}
            value={chatText}
            // onSubmitEditing={() => {
            //   handleSubmit(chatText);
            //   setChatText('');
            // }}
            onChangeText={txt => setChatText(txt)}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={'Type Here'}
            //returnKeyType="send"
            placeholderTextColor={'gray'}
            multiline={true}
            //editable={chatActive}
          />
          <IconButton
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name="camera"
                size={'2xl'}
                color="black"
              />
            }
            onPress={handleImage}
          />
          <IconButton
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name="send-circle"
                size={'2xl'}
                color="black"
              />
            }
            onPress={() => {
              handleSubmit(chatText);
              setChatText('');
            }}
          />
        </HStack>
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={styles.container}>
      <AvatarHeader
        rightIcon={'dots-vertical'}
        rightIsComponent={true}
        back
        title={lastMessage.senderName}
        navigation={navigation}
        icon={lastMessage.senderImage}
      />
      {
        loading?
        (<CenteredLoader/>):
        noData ? (
          <Center flex={1} p={3}>
          <Text style={styles.noItem}>
            {`No chats found`}
          </Text>
        </Center>
        ):(
          <FlatList
            inverted
            renderItem={renderChats}
            data={chats}
            //style={{flex:1}}
            keyExtractor={keyExtractor}
            style={styles.flatList}
            bounces={false}
            showsVerticalScrollIndicator={false}
            //ListHeaderComponent={<RenderHeader/>}
            keyboardShouldPersistTaps={'handled'}
          />
        )
      }
      
      <RenderHeader />
      <PhotoPicker
        isOpen={isOpen}
        onClose={onClose}
        isVideo={false}
        setImage={selectImage}
        isCover={true}
      />
      <LoaderComponent title={"Sending..."} visible={loader}/>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    userData: state.user.userData,
  };
};
export default connect(mapStateToProps)(Chat);

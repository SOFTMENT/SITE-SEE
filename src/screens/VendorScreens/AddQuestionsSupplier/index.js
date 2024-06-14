import {
  Button,
  Center,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Text,
  Toast,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '../../../components/Header';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AddQuestionsDialog from '../../../components/AddQuestionsDialog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
import fonts from '../../../../assets/fonts';
import {setUserData} from '../../../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
const AddQuestionsSupplier = ({navigation}) => {
  const {
    autoResponse: myAutoResponse,
    autoChatMode: autoChatModee,
    userType,
  } = useSelector(state => state.user.userData) ?? {};
  const [questions, setQuestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [autoChatMode, setAutoChatMode] = useState(autoChatModee ?? 'none');
  const [autoResponse, setAutoResponse] = useState(myAutoResponse ?? '');
  const [updateLoader, setUpdateLoader] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getQuestions();
  }, []);
  useEffect(() => {
    setAutoResponse(myAutoResponse);
  }, [myAutoResponse]);
  const getQuestions = async () => {
    try {
      const res = await firestore()
        .collection('Suppliers')
        .doc(auth().currentUser.uid)
        .collection('Questions')
        .orderBy('createDate', 'asc')
        .get();
      const docs = res.docs;
      let localData = [];
      docs.map(doc => {
        localData.push({...doc.data(), id: doc.id});
      });
      setQuestions(localData);
    } catch (error) {}
  };
  const onClose = () => {
    getQuestions();
    setMenuOpen(false);
  };
  const handleAddQuestion = () => {
    if (questions.length == 5) {
      Toast.show({
        description: 'You already have 5 questions.',
        style: {marginBottom: 30},
      });
    } else {
      setMenuOpen(true);
    }
  };
  const deleteQuestion = async id => {
    try {
      await firestore()
        .collection('Suppliers')
        .doc(auth().currentUser.uid)
        .collection('Questions')
        .doc(id)
        .delete();
      getQuestions();
    } catch (error) {}
  };
  const toggleCheckbox = (isSelected, type) => {
    if (!isSelected) {
      setAutoChatMode('none');
      firestore().collection('Suppliers').doc(auth().currentUser.uid).update({
        autoChatMode: 'none',
      });
      getUserData();
    } else {
      setAutoChatMode(type);
      firestore().collection('Suppliers').doc(auth().currentUser.uid).update({
        autoChatMode: type,
      });
      getUserData();
    }
  };
  const handleAutoResponse = async () => {
    if (autoResponse.trim().length) {
      try {
        setUpdateLoader(true);
        await firestore()
          .collection('Suppliers')
          .doc(auth().currentUser.uid)
          .update({
            autoResponse: autoResponse.trim(),
          });
        getUserData();
        Toast.show({
          description: 'Auto Response updated!',
          style: {marginBottom: 30},
        });
      } catch (error) {
      } finally {
        setUpdateLoader(false);
      }
    } else {
      Toast.show({
        description: 'Please enter a valid auto response.',
        style: {marginBottom: 30},
      });
    }
  };
  const getUserData = () => {
    firestore()
      .collection('Suppliers')
      .doc(auth().currentUser.uid)
      .get()
      .then(res => {
        dispatch(setUserData({...res.data(), userType}));
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <Header
        back
        navigation={navigation}
        title={'Questions/Response'}
        rightIcon={'add'}
        onRightIconPress={handleAddQuestion}
      />
      <View style={styles.mainView}>
        <HStack mb={1} alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={18} fontFamily={fonts.semiBold}>
            Questions
          </Text>
          <Checkbox
            colorScheme={'danger'}
            isChecked={autoChatMode == 'questions'}
            onChange={isSelected => toggleCheckbox(isSelected, 'questions')}
          />
        </HStack>
        {questions.length ? (
          questions.map(question => {
            return (
              <HStack
                key={question.id}
                style={styles.card}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Text fontSize={16}>{question.title}</Text>
                <IconButton
                  bgColor={colors.appDefaultColor}
                  borderRadius={30}
                  p={2}
                  onPress={() => {
                    deleteQuestion(question.id);
                  }}>
                  <Icon
                    name="trash-outline"
                    as={Ionicons}
                    size={'md'}
                    color={'white'}
                  />
                </IconButton>
              </HStack>
            );
          })
        ) : (
          <Center h={40}>
            <Text>No questions yet</Text>
          </Center>
        )}
        <Text my={5} textAlign={'center'}>
          -----OR----
        </Text>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={18} fontFamily={fonts.semiBold}>
            Response
          </Text>
          <Checkbox
            colorScheme={'danger'}
            isChecked={autoChatMode == 'response'}
            onChange={isSelected => toggleCheckbox(isSelected, 'response')}
          />
        </HStack>
        <Input
          value={autoResponse}
          onChangeText={txt => setAutoResponse(txt)}
          fontSize={14}
          mt={2}
          w="100%"
          py="0"
          InputRightElement={
            <Button
              isLoading={updateLoader}
              onPress={handleAutoResponse}
              size="xs"
              rounded="none"
              w="1/6"
              h="full"
              bgColor={colors.appDefaultColor}>
              Update
            </Button>
          }
        />
      </View>

      <AddQuestionsDialog visible={menuOpen} onClose={onClose} />
    </ScrollView>
  );
};
export default AddQuestionsSupplier;

import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import MyTextInput from '../../../components/MyTextInput';
  import MyButton from '../../../components/MyButton';
  import styles from './styles';
  
  const ProNotifications = ({ navigation }) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
    const [errorMsg1, setErrorMsg1] = useState('');
    const [errorMsg2, setErrorMsg2] = useState('');
    const [errorMsg3, setErrorMsg3] = useState('');
    const [errorMsg4, setErrorMsg4] = useState('');
  
    const resetStateData = () => {
      setError1(false)
      setError2(false)
      setError3(false)
      setError4(false)
      setErrorMsg1("")
      setErrorMsg2("")
      setErrorMsg3("")
      setErrorMsg4("")
      //error reset because data is now validatedok
    }
  
    const validateLogin = () => {
      if (fname.trim().length == 0) {
        setError3(true)
        setErrorMsg3("Fill this field")
      }
      else if (fname.trim().length == 0) {
        setError4(true)
        setErrorMsg4("Fill this field")
      }
  
      else if (email.trim().length == 0) {
        setError1(true)
        setErrorMsg1("Please enter email")
      }
      else if (password.trim().length <= 6) {
        setError2(true)
        setErrorMsg2("Password must contain atleast 6 characters")
      }
      else {
        resetStateData()
        //your login functin call below 
      }
    }
    return (
      <ScrollView style={{ flex: 1,backgroundColor:"red"}}>
          {/* <Image
          source={images.mygym2}
          style={{
            width: '100%',
            height: '30%',
            resizeMode: 'stretch',
            borderBottomRightRadius:25,
            borderBottomLeftRadius:25
          }}
        /> */}
          <View style={styles.container}>
            <View style={styles.heading}>
              <Text style={styles.mainTxt}>Create new profile</Text>
              <Text style={styles.smallTxt}>Register to your Account</Text>
            </View>
            <MyTextInput
              upperText={"First name"}
              //style={styles.input}
              onChangeText={fname => setFname(fname)}
              value={fname}
              //  name={email}
              placeholder={"John"}
              placeholderTextColor="grey"
              error={error3}
              errorMsg={errorMsg3}
            // keyboardType="numeric"
            />
            <MyTextInput
              upperText={"Last name"}
              //style={styles.input}
              onChangeText={txt => setLname(txt)}
              value={lname}
              //  name={email}
              placeholder={"Biden"}
              placeholderTextColor="grey"
              error={error4}
              errorMsg={errorMsg4}
            // keyboardType="numeric"
            />
            <MyTextInput
              upperText={"Email"}
              //style={styles.input}
              onChangeText={txt => setEmail(txt)}
              value={email}
              //  name={email}
              placeholder={"abc@gmail.com"}
              placeholderTextColor="grey"
              error={error1}
              errorMsg={errorMsg1}
            // keyboardType="numeric"
            />
            <MyTextInput
              upperText={"Password"}
              //style={styles.input}
              onChangeText={txt => setPassword(txt)}
              value={password}
              //  name={email}
              placeholder={"12345678"}
              placeholderTextColor="grey"
              error={error2}
              errorMsg={errorMsg2}
            // keyboardType="numeric"
            />
  
            <MyButton
              title={"Register"}
              // onPress={() => navigation.navigate('Login')}
              onPress={validateLogin}
            />
  
            <Text style={styles.vsmallTxt}>
              -------------------------------   or Register using   -----------------------------
            </Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.smallBtn}
              //   onPress={}
              >
                <Image
                  source={images.fb}
                  style={{
                    // position:"absolute",
                    width: 40,
                    height: 23,
                    resizeMode: 'contain',
                    //  marginRight:-200,
                    //backgroundColor:"green",
                    //marginLeft:90,
                    // right:0,
  
                  }}
                />
                <Text style={styles.smallbtnTxt}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallBtn}
              //   onPress={}
              >
                <Image
                  source={images.google}
                  style={{
                    // position:"absolute",
                    width: 40,
                    height: 20,
                    resizeMode: 'contain',
                    //  marginRight:-200,
                    //backgroundColor:"green",
                    //marginLeft:90,
                    // right:0,
  
                  }}
                />
                <Text style={styles.smallbtnTxt}>Google</Text>
              </TouchableOpacity>
            </View>
  
            <View style={styles.txtContainer}>
              <Text style={styles.vvsmallTxt}>
                Register a new account?
              </Text>
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.linkTxt}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    )
  };
  
  export default ProNotifications;
  
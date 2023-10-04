import { useState, useEffect } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity, Pressable, TextInput, Image, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Otp from "./OTP-Modal";
import { baseUrl } from "./URLs";


const storeData = async (rollNo) => {
    try {
      await AsyncStorage.setItem('@roll-number', rollNo);
    } catch (e) {
      console.log(e);
    }
  }

export default function Staff() {
  const navigation = useNavigation();
  const [rollNo, setRollNo] = useState();
  const [rollNo2, setRollNo2] = useState();
  const [otpValue, setOtpValue] = useState("123");
  const [otpRecieved, setOtpRecieved] = useState();
  const [modalVisibility, setModalVisibility] = useState(false);
  useEffect(() => {
    getMyStringValue().then((res) => {
      // setRollNo2(res)
      if (res !== null && res !== undefined && res !== '') { navigation.navigate('StudentEnd') }
    });
  }, [])
  
  function startModal() {
    setModalVisibility(true);
    pressHandler();
  }

  function endModal() {
    setModalVisibility(false)
  }

  function handlingOtpValue(value) {
    setOtpValue(value);
  }

  function otpEntered() {
    endModal();
    if (otpValue == otpRecieved) {
      storeData(rollNo);
      navigation.navigate('StudentEnd');
    }
  }
  
  const getMyStringValue = async () => {
    try {
        return await AsyncStorage.getItem('@roll-number')
    } catch (e) {
        // read error
    }

}
  
  function pressHandler() {
    axios.get(baseUrl + '/verifyEmail', { params: { rollNumber : rollNo } })
        .then(function (response) {
          console.log(response.data);
          setOtpRecieved(response.data);
        })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container} >
        <Text style={styles.heading}>Gate Management</Text>
        {modalVisibility &&
        <Otp
          visible={modalVisibility}
          handlingOtpValue={handlingOtpValue}
          otpEntered={otpEntered}
          onCancel={endModal} 
          // pressHandler={pressHandler}
        />}
      <Image source={require('./assets/collegeLogo.jpg')} style={{width: '50%',height:undefined,aspectRatio:1,marginTop:20}} />
      <Text style={{fontSize:20,marginTop:40}}>Student Login</Text>
      <View style={{marginVertical: 30}}>
          <TextInput
            maxLength={5}
            style={styles.input}
            placeholder="Roll number" keyboardType='number-pad'
            onChangeText={setRollNo}
            value={rollNo} />
      </View>
        <TouchableOpacity
          style={styles.button}
        // onPress={pressHandler}
          onPress={startModal}
        >
        <Text>Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50,
  },
  heading: {
    fontSize: 25,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    marginVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    borderColor: 'black',
    width: 200,
    padding: 10,
    borderRadius: 10,
    fontSize: 15
  },
});

import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity,SafeAreaView,TextInput, Image,Alert } from "react-native";
import { baseUrl } from "./URLs";

export default function Staff({ navigation }) {
  const [enteredUsername, setUsername] = useState();
  const [enteredPass, setPass] = useState();
  var recievedPassword = '';
  function pressHandler() {
    axios.get(baseUrl + '/verifyManagement', { params: { username : enteredUsername } }).then(function (response) {
          // console.log(response.data);
      if (response.data[0]) {
        recievedPassword = response.data[0].password;
        // console.log(response.data[0].password)
        if (recievedPassword == enteredPass) {
          navigation.navigate('ManagementEnd');
        }
        else {
          setUsername('');
          setPass('');
          Alert.alert('Invalid', 'Invalid username or password', [
            { text: 'Try again' }
          ]);
        }
      }
      else {
        setUsername('');
          setPass('');
        Alert.alert('Invalid', 'Invalid username or password', [
          { text: 'Try again' }
        ]);
      }
        })
  }
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      {/* <View style={{alignSelf: 'flex-start', marginLeft: 20,marginBottom: 20}}>
        <TouchableOpacity  onPress={pressHandler}>
          <View >
            <Text style={{color: '#0099ff'}}>{"<"} Back</Text>
          </View>
        </TouchableOpacity>
      </View> */}
      <Text style={styles.heading}>Gate Management</Text>
      <Image source={require('./assets/collegeLogo.jpg')} style={{width: '50%',height:undefined,aspectRatio:1,marginTop:20}} />
      <Text style={{fontSize:20,marginTop:40}}>Staff Login</Text>
      <View style={{marginVertical: 30}}>
          <TextInput style={styles.input}
            value={enteredUsername}
            placeholder="Employee id" //keyboardType='number-pad'
          onChangeText={setUsername}
          />
          <TextInput
            value={enteredPass}
            secureTextEntry={true}
            style={styles.input} placeholder="Password"
            onChangeText={setPass}
          />
      </View>
      <TouchableOpacity onPress={pressHandler} style={styles.button}>
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

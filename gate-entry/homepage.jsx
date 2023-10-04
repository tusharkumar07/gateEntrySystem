import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity,Pressable,Image,SafeAreaView } from "react-native";

export default function Home({navigation}) {
  function staffPressHandler() {
    navigation.navigate('StaffLogin');
  }
  
  function studentPressHandler() {
    navigation.navigate('StudentLogin');
}
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.heading}>Gate Management</Text>
      <Image source={require('./assets/collegeLogo.jpg')} style={{width: '50%',height:undefined,aspectRatio:1,marginTop:20}} />
      <View style={{ alignSelf: "flex-start", marginLeft: 80, marginTop: 60 }}>
        <Text style={{fontSize:17}}>Login as:</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={staffPressHandler}>
        <Text>Staff</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={studentPressHandler}>
        <Text>Student</Text>
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
    marginTop: 80,
  },
  heading: {
    fontSize: 25,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    marginVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
});

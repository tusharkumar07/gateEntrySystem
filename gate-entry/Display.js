import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View,StyleSheet,SafeAreaView ,Platform,Linking,Alert} from "react-native";
import { baseUrl } from "./URLs";

function forList(itemData) {
    const last = itemData.item.entry.length
    return (
        <View style={styles.itemContainer}>
            <Text style={{flex:3,textAlign:'center'}}>{ itemData.item.username.slice(0,5)}</Text> 
            <Text style={{flex: 2,textAlign:'center'}}>{ itemData.item.entry[last-1].time}</Text> 
            {itemData.item.username.slice(0, 5) === "21152" ? <View style={{ flex: 2.5, alignItems: "center" }} >
            <Ionicons name='ios-call' color={'black'} size={30} onPress={() => {
                callNumber('9464770149')
            }}  />
            </View> : <View style={{ flex: 2.5, alignItems: "center" }} >
            <Ionicons name='ios-call' color={'black'} size={30} />
            </View>}
            
        </View>
    )
}

export const callNumber = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else  {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
  };

function Display() {
    const [Data, setData] = useState([]);
    useEffect(() => {
        axios.get(baseUrl + '/outStudents')
        .then(function (response) {
            setData(response.data);
        })
    },[])
    
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: 'white'}}>
            
            <View>
                <View style={styles.headContainer}>
                    <Text style={{flex:3,textAlign:'center',fontSize: 16,fontWeight: 'bold'}}>Roll Number</Text> 
                    <Text style={{ flex: 2, textAlign: 'center', fontSize: 16,fontWeight: 'bold' }}>Out Time</Text>
                    <View style={{flex: 2.5}}></View>        
                </View>
                <FlatList data={Data} renderItem={(itemData)=>forList(itemData)} />
            </View>
        </SafeAreaView>
    )
}

export default Display;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
        // paddingRight: 10,
        padding: 8,
        backgroundColor: '#c2c2c2',
        borderRadius: 8,
        marginHorizontal: 10
    },
    headContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        paddingRight: 10,
        padding: 5,
        marginHorizontal: 10
        
    } 
})
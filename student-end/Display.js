import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View,StyleSheet,SafeAreaView, Button, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "./URLs";


function forList(itemData) {
    return (
        <View style={[styles.itemContainer,itemData.item.status === "out" ? {backgroundColor: '#ff8f8f'} : {backgroundColor: '#87fa98'}]}>
            <Text style={{flex:3,textAlign:'center'}}>{ itemData.item.date}</Text> 
            <Text style={{flex: 2,textAlign:'center'}}>{ itemData.item.time}</Text> 
            <Text style={{flex: 2,textAlign:'center'}}>{ itemData.item.status.toUpperCase()}</Text> 
        </View>
    )
}

const removeValue = async () => {
    try {
        await AsyncStorage.removeItem('@roll-number')
    } catch(e) {
      // remove error
    }

    console.log('Done.')
}



function Display() {
    const [rollNo, setRollNo] = useState('Nothing');
    const [Data, setData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [cuurStatus, setCurrStatus] = useState();
    const navigation = useNavigation();
    const logoutHandle = () => {
        console.log('logout requested');
        removeValue();
        navigation.navigate('StudentLogin')
    }

    const onRefresh = () => {
        setIsRefreshing(true)
        axios.get(baseUrl + '/checkEntry', { params: { rollNumber : rollNo } })
        .then(function (response) {
            const reversedArray = response.data.entry.reverse();
                setData(reversedArray);
                setCurrStatus(response.data.currentStatus);
        })
        setIsRefreshing(false)
    }
    useEffect(() => {
        getMyStringValue().then(async (res) => {
            setRollNo(res);
            await axios.get(baseUrl + '/checkEntry',{params:{rollNumber : res}})
                .then(async function (response) {
                const reversedArray = response.data.entry.reverse();
                await setData(reversedArray);
                setCurrStatus(response.data.currentStatus);
            })
        });
    }, [])
    const getMyStringValue = async () => {
        try {
            return await AsyncStorage.getItem('@roll-number')
        } catch (e) {
            // read error
        }

    }
    
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{ marginBottom: 100 }}>
                <Text style={[{ textAlign: 'center',fontSize: 25, marginVertical: 8,fontWeight: 'bold' }, cuurStatus === 'out' ? {color: 'red'} : {color: 'green'}]}>Current status : {cuurStatus}</Text>
                <FlatList onRefresh={onRefresh}
                    refreshing={isRefreshing} data={Data} style={{marginBottom: 25}} renderItem={(itemData)=>forList(itemData)} />
            </View>
            {/* <Button title="Logout" onPress={logoutHandle} /> */}
            
            <TouchableOpacity style={{width:'100%',alignItems:'center',position:'absolute',bottom:20}} onPress={logoutHandle}>
                <Text style={styles.logoutBtn} >Logout</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}

export default Display;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 3,
        paddingVertical: 9,
        marginHorizontal: 15,
        borderRadius: 8
    },
    logoutBtn: {
        padding: 8,
        width: '40%',
        backgroundColor: '#0000FF',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10
    }
})
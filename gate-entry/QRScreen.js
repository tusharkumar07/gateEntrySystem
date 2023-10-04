import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Image, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useEffect, useState } from 'react';
import scan from './assets/scan.gif'
import axios from 'axios';
import { baseUrl } from './URLs';

export default function QRScanner({navigation}) {
    const [hasPermission, setHaspermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [recievedText, setRecievedText] = useState('');
    async function pressHandler() {
        // setScanned(true);
        // navigation.navigate('Detail', {
        //     data: recievedText
        // });
        
        if (recievedText != '') {
            Alert.alert(recievedText, 'Entry marked', [
                { text: 'OK' }
            ]);
            axios.get(baseUrl + '/adminSubmit', {
                params: {
                    rollNumber: recievedText
                }
            });
            // setScanned(false);
            navigation.navigate('EntryDetails')
        }
        
        
    }
    const askForCameraPermissions = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHaspermission(status == 'granted')
        })()
    }

    useEffect(() => {
        askForCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        // console.log(data)
        // setText(() => {return( data )});
        // recievedText = data;
        setRecievedText(data)
            setScanned(false);
            pressHandler();
        
        // setTimeout(pressHandler(),1000);
                
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={{height: undefined, width: '100%',aspectRatio: 0.75,margin:0}}
                />
                <Image source={scan} style={{position:'absolute',zIndex:90,height:'90%',width:'90%'}} />
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding:0,
        width: '80%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        overflow: 'hidden'
    },
});

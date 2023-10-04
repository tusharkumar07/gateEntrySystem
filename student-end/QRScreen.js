import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useEffect, useState } from 'react';
import scan from './assets/scan.gif'

export default function QRScanner({navigation}) {
    const [hasPermission, setHaspermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    let recievedText;
    function pressHandler() {
        setScanned(false);
        navigation.navigate('Detail', {
            data: recievedText
        });
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
        recievedText = data;
        setScanned(false);
        pressHandler();
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
                {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
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

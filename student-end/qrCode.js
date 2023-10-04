import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import logo from './assets/collegeLogo.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
// import { AsyncStorage } from 'react-native';
// const logo = require('./assets/collegeLogo.png')

function QRRender() {
    const [rollNo, setRollNo] = useState('Nothing');
    useEffect(() => {
        getMyStringValue().then((res) => {
            setRollNo(res)
        });
    },[])
    const getMyStringValue = async () => {
        try {
            return await AsyncStorage.getItem('@roll-number')
        } catch (e) {
            // read error
        }

    }
    return (
        <View style={styles.container}>
            <QRCode
                value={rollNo}
                logo={logo}
                logoSize={60}
                logoBackgroundColor='transparent'
                size={300}
                // logoMargin={50}
                logoBorderRadius={10}
            />
        </View>
    );
};

export default QRRender;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
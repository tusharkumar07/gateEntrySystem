import { View, TextInput, Button, StyleSheet, Modal,Text, Image,TouchableOpacity} from "react-native"

function Otp(props) {
    return (
        <Modal visible={props.visible} animationType="slide" transparent={true} >
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.4)'}}>
                <View style={styles.inputContainer}>
                    <Image style={styles.image} source={require('./assets/email.png')} />
                    <Text style={styles.heading} >Check your college email for OTP</Text>
                    <TextInput style={styles.textInput} placeholder='Enter The OTP' onChangeText={props.handlingOtpValue}
                        keyboardType='number-pad'
                        maxLength={6}
                    />
                    
                    <View style={styles.buttonContainer}>
                        
                        <View style={styles.button}>
                            {/* <   Button title="Cancel"  /> */}
                            <TouchableOpacity onPress={props.onCancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            {/* <Button title='Verify' onPress={props.otpEntered} /> */}
                            <TouchableOpacity onPress={props.otpEntered}>
                                <Text style={styles.buttonText}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        height: '50%',
        top: '50%'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#6b6b6b',
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 6,
        width: '80%',
        height: 50,
        color: 'black',
        padding: 16
    },
    buttonContainer : {
        flexDirection: 'row',
        marginTop: 16
    },
    button: {
        width: 100,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: 100,
        height: 100,
        margin: 20,
        // marginBottom: 30
    },
    heading: {
        fontSize: 20,
        marginBottom: 30
    },
    buttonText: {
        fontSize: 16
    }
})

export default Otp
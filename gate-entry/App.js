import { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View ,Text,StyleSheet,SafeAreaView} from 'react-native';
import Staff from './staff';
import QRScanner from './QRScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Display from './Display';


const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ManagementCorner() {
  
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name='QRCode' component={QRScanner} options={ {tabBarIcon: ({color,size})=> <Ionicons name='scan-sharp' color={color} size={size} />,unmountOnBlur:true,title: 'QR Scanner'}} />
      <BottomTabs.Screen name='EntryDetails' component={Display} options={{ tabBarIcon: ({ color, size }) => <Ionicons name='people-sharp' color={color} size={size} />,title: 'Out Students', unmountOnBlur:true }} />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={Display}
            options={{
              headerShown: true
            }} /> */}
          <Stack.Screen name="StaffLogin" component = {Staff}
          options={{
            headerShown: false
          }}/>
          {/* <Stack.Screen name="StudentLogin" component = {Student}
          options={{
            headerShown: false
            }} /> */}
          {/* <Stack.Screen name="QrCode" component = {QRRender}
          options={{
            headerShown: false
            }} /> */}
          <Stack.Screen name="ManagementEnd" component = {ManagementCorner}
          options={{
            headerShown: false
            }} />
          {/* <Stack.Screen name="Detail" component = {StudentDetails}
          options={{
            headerShown: false
          }}/> */}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

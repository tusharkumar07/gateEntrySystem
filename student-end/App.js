import { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View ,Text,StyleSheet,SafeAreaView} from 'react-native';
import Student from './student'
import QRRender from './qrCode';
import Display from './Display';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function StudentCorner() {
  
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name='QRCode' component={QRRender} options={ {tabBarIcon: ({color,size})=> <Ionicons name='qr-code-outline' color={color} size={size} />}} />
      <BottomTabs.Screen name='EntryDetails' component={Display} options={{ tabBarIcon: ({ color, size }) => <Ionicons name='list' color={color} size={size} />,title: 'Entry Statastics' }} />
    </BottomTabs.Navigator>
  )
}

export default function App() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="StudentLogin" component={Student}
              options={{
                headerShown: false
              }} />
            <Stack.Screen name="StudentEnd" component={StudentCorner}
              options={{
                headerShown: false
              }} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

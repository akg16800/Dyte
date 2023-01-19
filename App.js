import React, {useEffect, useState} from 'react';
import {DyteMeeting} from '@dytesdk/mobile';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {registerGlobals} from 'react-native-webrtc';
import {createStackNavigator} from '@react-navigation/stack';

import {MainPage} from './src/screens/mainPage';
import {WebRTC} from './src/screens/WebRTC';

const Stack = createStackNavigator();

const organizationId = 'c82f8f7f-0fee-4280-9bca-3d44398c2b54';
const apiKey = '661af6c6c28f19a8c32e';
const headers = {
  'Content-Type': 'application/json',
  authorization: apiKey,
};
// const meetingId = '8888be5e-7c8a-460b-a501-c16254d39a13';
// registerGlobals();
const pic_url =
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fool.com%2Finvesting%2F2017%2F07%2F10%2Fhere-are-the-average-prices-for-boeings-5-major-co.aspx&psig=AOvVaw27WBDuZN5wjiTl7HIv8Hga&ust=1673785416965000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLCEiNyGx_wCFQAAAAAdAAAAABAJ';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="RTC"
          component={WebRTC}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      {/* <MainPage /> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

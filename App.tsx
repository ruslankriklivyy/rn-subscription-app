/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import GetStarted from './screens/GetStarted';
import navigationLinking from './config/navigation-linking';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer linking={navigationLinking}>
      <Stack.Navigator
        initialRouteName="GetStarted"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

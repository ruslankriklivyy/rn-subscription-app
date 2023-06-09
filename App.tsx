/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SubscriptionsScreen from './screens/Subscriptions';
import HomeScreen from './screens/Home';
import GetStarted from './screens/GetStarted';
import RegisterScreen from './screens/Register';
import LoginScreen from './screens/Login';
import SubscriptionScreen from './screens/Subscription';
import ProfileScreen from './screens/Profile';

import navigationLinking from './config/navigation-linking';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer linking={navigationLinking}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

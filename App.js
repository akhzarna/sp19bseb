import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './src/Ahmad_Arman/app/src/views/screens/SignInScreen.js'
import SignUpScreen from './src/Talha_Maqsood/SignUpScreen.js'
import HomeScreen from './src/Muhammad_Hamza/HomeScreen.js'
import CoachingScreen from './src/Irbaz_Ahsan/CoachingScreen.js'
import PaymentScreen from './src/Saboor_Malik/PaymentScreen.js'
import HealthHistoryScreen from './src/Hamza_Iftikhar/HealthHistoryScreen.js'
import DietPlanScreen from './src/Muhammad_Sharjeel/DietPlanScreen.js'

const Stack = createStackNavigator();

export default class App extends React.Component {  
  render() {  
      return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "SignIn" headerMode = 'none'>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Coaching" component={CoachingScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Health" component={HealthHistoryScreen} />
            <Stack.Screen name="Diet" component={DietPlanScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }  
}
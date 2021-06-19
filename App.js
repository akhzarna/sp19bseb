import React from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'

import SignInScreen from './src/Ahmad_Arman/app/src/views/screens/SignInScreen.js'
import SignUpScreen from './src/Talha_Maqsood/SignUpScreen.js'
import HomeScreen from './src/Muhammad_Hamza/HomeScreen.js'
import CoachingScreen from './src/Irbaz_Ahsan/CoachingScreen.js'
import PaymentScreen from './src/Saboor_Malik/PaymentScreen.js'
import HealthHistoryScreen from './src/Hamza_Iftikhar/HealthHistoryScreen.js'
import DietPlanScreen from './src/Muhammad_Sharjeel/DietPlanScreen.js'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {  

  drawerScreens()
  {
    return(
      <Drawer.Navigator initialRouteName = "Home">
        <Drawer.Screen name="Home" component={HomeScreen} options = {{drawerLabel : 'Home'}}/>
        <Drawer.Screen name="Coaching" component={CoachingScreen} options = {{drawerLabel : 'Coaching'}}/>
        <Drawer.Screen name="Payment" component={PaymentScreen} options = {{drawerLabel : 'Payment'}}/>
        <Drawer.Screen name="Health" component={HealthHistoryScreen} options = {{drawerLabel : 'Health'}}/>
        <Drawer.Screen name="Diet" component={DietPlanScreen} options = {{drawerLabel : 'Diet'}}/>
      </Drawer.Navigator>
    );
  }

  stackScreens()
  {
    return(
      <Stack.Navigator initialRouteName = "SignIn" headerMode = 'none'>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="AfterLogIn" component={this.drawerScreens}/>
      </Stack.Navigator>
    );
  }

  render() {  
      return(
        <NavigationContainer>
          {this.stackScreens()}
        </NavigationContainer>
      );
  }  
}
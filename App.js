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
import { Alert } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {  

  themeColor = '';

  constructor(props)
  {
    super(props);

    this.themeColor = '#1f8e46';
  }

  drawerScreens(props)
  {
    return(
      <Drawer.Navigator initialRouteName = "Home">
        <Drawer.Screen name="Home" component={HomeScreen} options = {{drawerLabel : 'Home'}} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId}}/>
        <Drawer.Screen name="Coaching" component={CoachingScreen} options = {{drawerLabel : 'Coaching'}} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId}}/>
        <Drawer.Screen name="Payment" component={PaymentScreen} options = {{drawerLabel : 'Payment'}} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId}}/>
        <Drawer.Screen name="Health" component={HealthHistoryScreen} options = {{drawerLabel : 'Health'}} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId}}/>
        <Drawer.Screen name="Diet" component={DietPlanScreen} options = {{drawerLabel : 'Diet'}} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId}}/>
      </Drawer.Navigator>
    );
  }

  stackScreens()
  {
    return(
      <Stack.Navigator initialRouteName = "SignIn" headerMode = 'none'>
        <Stack.Screen name="SignIn" component={SignInScreen} initialParams = {{themeColor : this.themeColor}}/>
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
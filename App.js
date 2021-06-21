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

const BasicScreensStack = createStackNavigator();
const SideMenuDrawer = createDrawerNavigator();
const CoachingScreensStack = createStackNavigator();

export default class App extends React.Component {  

  themeColor = '';

  constructor(props)
  {
    super(props);

    this.themeColor = '#1f8e46';
  }

  render() {

    const coachingStackScreens = (props) =>
    {
      return(
        <CoachingScreensStack.Navigator initialRouteName = 'Home' headerMode = 'none'>
          <CoachingScreensStack.Screen name = 'Home' component = {HomeScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name= 'Select' component={CoachingScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name= 'Payment' component={PaymentScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name= 'Health' component={HealthHistoryScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name= 'Diet' component={DietPlanScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
        </CoachingScreensStack.Navigator>
      );
    }

    const sideMenuDrawerScreens = (props) =>
    {
      return(
        <SideMenuDrawer.Navigator initialRouteName = "Coaching">
          <SideMenuDrawer.Screen name="Coaching" component={coachingStackScreens} options = {{drawerLabel : 'Coaching'}} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
        </SideMenuDrawer.Navigator>
      );
    }

    const basicStackScreens = () =>
    {
      return(
        <BasicScreensStack.Navigator initialRouteName = "SignIn" headerMode = 'none'>
          <BasicScreensStack.Screen name="SignIn" component={SignInScreen} initialParams = {{themeColor : this.themeColor}}/>
          <BasicScreensStack.Screen name="SignUp" component={SignUpScreen} />
          <BasicScreensStack.Screen name="AfterLogIn" component={sideMenuDrawerScreens}/>
        </BasicScreensStack.Navigator>
      );
    }

      return(
        <NavigationContainer>
          {basicStackScreens()}
        </NavigationContainer>
      );
  }  
}
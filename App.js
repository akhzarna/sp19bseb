import React from 'react';

import {
  Text,
  View
} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'

import HomeScreen from './src/Hamza_Iftikhar/HomeScreen'
import SignInScreen from './src/Ahmad_Arman/app/src/views/screens/SignInScreen.js'
import SignUpScreen from './src/Talha_Maqsood/SignUpScreen.js'
import CoachingHomeScreen from './src/Muhammad_Hamza/CoachingHomeScreen.js'
import CoachingScreen from './src/Irbaz_Ahsan/CoachingScreen.js'
import PaymentScreen from './src/Saboor_Malik/PaymentScreen.js'
import HealthHistoryScreen from './src/Hamza_Iftikhar/HealthHistoryScreen.js'
import ComingSoonScreen from './src/Hamza_Iftikhar/ComingSoonScreen';
import DietPlanScreen from './src/Muhammad_Sharjeel/DietPlanScreen.js'

import Icon from 'react-native-vector-icons/FontAwesome';

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
        <CoachingScreensStack.Navigator initialRouteName = 'Coaching-Home' headerMode = 'none'>
          <CoachingScreensStack.Screen name = 'Coaching-Home' component = {CoachingHomeScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
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
        <SideMenuDrawer.Navigator initialRouteName = "Home">
          <SideMenuDrawer.Screen name="Home" component={ComingSoonScreen} options = {{drawerLabel : () => (
            <Text>Home</Text>
          ), drawerIcon : ({ focused, size }) => (
            <Icon
              name="circle"
              size={size/3}
              color={props.route.params.themeColor}
            />
          )}} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Product" component={ComingSoonScreen} options = {{drawerLabel : () => (
            <View style = {{flex : 1, flexDirection : 'row'}}>
              <Text>Product</Text>
              <Icon
                name="arrow-right"
                size={15}
                color={props.route.params.themeColor}
                style={{marginVertical : 2.5, marginLeft : '75%'}}
              />
            </View>
          ), drawerIcon : ({ focused, size }) => (
            <Icon
              name="circle"
              size={size/3}
              color={props.route.params.themeColor}
            />
          )}} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Coaching" component={coachingStackScreens} options = {{drawerLabel : () => (
            <Text>Coaching</Text>
          ), drawerIcon : ({ focused, size }) => (
            <Icon
              name="circle"
              size={size/3}
              color={props.route.params.themeColor}
            />
          )}} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
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
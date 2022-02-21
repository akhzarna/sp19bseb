import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'

import SignInScreen from './src/Ahmad_Arman/app/src/views/screens/SignInScreen.js'
import SignUpScreen from './src/Talha_Maqsood/SignUpScreen.js'
import CoachingHomeScreen from './src/Muhammad_Hamza/CoachingHomeScreen.js'
import CoachingScreen from './src/Irbaz_Ahsan/CoachingScreen.js'
import PaymentScreen from './src/Saboor_Malik/PaymentScreen.js'
import HealthHistoryScreen from './src/Hamza_Iftikhar/HealthHistoryScreen.js'
import BookShelf from './src/Hamza_Iftikhar/BookShelf';
import SideMenuContentComponent from './src/Hamza_Iftikhar/SideMenuContentComponent'
import DietPlanScreen from './src/Muhammad_Sharjeel/DietPlanScreen.js'
import WishlistScreen from './src/Hamza_Iftikhar/Wishlist_Screen_Items/WishlistScreen'
import ProductScreen from './src/Hamza_Iftikhar/Product_Screen_Items/ProductScreen'
import ProductsMenu from './src/Hamza_Iftikhar/Product_Screen_Items/ProductsMenu'
import Allbooks from './src/Hamza_Iftikhar/Allbooks.js'
import BookDetail from './src/Hamza_Iftikhar/BookDetail.js'
import ChaptersListComponent from './src/Hamza_Iftikhar/ChaptersListComponent.js'
import ChaptersListDetailComponent from './src/Hamza_Iftikhar/ChaptersListDetailComponent.js'
import ReadingComponentFromBooks from './src/Hamza_Iftikhar/ReadingComponentFromBooks.js'
import Allchapters from './src/Hamza_Iftikhar/Allchapters.js'
import ProductDetailsScreen from './src/Hamza_Iftikhar/Product_Screen_Items/ProductDetailsScreen.js'
import CartDetailsScreen from './src/Hamza_Iftikhar/Product_Screen_Items/CartDetailsScreen.js'
import CheckAddressScreen from './src/Hamza_Iftikhar/Product_Screen_Items/CheckAddressScreen.js'
import AddNewAddressScreen from './src/Hamza_Iftikhar/Product_Screen_Items/AddNewAddressScreen.js'
import PaymentOptionsScreen from './src/Hamza_Iftikhar/Product_Screen_Items/PaymentOptionsScreen.js'
import PaymentSubmitScreen from './src/Hamza_Iftikhar/Product_Screen_Items/PaymentSubmitScreen.js'
import ForgetScreen from './src/Ali_Hussain/ForgetScreen.js';
import PasswordScreen from './src/Ali_Hussain/PasswordScreen.js';
import { Provider } from 'react-native-paper';
import BookView from './src/Ali_Ahtasham/src/Screens/Book View/BookView.js';

const BasicScreensStack = createStackNavigator();
const SideMenuDrawer = createDrawerNavigator();
const CoachingScreensStack = createStackNavigator();

const BooksScreensStack = createStackNavigator();

export default class App extends React.Component {

  render() {
    const booksStackScreens = (props) =>
    {
      return(
        <BooksScreensStack.Navigator initialRouteName = 'Home' headerMode = 'none'>
          <BooksScreensStack.Screen name = 'Home' component = {BookShelf} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name= 'Allbooks' component={Allbooks} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name= 'Allchapters' component={Allchapters} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name= 'BookDetail' component={BookDetail} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name= 'BookView' component={BookView} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name= 'ChaptersListComponent' component={ChaptersListComponent} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name= 'ChaptersListDetailComponent' component={ChaptersListDetailComponent} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name= 'ReadingComponentFromBooks' component={ReadingComponentFromBooks} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name="Products-Screen" component={ProductScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <BooksScreensStack.Screen name="Product-Detail-Screen" component={ProductDetailsScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name="CartDetailsScreen" component={CartDetailsScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name="CheckAddressScreen" component={CheckAddressScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name="AddNewAddressScreen" component={AddNewAddressScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name="PaymentOptionsScreen" component={PaymentOptionsScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
          <BooksScreensStack.Screen name="PaymentSubmitScreen" component={PaymentSubmitScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email, name : props.route.params.name}}/>
        </BooksScreensStack.Navigator>
      );
    }

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
        <SideMenuDrawer.Navigator initialRouteName = "Home" drawerContent = {(props) => <SideMenuContentComponent {...props} />}>
          <SideMenuDrawer.Screen name="Home" component={booksStackScreens} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Products-Menu" component={ProductsMenu} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Products-Screen" component={ProductScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Coaching" component={coachingStackScreens} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Recommendation" component={BookShelf} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Sale" component={BookShelf} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Orders" component={BookShelf} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="FAQ" component={BookShelf} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Blog" component={BookShelf} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Contact" component={BookShelf} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Address" component={BookShelf} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
          <SideMenuDrawer.Screen name="Wishlist" component={WishlistScreen} initialParams = {{themeColor : props.route.params.themeColor, token : props.route.params.token, userId : props.route.params.userId, email : props.route.params.email}}/>
        </SideMenuDrawer.Navigator>
      );
    }

    const basicStackScreens = () =>
    {
      return(
        <BasicScreensStack.Navigator initialRouteName = "SignIn" headerMode = 'none'>
          <BasicScreensStack.Screen name="SignIn" component={SignInScreen} initialParams = {{themeColor : this.themeColor}}/>
          <BasicScreensStack.Screen name="SignUp" component={SignUpScreen} />
          <BasicScreensStack.Screen name="Forget"  component={ForgetScreen}/>
          <BasicScreensStack.Screen name='PasswordScreen' component={PasswordScreen}/>
          <BasicScreensStack.Screen name="AfterLogIn" component={sideMenuDrawerScreens}/>
        </BasicScreensStack.Navigator>
      );
    }

      return(
        <Provider>
          <NavigationContainer>
            {basicStackScreens()}
          </NavigationContainer>
        </Provider>
      );
  }
}

const styles = StyleSheet.create({

});

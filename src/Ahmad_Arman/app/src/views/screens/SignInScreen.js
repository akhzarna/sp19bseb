import React from 'react';
import {SafeAreaView, View, Text, TextInput, Image, Alert, ToastAndroid, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/color'
import STYLES from '../../styles/index';
import axios from "axios";

export default class SignInScreen extends React.Component {

  themeColor = "#1f8e46"; 

  state = {
    username : '',
    password : ''
  }

  loginAction()
  {
    const data = 
        { 
          'email':this.state.username,
          'password':this.state.password  
        };

        const headers = { 
            'content-type':'application/json'
        };

        axios.post('https://thefoodpharmacy.pk/api/auth/login', data, {headers}).
        then(response => {
            if(response.data["status"] === "error")
            {
                Alert.alert("Error", response.data["response"]);
            }

            if(response.data["status"] === "okay")
            {
              this.props.navigation.navigate('Home', {themeColor : this.themeColor, token : response.data["response"]["jwt"], userId : response.data["user"]["id"]})
            }
        }).
        catch(error => {
            Alert.alert("Error", error.message);
        });
  }

  forgotPasswordAction()
  {
    ToastAndroid.show('Forget Password Pressed ', ToastAndroid.SHORT);
  }

  signUpAction()
  {
    this.props.navigation.navigate('SignUp', {themeColor : themeColor})
  }

  render()
  {
    return (
      <SafeAreaView
        style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 70}}>
            <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
              Welcome,
            </Text>
            <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
              Sign in to continue
            </Text>
          </View>
  
          <View style={{marginTop: 20}}>
            <View style={STYLES.inputContainer}>
              <Icon
                name="mail-outline"
                color={COLORS.light}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput placeholder="User name*" style={STYLES.input} value = {this.state.username} onChangeText = {(value) => this.setState({username : value})}/>
            </View>
            <View style={STYLES.inputContainer}>
              <Icon
                name="lock-outline"
                color={COLORS.light}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                placeholder="Password*"
                style={STYLES.input}
                secureTextEntry
                value = {this.state.password} onChangeText = {(value) => this.setState({password : value})}
              />
            </View>

            <TouchableOpacity style = {{marginTop : 20}} onPress = {() => this.forgotPasswordAction()}>
                <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                  Forgot a Password?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={STYLES.btnPrimary} onPress = {() => this.loginAction()}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                  Log In
                </Text>
            </TouchableOpacity>
            
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={STYLES.line}></View>
              <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
              <View style={STYLES.line}></View>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={STYLES.btnSecondary}>
                <Image
                  style={STYLES.btnImage}
                  source={require('../../assests/facebook1.png')}
                />
                <Text style={{fontWeight: 'bold', fontSize: 13}}>
                  Continue with Facebook
                </Text>
                
              </View>
              <View style={{width: 10}}></View>
              <View style={STYLES.btnSecondary}>
                <Image
                  style={STYLES.btnImage}
                  source={require('../../assests/google.png')}
                />
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  Continue with Google
                </Text>
                
              </View>
            </View>
          </View>
          
  
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginTop: 40,
              marginBottom: 20,
            }}>
            <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
              Don`t have an account ?
            </Text>
            <TouchableOpacity onPress={() => this.signUpAction()}>
              <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
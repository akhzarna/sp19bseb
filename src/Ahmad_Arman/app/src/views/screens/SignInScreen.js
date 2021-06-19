import React from 'react';
import {SafeAreaView, View, Text, TextInput, Image, Alert, ToastAndroid, StyleSheet, 
  TouchableOpacity, ScrollView, ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/color'
import STYLES from '../../styles/index';
import axios from "axios";

export default class SignInScreen extends React.Component {
  state = {
    username : '',
    password : '',
    activityIndicator:0,
  }

  loginAction()
  {

    if(this.state.username.length == 0 || this.state.password.length == 0){
      Alert.alert('Username or password must not be empty');
    }else{
    this.setState({activityIndicator:1});
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
            this.setState({activityIndicator:0});
            if(response.data["status"] === "error")
            {
                Alert.alert("Error", response.data["response"]);
            }

            if(response.data["status"] === "okay")
            {
              this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : response.data["response"]["jwt"], userId : response.data["user"]["id"]})
            }
        }).
        catch(error => {
            Alert.alert("Error", error.message);
            this.setState({activityIndicator:0});
        });
    }
  }

  forgotPasswordAction()
  {
    ToastAndroid.show('Forget Password Pressed ', ToastAndroid.SHORT);
  }

  signUpAction()
  {
    this.props.navigation.navigate('SignUp', {themeColor : this.props.route.params.themeColor})
  }

  render()
  {
    return (
    <ImageBackground source={require('./bcbcbc.png')} style={styles.backgroundImage} >
      <View style = {{flex : 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{paddingHorizontal: 20, flex: 1}}>
            
            <View style={{marginTop: 50}}>
              {/* Nothing to do with this */}
            </View>
    
            <View style={{marginTop: 20}}>
              <View style={STYLES.inputContainer}>
                <Icon
                  name="mail-outline"
                  color={COLORS.light}
                  size={20}
                  style={STYLES.inputIcon}
                />
                <TextInput placeholder="Username*" style={STYLES.input} value = {this.state.username} onChangeText = {(value) => this.setState({username : value})}/>
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
            <View style={{flex:1,flexDirection:'row'}}>
              <TouchableOpacity style = {{marginTop : 20, marginLeft:10, marginRight:40}} onPress = {() => this.forgotPasswordAction()}>
                  <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                    Remember me
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity style = {{marginTop : 20}} onPress = {() => this.forgotPasswordAction()}>
                  <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                    Forgot a Password?
                  </Text>
              </TouchableOpacity>

            </View>

            {this.state.activityIndicator?(<ActivityIndicator size="large" color="#00ff00" />):
              (null)
            }

              <TouchableOpacity style={STYLES.btnPrimary} onPress = {() => this.loginAction()}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                    Log In
                  </Text>
              </TouchableOpacity>
              
              <View
                style={{
                  marginVertical: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={STYLES.line}></View>
                <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
                <View style={STYLES.line}></View>
              </View>
              
              <TouchableOpacity style={STYLES.btnSecondarySignUp} onPress = {() => this.signUpAction()}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                    Sign Up
                  </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>

                <View>
                  <Text style={{textAlign:'center', marginTop:5, marginBottom:5}}>  Login with: </Text>
                </View>
               
              <View style={{width: 10,}}></View>
                 
                <View style={STYLES.btnSecondary}>
                  <Image
                    style={STYLES.btnImage}
                    source={require('../../assests/google.png')}
                  />
                    <Text style={{marginLeft:5, fontWeight: 'bold', fontSize: 14}}>
                      Continue with Google
                    </Text>
                </View>


                <View style={STYLES.btnSecondary}>
                  <Image
                    style={STYLES.btnImage}
                    source={require('../../assests/facebook1.png')}
                  />
                  <Text style={{marginLeft:5, fontWeight: 'bold', fontSize: 13}}>
                    Continue with Facebook
                  </Text>
                </View>

              </View>

            </View>
            
    
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginTop: 40
              }}>
              <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
                Don`t have an account?
              </Text>
              <TouchableOpacity onPress={() => this.signUpAction()}>
                <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
                  {'\t'}Sign up
                </Text>
              </TouchableOpacity>
            </View> */}

          </View>
        </ScrollView>
      </View>
    </ImageBackground>

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
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
},

});
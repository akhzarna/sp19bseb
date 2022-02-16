import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, Text, TextInput, Image, Alert, ToastAndroid, StyleSheet,
  TouchableOpacity, ScrollView, ImageBackground,
  ActivityIndicator, Button
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/color'
import STYLES from '../../styles/index';
import axios from "axios";

import AnimatedLoader from "react-native-animated-loader";
import database from '@react-native-firebase/database';

import auth from '@react-native-firebase/auth';

import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import admob, { MaxAdContentRating, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';

GoogleSignin.configure({
  webClientId: '153880057107-8fmpvvgq647977cab5aur29u395chc2a.apps.googleusercontent.com',
});

function SingIn() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text> Login </Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{color:'black'}}> Welcome {user.name}</Text>
    </View>
  );
}


export default class SignInScreen extends React.Component {
  state = {
    username : 'ammar@gmail.com',
    password : '123456',
    visible: false,
  }

   onGoogleButtonPress = async () => {
    this.setState({visible:true});
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential).then(() => {
      this.setState({visible:false});
      console.log('User signed in with google credentials = ',googleCredential);
      this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : googleCredential.token, userId : googleCredential.uid, email : googleCredential.email})
    })
    .catch(error => {
      this.setState({visible:false});
      console.log(error.code);
      console.error(error);
    });

  }

  onFacebookButtonPress = async () => {

    // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  console.log('Facebook Credentials are = ',facebookCredential);

  // Sign-in the user with the credential
  // return auth().signInWithCredential(facebookCredential);

  auth().signInWithCredential(facebookCredential).then(() => {
    this.setState({visible:false});
    console.log('User signed in with facebookCredential credentials = ',facebookCredential);
    this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : facebookCredential.token, userId : facebookCredential.uid, email : facebookCredential.email})
  })
  .catch(error => {
    this.setState({visible:false});
    console.log(error.code);
    console.error(error);
  });

  }

  componentDidMount(){
    // Testing
    // console.log('Testing my Database');
    // database()
    // .ref('/Student')
    // .on('value', snapshot => {
    // console.log('User data: ', snapshot.val());
    // });

  }

  loginAction(){

  // auth()
  // .signOut()
  // .then(() => console.log('User signed out!'));

  // auth()
  // .onAuthStateChanged((user)=>{
  //   if(user){
  //     console.log('Yes user is signed IN')
  //     console.log(user);
  //   }else{
  //     console.log('Yes user is not signed')
  //     console.log(user);
  //   }
  // })



    // auth()
    // .signInWithEmailAndPassword('saboor12@example.com', '123456')
    // .then((userCredentials) => {
    //   var user = userCredentials.user;
    //   console.log('User signed in!');
    //   this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : user.uid, userId : user.uid, email : user.email})
    // })
    // .catch(error => {
    //   this.setState({visible:false});
    //   // if (error.code === 'auth/email-already-in-use') {
    //   //   console.log('That email address is already in use!');
    //   // }

    //   // if (error.code === 'auth/invalid-email') {
    //   //   console.log('That email address is invalid!');
    //   // }
    //   console.log(error.code);
    //   console.error(error);
    // });




  // auth()
  // .createUserWithEmailAndPassword('sadam@gmail.com', '123456')
  // .then(() => {
  //   console.log('User account created & signed in!');
  // })
  // .catch(error => {
  //   if (error.code === 'auth/email-already-in-use') {
  //     console.log('That email address is already in use!');
  //   }

  //   if (error.code === 'auth/invalid-email') {
  //     console.log('That email address is invalid!');
  //   }

  //   console.error(error);
  // });




    if(this.state.username.length == 0 || this.state.password.length == 0){
      Alert.alert('Username or password must not be empty');
    }else{
        this.setState({visible:true});
        const data =
        {
          'email':this.state.username,
          'password':this.state.password
        };

        auth()
        .signInWithEmailAndPassword(this.state.username, this.state.password)
        .then((userCredentials) => {
          this.setState({visible:false});
          var user = userCredentials.user;
          console.log('User signed in!',user);
          this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : user.uid, userId : user.uid, email : user.email});
        })
        .catch(error => {
          this.setState({visible:false});
          // if (error.code === 'auth/email-already-in-use') {
          //   console.log('That email address is already in use!');
          // }

          // if (error.code === 'auth/invalid-email') {
          //   console.log('That email address is invalid!');
          // }
          console.log(error.code);
          // console.error(error);
          Alert.alert(error.code);
        });

      }



    // if(this.state.username.length == 0 || this.state.password.length == 0){
    //   Alert.alert('Username or password must not be empty');
    // }else{
    //     this.setState({visible:true});
    //     const data =
    //     {
    //       'email':this.state.username,
    //       'password':this.state.password
    //     };

    //     auth()
    //     .createUserWithEmailAndPassword(this.state.username, this.state.password)
    //     .then(() => {
    //       this.setState({visible:false});
    //       console.log('User account created & signed in!');
    //       // this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : response.data["response"]["jwt"], userId : response.data["user"]["id"], email : this.state.username})
    //     })
    //     .catch(error => {
    //       this.setState({visible:false});
    //       if (error.code === 'auth/email-already-in-use') {
    //         console.log('That email address is already in use!');
    //       }

    //       if (error.code === 'auth/invalid-email') {
    //         console.log('That email address is invalid!');
    //       }
    //       console.error(error);
    //     });





        // const headers = {
        //     'content-type':'application/json'
        // };

        // axios.post('https://thefoodpharmacy.general.greengrapez.com/api/auth/login', data, {headers}).
        // then(response => {
        //     this.setState({visible:false});
        //     if(response.data["status"] === "error")
        //     {
        //         Alert.alert("Error", response.data["response"]);
        //     }

        //     if(response.data["status"] === "okay")
        //     {
        //       this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : response.data["response"]["jwt"], userId : response.data["user"]["id"], email : this.state.username})
        //     }
        // }).
        // catch(error => {
        //     Alert.alert("Error", error.message);
        //     this.setState({visible:false});
        // });


  }

  forgotPasswordAction()
  {
    ToastAndroid.show('Forget Password Pressed ', ToastAndroid.SHORT);
  }

  signUpAction()
  {
    this.props.navigation.navigate('SignUp', {themeColor : this.props.route.params.themeColor})
  }

  guestUserAction(){

  auth()
  .signInAnonymously()
  .then((userCredentials) => {
    var user = userCredentials.user;
    console.log('User signed in anonymously',user);
    this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : user.uid, userId : user.uid, email : user.email});
  })
  .catch(error => {
    if (error.code === 'auth/operation-not-allowed') {
      console.log('Enable anonymous in your firebase console.');
    }
    console.error(error);
  });


      // Signin Anonymously
  // auth()
  // .signInAnonymously()
  // .then((userCredentials) => {
  //   var user = userCredentials.user;
  //   console.log('User signed in anonymously',user);
  //   this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : user.uid, userId : user.uid, email : user.email})
  // })
  // .catch(error => {
  //   if (error.code === 'auth/operation-not-allowed') {
  //     console.log('Enable anonymous in your firebase console.');
  //   }
  //   console.error('Error is = ',error);
  // });

  }

  render(){
    return (

      //JSX

    <ImageBackground source={require('./bcbcbc.png')} style={styles.backgroundImage} >

      <View style = {{flex : 1}}>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{paddingHorizontal: 20, flex: 1}}>

            <View style={{marginTop: 50}}>
              {/* Nothing to do with this */}
            </View>

            <Button
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />

            <Text> In The Name of Allah </Text>

            <Text> In The Name of Allah </Text>

            <Text> In The Name of Allah </Text>

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

              <SingIn />

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

            {this.state.visible?(
                <AnimatedLoader
                  visible={this.state.visible}
                  overlayColor="rgba(255,255,255,0.75)"
                  source={require("./loader.json")}
                  animationStyle={styles.lottie}
                  speed={1}
                >
                  <Text> Processing...</Text>
                </AnimatedLoader>
            ):
              (null)
            }

              <TouchableOpacity style={STYLES.btnPrimary} onPress = {() => this.loginAction()}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                    Ali Log In
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
                  flexDirection:'column',
                  marginTop:10,
                   }}>
                  <Text style={{textAlign:'center',
                                 marginTop:5,
                                 marginBottom:5,
                                 fontWeight:'bold',
                                 fontSize:15
                    }}>  Login with: </Text>

              <TouchableOpacity style={STYLES.btnGuestUser} onPress = {() => this.guestUserAction()}>

              <Image
                    style={STYLES.btnImage}
                    source={require('../../assests/guestuser.jpeg')}
                   />
                   <Text style={{marginLeft:5,fontSize: 16 ,fontWeight:'bold'}}>
                      Guest User
                   </Text>

              </TouchableOpacity>

              <View style={{flexDirection:'row',marginTop:25}}>



                <TouchableOpacity style={STYLES.btnFb} onPress = {() => this.onFacebookButtonPress()}>

                  <Image
                    style={STYLES.btnImage}
                    source={require('../../assests/facebook.png')}
                  />

                  <Text style={{marginLeft:15, fontWeight: 'bold', fontSize: 16,color:'#fff'}}>
                    FACBOOK Ali Hussain - This is Akhzar Nazir
                  </Text>

                </TouchableOpacity>
         <TouchableOpacity style={STYLES.btnGo} onPress = {() => this.onGoogleButtonPress()}>

                   <Image
                    style={STYLES.btnImage}
                    source={require('../../assests/goog.png')}
                   />
             <Text style={{marginLeft:15, fontWeight: 'bold', fontSize: 16,color:'#fff'}}>
                   GOOGLE with Ali Hussain
             </Text>

          </TouchableOpacity>

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

        <View style={{flex:0,backgroundColor:'transparent',}}>
          <BannerAd size={BannerAdSize.SMART_BANNER}
                    unitId={"ca-app-pub-9152919921144751/3500302987"}>
          </BannerAd>
        </View>

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
  lottie: {
    width: 100,
    height: 100
  }

});

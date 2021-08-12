import axios from 'axios';
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ImageBackground,
    Image,
    Alert,
    ScrollView
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import AnimatedLoader from "react-native-animated-loader";

import auth from '@react-native-firebase/auth';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            city: this.cities[0],
            visible: false,
        };
    }

    cities = ['Lahore', 'Karachi', 'Islamabad', 'Sialkot', 'Rawalpindi', 'Faisalabad'];

    validation() {
        const { email, password, name, phone, city } = this.state;
        var check = false;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == '') {
            Alert.alert("Error", "Please enter an email")
        } else if (reg.test(email.replace(/\s/g, '')) === false) {
            Alert.alert("Error", "Please enter valid email")
        } else if (password == '') {
            Alert.alert("Error", 'Please enter password')
        } else if (name == '') {
            Alert.alert("Error", "Please enter name")
        } else if (phone == '') {
            Alert.alert("Error", "Please enter phone number")
        } else if (city == '') {
            Alert.alert("Error", "Please enter city")
        } else {
            check = true;
        }
        return check;
    }

    backToLogIn()
    {
        this.props.navigation.goBack();
    }

    signUpFunction() {
        const { email, password, name, phone, city } = this.state
        var params = {
            name: name,
            email: email.replace(/\s/g, ''),
            phone: phone,
            password: password,
            city: city
        };
        console.log(params);
        if (this.validation()) {
            this.setState({visible:true});
           


        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {

        
          this.setState({visible:false});
          console.log('User account created & signed in!');
          // this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : response.data["response"]["jwt"], userId : response.data["user"]["id"], email : this.state.username})
        })
        .catch(error => {
          this.setState({visible:false});
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });


            // axios.post('https://thefoodpharmacy.general.greengrapez.com/api/auth/register', JSON.stringify(params), {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "Access-Control-Allow-Origin": "*",
            //     },
            // }).then((response) => {
            //     Alert.alert("Sign Up Successful", "Go Back and log in now.", [{text : "Log In", onPress : () => this.backToLogIn(), style : 'default'}]);
            //     this.setState({visible:false});
            // }).catch((err) => {
            //     Alert.alert("Error", err.response.data.response.message);
            //     this.setState({visible:false});
            // });



        }
    }

    render() {

        return (

            <ImageBackground source={require('./assets/images/bcbcbc.png')} style={styles.backgroundImage} >

                <ScrollView>

                <View style={styles.container}>

                    {/* <Text style={styles.pageHeading}>Register</Text> */}

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/name.png')} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Name *"
                            placeholderTextColor="#000"
                            color="#000"
                            value={this.state.name}
                            onChangeText={(text) => { this.setState({ name: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/email.png')} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email *"
                            placeholderTextColor="#000"
                            color="#000"
                            keyboardType="email-address"
                            value={this.state.email}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/password.png')} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password *"
                            placeholderTextColor="#000"
                            color="#000"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/cal_now.png')} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Phone No *"
                            placeholderTextColor="#000"
                            color="#000"
                            keyboardType="number-pad"
                            value={this.state.phone}
                            onChangeText={(text) => { this.setState({ phone: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/address.png')} />
                        <View style={{ height : 40, justifyContent : 'center', flex : 1}}>
                            <Picker
                                selectedValue = {this.state.city}
                                mode = 'dropdown'
                                onValueChange = {(value) => this.setState({city : value})}
                                style = {{height : 40}}>
                                    {this.cities.map(city => 
                                      <Picker.Item label={city} value={city} />  
                                    )}
                            </Picker>
                        </View>
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

                    <TouchableOpacity style={styles.signupBtn} onPress={() => {
                        this.signUpFunction()
                    }}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>

                </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 50,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

    pageHeading: {
        color: "#000",
        fontSize: 40,
        alignSelf: "center",
        marginBottom: 50,
        letterSpacing: 2,
    },

    inputView: {
        width: "80%",
        marginBottom: 20,
        borderBottomWidth: 2,
        borderColor: '#696969',
        alignSelf: "center",
        flexDirection: 'row',
    },

    inputImage: {
        margin: 10,
        alignSelf: "center",
        width:20,
        height:20,
    },

    textInput: {
        flex: 1,
    },

    signupBtn: {
        width: "80%",
        height: 45,
        marginTop:20,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#408F48",
    },

    signupText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        alignSelf: "center",
        zIndex: -1
    },

    loginButton: {
        alignSelf: "center",
        marginTop: 30,
    },

    loginText: {
        color: "#000",
        fontSize: 16,
        fontStyle: "italic",
        textDecorationLine: "underline",
    },
    
    lottie: {
    width: 100,
    height: 100
  }
});
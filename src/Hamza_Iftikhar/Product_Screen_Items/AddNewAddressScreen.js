import axios from 'axios';
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    ScrollView,
    SafeAreaView
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import AnimatedLoader from "react-native-animated-loader";
import MyHeader from '../MyHeader';

export default class AddNewAddressScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            countries: this.countries[0],
            states: this.states[0],
            city: this.cities[0],
            visible: false,
        };
    }

    countries = ['Pakistan', 'India', 'Bangladesh', 'Afghanistan', 'Sri Lanka'];
    states = ['Punjab', 'Sindh', 'Balochistan', 'KPK', 'Kashmir', 'East Pakistan'];
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

    logInNow()
    {
        this.setState({visible:true});
        const data = 
        { 
          'email':this.state.email,
          'password':this.state.password
        };

        const headers = { 
            'content-type':'application/json'
        };

        axios.post('https://thefoodpharmacy.general.greengrapez.com/api/auth/login', data, {headers}).
        then(response => {
            this.setState({visible:false});
            if(response.data["status"] === "error")
            {
                Alert.alert("Error", response.data["response"]);
            }

            if(response.data["status"] === "okay")
            {
              this.props.navigation.navigate('AfterLogIn', {themeColor : this.props.route.params.themeColor, token : response.data["response"]["jwt"], userId : response.data["user"]["id"], email : this.state.email, name : response.data["user"]["name"]})
            }
        }).
        catch(error => {
            Alert.alert("Error", error.message);
            this.setState({visible:false});
        });
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
            axios.post('https://thefoodpharmacy.general.greengrapez.com/api/auth/register', JSON.stringify(params), {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
            }).then((response) => {
                //Alert.alert("Sign Up Successful", "Go Back and log in now.", [{text : "Log In", onPress : () => this.logInNow(), style : 'default'}]);
                this.setState({visible:false});
                this.logInNow();
            }).catch((err) => {
                console.log(err.response.data);
                Alert.alert("Error", err.response.data.response.message);
                this.setState({visible:false});
            });
        }
    }

    render() {

        return (

            <SafeAreaView style = {styles.safeAreaView}>
            <View style = {styles.mainContainer}>
                <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} token = {this.props.route.params.token} homeScreen = {true} />

                <ScrollView>
                <View style={styles.container}>
                <Text style={{color:'green', fontSize:30, fontWeight:'bold', margin:10}}>Add Address:</Text>

                    {/* <Text style={styles.pageHeading}>Register</Text> */}

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="First Name *"
                            placeholderTextColor="#000"
                            color="#000"
                            value={this.state.name}
                            onChangeText={(text) => { this.setState({ name: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Last Name *"
                            placeholderTextColor="#000"
                            color="#000"
                            value={this.state.name}
                            onChangeText={(text) => { this.setState({ name: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email *"
                            placeholderTextColor="#000"
                            color="#000"
                            value={this.state.email}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                        />
                    </View>

                    {/* <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password *"
                            placeholderTextColor="#000"
                            color="#000"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                        />
                    </View> */}

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Phone No *"
                            placeholderTextColor="#000"
                            color="#000"
                            keyboardType="decimal-pad"
                            value={this.state.phone}
                            onChangeText={(text) => { this.setState({ phone: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Address *"
                            placeholderTextColor="#000"
                            color="#000"
                            value={this.state.name}
                            onChangeText={(text) => { this.setState({ name: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Zip Code *"
                            placeholderTextColor="#000"
                            color="#000"
                            keyboardType="decimal-pad"
                            value={this.state.phone}
                            onChangeText={(text) => { this.setState({ phone: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <View style={{ height : 40, justifyContent : 'center', flex : 1}}>
                            <Picker
                                selectedValue = {this.state.countries}
                                mode = 'dropdown'
                                onValueChange = {(value) => this.setState({countries : value})}
                                style = {{height : 40}}>
                                    {this.countries.map(countries => 
                                      <Picker.Item label={countries} value={countries} />  
                                    )}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputView}>
                        <View style={{ height : 40, justifyContent : 'center', flex : 1}}>
                            <Picker
                                selectedValue = {this.state.states}
                                mode = 'dropdown'
                                onValueChange = {(value) => this.setState({states : value})}
                                style = {{height : 40}}>
                                    {this.states.map(states => 
                                      <Picker.Item label={states} value={states} />  
                                    )}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputView}>
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
                    source={require("../loader.json")}
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
                        <Text style={styles.signupText}>Save Address</Text>
                    </TouchableOpacity>

                </View>
                </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    safeAreaView : 
    {
        backgroundColor : 'white',
        flex : 1
    },
    mainContainer : 
    {
        flex : 1
    },

    container: {
        flex: 1,
        justifyContent: "center",
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
        borderWidth : 2,
        borderColor: '#696969',
        backgroundColor : 'white',
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
        backgroundColor : 'white'
    },

    signupBtn: {
        width: "80%",
        height: 45,
        marginTop:10,
        marginBottom:10,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#408F48",
    },

    signupText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        // textTransform: 'uppercase',
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
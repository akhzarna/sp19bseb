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
    Alert
} from 'react-native';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            city: '',
        };
    }

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
        if (this.validation()) {
            axios.post('https://thefoodpharmacy.pk/api/auth/register', JSON.stringify(params), {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
            }).then((response) => {
                Alert.alert("Sign Up Successful", "Go Back and log in now.", [{text : "Log In", onPress : () => this.backToLogIn(), style : 'default'}]);
            }).catch((err) => {
                Alert.alert("Error", err.response.data.response.message);
            });
        }
    }

    render() {

        return (

            <ImageBackground source={require('./assets/images/bg-material.png')} style={styles.backgroundImage} >

                <View style={styles.container}>

                    <Text style={styles.pageHeading}>Register</Text>

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/user.png')} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Name *"
                            placeholderTextColor="#fff"
                            color="#fff"
                            value={this.state.name}
                            onChangeText={(text) => { this.setState({ name: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/email.png')} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email *"
                            placeholderTextColor="#fff"
                            color="#fff"
                            keyboardType="email-address"
                            value={this.state.email}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/call.png')} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Phone No *"
                            placeholderTextColor="#fff"
                            color="#fff"
                            keyboardType="number-pad"
                            value={this.state.phone}
                            onChangeText={(text) => { this.setState({ phone: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/key.png')} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="City *"
                            placeholderTextColor="#fff"
                            color="#fff"
                            value={this.state.city}
                            onChangeText={(text) => { this.setState({ city: text }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Image style={styles.inputImage} source={require('./assets/images/key.png')} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password *"
                            placeholderTextColor="#fff"
                            color="#fff"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                        />
                    </View>

                    <TouchableOpacity style={styles.signupBtn} onPress={() => {
                        this.signUpFunction()
                    }}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress = {() => this.backToLogIn()}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        margin: 10,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

    pageHeading: {
        color: "#fff",
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
    },

    textInput: {
        flex: 1,
    },

    signupBtn: {
        width: "80%",
        height: 45,
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
        color: "#fff",
        fontSize: 16,
        fontStyle: "italic",
        textDecorationLine: "underline",
    },

});
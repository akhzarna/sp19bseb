import React from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView, 
    StyleSheet,
    View,
    Alert,
    Image
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';

import AnimatedLoader from "react-native-animated-loader";
import axios from "axios";

import MyHeader from '../Hamza_Iftikhar/MyHeader.js';

export default class PaymentScreen extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            name : '',
            selectedValue : '',
            imageName : '',
            imageUri : '',
            visible : false
        }
    }

    submitButton()
    {
        if(this.state.name.length == 0){
            Alert.alert('Name must not be empty');
        }
        else
        {
            if(this.state.selectedValue == '')
            {
                this.state.selectedValue = '1';
            }
            const formData = new FormData();
            formData.append('email', this.props.route.params.email);
            formData.append('name', this.state.name);
            formData.append('amount', this.state.selectedValue == '1' ? '5000' : this.state.selectedValue == '2' ? '20000' : '25000');
            formData.append('package', this.state.selectedValue == '1' ? '1 Session' : this.state.selectedValue == '2' ? '2 Sessions' : '4 Sessions');
            formData.append('user_id', this.props.route.params.userId);
            formData.append('file', 
            {
                uri : this.state.imageUri,
                name : this.state.imageName,
                type: 'image/*'
            })

            this.setState({visible : true});

            const headers = { 
                'Authorization': 'Bearer ' + this.props.route.params.token,
                'content-type':'multipart/form-data'
            };

            axios.post('https://thefoodpharmacy.pk/api/auth/bank_slip', formData, {headers}).
            then(response => {
                if(response.data["status"] === "error")
                {
                    this.setState({visible : false});
                    Alert.alert("Error", response.data["response"]);
                }

                if(response.data["status"] === "okay")
                {
                    this.setState({visible : false});
                    Alert.alert("Submission Status", "Data submitted successfully", [{text : "Ok", onPress : () => this.props.navigation.goBack(), style : 'default'}]);
                }
            }).
            catch(error => {
                this.setState({visible : false});
                Alert.alert("Error", error.message);
            });
        }
    }

    launchImagePicker()
    {
        let options = 
        {
            storageOptions: 
            {
              skipBackup: true,
              path: 'images',
            },
        };

          ImagePicker.launchImageLibrary(options, (response) => {      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              console.log('response', JSON.stringify(response))

              this.setState({
                imageUri:  Platform.OS === "android" ? response.assets[0].uri : response.assets[0].uri.replace("file://", ""), 
                imageName: `dummy${Date.now()}.jpg`,
              });
            }
          });
    }

    render()
    {
        return(
            <View style = {{flex : 1}}>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {false}/>

                    <View style={{padding: 10, flexDirection : 'column'}}>
                        <Text style={[styles.heading, {color : this.props.route.params.themeColor}]}>
                            UPLOAD SLIP
                        </Text>

                        <View style = {{marginHorizontal : 30, marginVertical : 5}}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput style={styles.input} placeholder="Name" onChangeText = {(value) => this.setState({name : value})} value = {this.state.name}/>

                            <Text style={styles.label}>Amount</Text>
                            <View style={styles.dropDown}>
                                <Picker
                                    value= {this.state.selectedValue}
                                    mode = 'dropdown'
                                    onValueChange = {(value) => this.setState({selectedValue : value})}
                                    style = {[styles.dropDownLabel, {height : 30}]}>
                                        <Picker.Item label="1 Session (5,000)" value="1" style = {styles.dropDownLabel}/>
                                        <Picker.Item label="2 Session (20,000)" value="2" style = {styles.dropDownLabel}/>
                                        <Picker.Item label="4 Session (25,000)" value="3" style = {styles.dropDownLabel}/>
                                </Picker>
                            </View>

                            <Text style={styles.label}>Upload Image</Text>
                            {this.state.imageUri.length != 0 ? (
                                <Image style = {{height : 200, width : 200}} source = {{uri : this.state.imageUri}}/>
                            ) : null}
                            <TouchableOpacity style={{backgroundColor : 'gray', width : '40%', marginVertical : 10, alignItems : 'center'}} onPress={() => this.launchImagePicker()}>
                                <Text style={{color: 'white', padding : 3}}>CHOOSE A FILE</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{backgroundColor : this.props.route.params.themeColor, width : '30%', marginVertical : 10, alignItems : 'center', borderRadius : 5}} onPress={() => this.submitButton()}>
                                <Text style={{color: 'white', padding : 5}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        this.state.visible ?
                        (
                            <AnimatedLoader
                                visible={this.state.visible}
                                overlayColor="rgba(255,255,255,0.75)"
                                source={require("./loader.json")}
                                animationStyle={styles.lottie}
                                speed={1}
                            >
                                <Text> Uploading...</Text>
                            </AnimatedLoader>            
                        ):(null)
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading :
    {
        marginHorizontal: 15,
        marginTop : 10,
        fontSize: 30,
        fontWeight : 'bold'
    },
    label : {
        fontSize: 18
    },
    dropDown : {
        height : 40,
        borderWidth: 1,
        borderColor : 'gray',
        justifyContent : 'center',
        fontSize : 18,
        marginVertical : 10
    },
    dropDownLabel : 
    {
        fontSize : 15
    },
    input: {
        height: 30,
        borderWidth: 1,
        borderColor : 'gray',
        textAlign : 'left',
        marginVertical : 10,
        fontSize : 15,
        padding : 0,
        paddingHorizontal : 15
    },
    lottie : 
    {
        height : 100,
        width : 100
    }
});
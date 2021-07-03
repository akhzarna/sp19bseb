import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {IconButton, Colors} from 'react-native-paper';
import MyHeader from '../Hamza_Iftikhar/MyHeader.js';
import {
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ToastAndroid,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  BackHandler,
} from 'react-native';

import AnimatedLoader from "react-native-animated-loader";

import axios from "axios";

export default class CoachingHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show : false,
      visible : false,
      approved : false,
      pending : false,
      applied : false
    }
  }

  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      // { text: "YES", onPress: () => BackHandler.exitApp() }
      { text: "YES", onPress: () => this.props.navigation.pop() }
    ]);
    return true;
  };


  fetchDataFromAPI()
  {
    this.setState({visible:true});

    const headers = { 
        'Authorization': 'Bearer ' + this.props.route.params.token,
        'content-type':'application/json'
    };

    axios.get('https://thefoodpharmacy.general.greengrapez.com/api/auth/status/' + this.props.route.params.userId, {headers}).
    then(response => {
      if(response.data["status"] === "okay"){
        console.log('Data is =',response.data["response"]["Status"]);
        if(response.data['response']['Status'] == 'pending')
        {
          this.setState({pending : true, approved : false, applied : true});
        }
        else if(response.data['response']['Status'] == 'approved')
        {
          this.setState({pending : false, approved : true, applied : true});
        }
        else if(response.data['response']['Status'] == 'cant find such slip')
        {
          this.setState({pending : false, approved : false, applied : false});
        }
        // this.setState({approved : true});
        this.setState({visible:false});
      }else if(response.data["status"] === "error"){
        console.log('Error is =',response.data["response"]["message"]);
        this.setState({visible:false});
      }
    }).
    catch(error => {
      Alert.alert("Error", error.message);
      this.setState({visible:false});
    });
  }

  componentDidMount() {

    this.unsubscribeFocus  = this.props.navigation.addListener('focus', () => {
      this.fetchDataFromAPI();
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction
      );
     });

    this.unsubscribeBlur = this.props.navigation.addListener('blur', () => {
      BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
    this.unsubscribeBlur();
  }

  goToHealthHistory()
  {
    this.props.navigation.navigate('Health', {themeColor : this.props.route.params.themeColor, token : this.props.route.params.token, userId : this.props.route.params.userId})
  }

  goToDietPlan()
  {
    this.props.navigation.navigate('Diet', {themeColor : this.props.route.params.themeColor, token : this.props.route.params.token, userId : this.props.route.params.userId})
  }

  goToSelectScreen()
  {
    this.props.navigation.navigate('Select', {themeColor : this.props.route.params.themeColor, token : this.props.route.params.token, userId : this.props.route.params.userId})
  }

  render() {
    return (
      <View style={{flex:1}}>
        <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {true}/>
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
          (
            <ScrollView showsVerticalScrollIndicator = {false}>
              <View style = {{flex : 1}}>
                {/* App Bar  */}
                {this.state.pending?(
                  <View style={{marginVertical : 20, backgroundColor: 'lightgrey', width: '80%', height: 40, justifyContent: 'center', alignItems: 'center', alignSelf : 'center'}}>
                    <Text style={styles.textTop}>Please wait for Payment approval.</Text>
                  </View>
                ) : !this.state.applied?(
                  <View style={{marginVertical : 20, backgroundColor: 'lightgrey', width: '80%', height: 40, justifyContent: 'center', alignItems: 'center', alignSelf : 'center'}}>
                    <Text style={styles.textTop}>Please create your payment request.</Text>
                  </View>
                ) : null}

                <View style = {{width : "85%", alignSelf : 'center', marginVertical : 20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent : 'center'}}>
                    <Text style={{color: '#1f8e46', fontSize: 16, fontFamily: 'Entypo', paddingVertical : 5}}>
                      Coaching:
                    </Text>

                    <TouchableOpacity style={[{backgroundColor : !this.state.applied ? this.props.route.params.themeColor : 'grey'}, styles.button]} onPress={() => this.goToSelectScreen()} disabled = {this.state.applied}>
                      <Text style={{color: 'lightgrey'}}>Create +</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Calendar Image and button */}
                  
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent : 'center', marginVertical : 30}}>
                    <Image style={styles.tinyLogo} source={require('./img/calendar.png')}/>
                    <TouchableOpacity
                      disabled = {!this.state.approved}
                      style={[{borderColor : this.state.approved ? this.props.route.params.themeColor : 'grey'}, styles.scheduleBtn]}
                      onPress={() => {
                        this.setState({show: true});
                      }}>

                      <Text style={styles.buttontext}>SCHEDULE</Text>
                    </TouchableOpacity>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={this.state.show}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: '#000000aa',
                        }}>
                        <View style={styles.container}>
                          <WebView
                            source={{uri: 'https://calendly.com/info-27679/15min'}}
                          />

                          <IconButton
                            style={styles.closeButton}
                            icon="close"
                            color={Colors.green500}
                            size={35}
                            onPress={() => {
                              this.setState({show: false});
                            }}
                          />
                        </View>
                      </View>
                    </Modal>
                  </View>

                  {/* Health history Image and button */}
                  
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent : 'center', marginVertical : 30}}>
                    
                    <Image
                      style={styles.tinyLogo}
                      source={require('./img/helpp.png')}
                    />

                    <TouchableOpacity
                      disabled = {!this.state.approved}
                      style={[{borderColor : this.state.approved ? this.props.route.params.themeColor : 'grey'}, styles.scheduleBtn]}
                      onPress={() => this.goToHealthHistory()}>
                      <Text style={styles.buttontext}>HEALTH HISTORY</Text>
                    </TouchableOpacity>

                  </View>
                  {/* Diet plan image and button */}
                
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent : 'center', marginVertical : 30}}>

                    <Image style={styles.tinyLogo} source={require('./img/diet.png')} />

                    <TouchableOpacity
                      disabled = {!this.state.approved}
                      style={[{borderColor : this.state.approved ? this.props.route.params.themeColor : 'grey'}, styles.scheduleBtn]}
                      onPress={() => this.goToDietPlan()}>
                      <Text style={styles.buttontext}>DIET PLAN</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </ScrollView>
          )
        }
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  textTop: {
    fontSize: 16,
  },
  button: {
    width: '25%',
    height: 30,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor : 'lightgray',
    justifyContent : 'center'
  },
  scheduleBtn: {
    marginTop : 40,
    width: '40%',
    height: 30,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent : 'center',
    borderWidth: 1
  },
  buttontext:{
    fontSize:12,
  },
  tinyLogo: {
    tintColor: '#1f8e46',
    width: 100,
    height: 100,
    resizeMode : 'contain'
  },
  container: {
    flex: 1,
    margin: '6%',
    padding: '4%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
  closeButton: {
    position: 'absolute',
    top: '0.5%',
  },
  lottie: {
    width: 100,
    height: 100
  },
});
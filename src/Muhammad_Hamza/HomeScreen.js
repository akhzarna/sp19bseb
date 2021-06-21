import React, {Component} from 'react';
import {Appbar} from 'react-native-paper';
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

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show : false
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

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
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
        <ScrollView showsVerticalScrollIndicator = {false}>
          <View style = {{flex : 1}}>
              {/* App Bar  */}
              <View style={{marginVertical : 20, backgroundColor: 'lightgrey', width: '80%', height: 40, justifyContent: 'center', alignItems: 'center', alignSelf : 'center'}}>
                <Text style={styles.textTop}>Please wait for Payment approval:</Text>
              </View>

              <View style = {{width : "85%", alignSelf : 'center', marginVertical : 20}}>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent : 'center'}}>
                  <Text style={{color: '#1f8e46', fontSize: 16, fontFamily: 'Entypo', paddingVertical : 5}}>
                    Coaching:
                  </Text>

                  <TouchableOpacity style={styles.button} onPress={() => this.goToSelectScreen()}>
                    <Text style={{color: 'lightgrey'}}>Create +</Text>
                  </TouchableOpacity>
                </View>
                {/* Calendar Image and button */}
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent : 'center', marginVertical : 30}}>
                  <Image style={styles.tinyLogo} source={require('./img/calendar.png')}/>

                  <TouchableOpacity
                    style={styles.scheduleBtn}
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
                    style={styles.scheduleBtn}
                    onPress={() => this.goToHealthHistory()}>
                    <Text style={styles.buttontext}>HEALTH HISTORY</Text>
                  </TouchableOpacity>

                </View>
                {/* Diet plan image and button */}
              
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent : 'center', marginVertical : 30}}>

                  <Image style={styles.tinyLogo} source={require('./img/diet.png')} />

                  <TouchableOpacity
                    style={styles.scheduleBtn}
                    onPress={() => this.goToDietPlan()}>
                    <Text style={styles.buttontext}>DIET PLAN</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
        </ScrollView>
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
    borderColor: 'grey',
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
    borderColor: 'green',
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
});
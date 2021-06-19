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
      { text: "YES", onPress: () => BackHandler.exitApp() }
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

  render() {
    return (
      <SafeAreaView>
          {/* App Bar  */}
        <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {true}/>
        <ScrollView showsVerticalScrollIndicator = {false}>
          <View
            style={{
              marginLeft: '10%',
              marginTop: '4%',
              backgroundColor: '#daedf0',
              width: '79%',
              height: '6%',
            }}>
            <Text style={styles.textTop}>Please wait for Payment approval:</Text>
          </View>

          <View
            style={{
              padding: 25,
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: '#1f8e46',
                  fontSize: 16,
                  marginLeft: '2%',
                  fontWeight: 'bold',
                  fontFamily: 'Entypo',
                }}>
                Coaching:
              </Text>

              <TouchableOpacity style={styles.button}>
                <Text style={{color: '#ff9cff'}}>Create +</Text>
              </TouchableOpacity>
            </View>
            {/* Calendar Image and button */}
            <View
              style={{
                marginTop: '11%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Image
                style={styles.tinyLogo}
                source={require('./img/calendar.png')}
              />

              <TouchableOpacity
                style={styles.scheduleBtn}
                onPress={() => {
                  this.setState({show: true});
                }}>
                <Text>SCHEDULE</Text>
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
            <View
              style={{
                marginTop: '32%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Image
                style={styles.helpLogo}
                source={require('./img/helpp.png')}
              />

              <TouchableOpacity
                style={styles.scheduleBtn}
                onPress={() => this.goToHealthHistory()}>
                <Text>HEALTH HISTORY</Text>
              </TouchableOpacity>
            </View>
            {/* Diet plan image and button */}
            <View
              style={{
                marginTop: '40%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Image style={styles.tinyLogo} source={require('./img/diet.png')} />

              <TouchableOpacity
                style={styles.scheduleBtn}
                onPress={() => this.goToDietPlan()}>
                <Text>DIET PLAN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  icon: {
    width: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textTop: {
    justifyContent: 'center',
    marginLeft: '15%',
    marginTop: '2%',
    fontSize: 14,
  },
  button: {
    borderColor: '#ff9cff',
    width: '21%',
    height: '110%',
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
  },
  scheduleBtn: {
    position: 'relative',
    top: '5%',
    marginTop: '5%',
    width: '41%',
    height: '60%',
    borderColor: 'black',
    borderRadius: 1,
    alignItems: 'center',
    borderWidth: 1,
  },
  tinyLogo: {
    tintColor: '#1f8e46',
    width: '30%',
    height: '234%',
    resizeMode : 'contain'
  },
  helpLogo: {
    tintColor: '#1f8e46',
    width: '37%',
    height: '325%',
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
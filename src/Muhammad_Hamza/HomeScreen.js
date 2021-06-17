import React, {Component} from 'react';
import {Appbar} from 'react-native-paper';
import {Linking, BackHandler} from 'react-native';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ToastAndroid,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const showToastDiet = () => {
      ToastAndroid.show('Diet Plan Pressed ', ToastAndroid.SHORT);
    };
    return (
      <SafeAreaView>
        {/* App Bar  */}
        <Appbar.Header style={[styles.header, {backgroundColor : this.props.route.params.themeColor}]}>
          <Appbar.Action
            icon="menu"
            onPress={() => Alert.alert('Menu Button pressed')}
          />
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => Alert.alert('3 Dots Button pressed')}
          />
        </Appbar.Header>

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
                Linking.openURL('https://calendly.com/info-27679/15min');
              }}>
              <Text>SCHEDULE</Text>
            </TouchableOpacity>
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
              onPress={() => showToastDiet()}>
              <Text>DIET PLAN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  header: {
    justifyContent : 'space-between'
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
    borderColor: '#1f8e46',
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
});
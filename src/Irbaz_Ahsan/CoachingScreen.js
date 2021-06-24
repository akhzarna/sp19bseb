import * as React from 'react';
import { View, TouchableOpacity, Image, Text, Alert, FlatList, ScrollView, StyleSheet, ImageBackground, Button,
  ToastAndroid } from 'react-native';
import MyHeader from '../Hamza_Iftikhar/MyHeader.js';

export default class CoachingScreen extends React.Component {

    submitLiveCoaching()
    {
      this.props.navigation.navigate('Payment', 
        {
          themeColor : this.props.route.params.themeColor, token : this.props.route.params.token, userId : this.props.route.params.userId, email : this.props.route.params.email
        }
      )

    }

    submitPhysicalCoaching()
    {
      this.props.navigation.navigate('Payment', 
        {
          themeColor : this.props.route.params.themeColor, token : this.props.route.params.token, userId : this.props.route.params.userId, email : this.props.route.params.email
        }
      )
    }

    render()
    {
      return(
        <View style = {styles.mainContainer}>
          <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {false}/>
          <ScrollView showsVerticalScrollIndicator = {false}>
            <View style={styles.headerTop}>
              <Text style={styles.textTop}>Physical Coaching not available for now due to current pandemic. Thank you</Text>
            </View>

            <View style = {styles.bodyContainer}>
              <View style = {styles.columnContainer}>
                <Text>Live Coaching</Text>

                <ImageBackground style = {styles.backgroundImage} source={require('./assets/livecoaching.png')} resizeMode="contain">
                  <View style = {{marginTop : '70%'}}>
                    <Text style = {[styles.labelText, {marginLeft : '15%'}]}> Price/session </Text>
                    <Text style = {[styles.labelText, {marginLeft : '55%'}]}> 5000 </Text>

                    <Text style = {[styles.labelText, {marginLeft : '15%'}]}> Price/4 session </Text>
                    <Text style = {[styles.labelText, {marginLeft : '55%'}]}> 20000 </Text>

                    <Text style = {[styles.labelText, {marginLeft : '15%'}]}> Price/5 session </Text>
                    <Text style = {[styles.labelText, {marginLeft : '55%'}]}> 25000 </Text>

                    <Text style = {[styles.labelText, {marginLeft : '15%'}]}> Duration </Text>
                    <Text style = {[styles.labelText, {marginLeft : '55%'}]}> 60 Minutes </Text>

                    <TouchableOpacity style = {styles.submitButton} onPress = {() => this.submitLiveCoaching()}>
                      <Text style={{color:this.props.route.params.themeColor, fontWeight: 'bold'}}>
                        SUBMIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
              <View style = {[styles.columnContainer, {marginLeft : '10%'}]}>
                <Text>Physical Coaching</Text>

                <ImageBackground style = {styles.backgroundImage} source={require('./assets/physicalcoaching.png')} resizeMode="contain">
                  <View style = {{marginTop : '70%'}}>
                    <Text style = {[styles.labelText, {marginLeft : '15%'}]}> Price/session </Text>
                    <Text style = {[styles.labelText, {marginLeft : '55%'}]}> 5000 </Text>

                    <Text style = {[styles.labelText, {marginLeft : '15%'}]}> Price/4 session </Text>
                    <Text style = {[styles.labelText, {marginLeft : '55%'}]}> 20000 </Text>

                    <Text style = {[styles.labelText, {marginLeft : '15%'}]}> Price/5 session </Text>
                    <Text style = {[styles.labelText, {marginLeft : '55%'}]}> 25000 </Text>

                    <Text style = {[styles.labelText, {marginLeft : '15%'}]}> Duration </Text>
                    <Text style = {[styles.labelText, {marginLeft : '55%'}]}> 60 Minutes </Text>

                    <TouchableOpacity style = {styles.submitButton} onPress = {() => this.submitPhysicalCoaching()} disabled = {true}>
                      <Text style={{color:this.props.route.params.themeColor, fontWeight: 'bold'}}>
                        SUBMIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  mainContainer : {
    flex : 1,
    flexDirection : 'column',
    backgroundColor : 'white'
  },
  headerTop : {
    marginVertical : 20,
    backgroundColor: 'lightgrey',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf : 'center'
  },
  textTop: {
    fontSize: 16,
    textAlign : 'center'
  },
  bodyContainer : {
    flexDirection : 'row',
    width : "90%",
    marginVertical : 50,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center'
  },
  columnContainer : {
    flexDirection : 'column',
    width : "40%",
    justifyContent : 'center',
    alignItems : 'center'
  },
  backgroundImage : {
    width : 200,
    height : 400,
    marginVertical : 20
  },
  labelText : {
    fontSize:12,
    color:'white',
    marginTop : 1
  },
  submitButton : {
    marginVertical : 15,
    alignItems:'center',
    backgroundColor : 'white',
    borderTopLeftRadius : 5,
    borderBottomRightRadius : 5,
    borderWidth : 1,
    borderColor : 'white',
    width : '50%',
    height : 30,
    alignContent : 'center',
    justifyContent : 'center',
    alignSelf : 'center'
  }    
});
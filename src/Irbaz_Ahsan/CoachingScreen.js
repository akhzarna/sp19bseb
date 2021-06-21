import * as React from 'react';
import { View, TouchableOpacity, Image, Text, Alert, FlatList, ScrollView, StyleSheet, ImageBackground, Button } from 'react-native';
import MyHeader from '../Hamza_Iftikhar/MyHeader.js';

export default class CoachingScreen extends React.Component {
    
    render()
    {
        return(
           
    <View style={{flex:1,flexDirection: "column", backgroundColor:'white'}}>
    
        <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {true}/>
     
            <View style={{
                flex:2,
                width:'90%',
                backgroundColor: 'lightgrey',
                height: '12.5%',
                marginTop: '5%',
                marginRight: '5%',
                marginLeft: '5%',
                marginBottom: '5%' ,
                }}>
              <Text style={{fontSize: 15, paddingTop: '5%', paddingLeft: '4%', fontFamily: "Roboto"}}>
                Physical coaching not avalable right now due to current pandemic. Thankyou
              </Text>
            </View>
    
    <View style={{flex:10, flexDirection:'row', alignItems:'center',alignContent:'center'}}>
      
      <View style={{flex:1}}>
      
      <Text style={{
        flex:1,
        backgroundColor:'green',
        marginTop:40,
        marginBottom:10,
        alignContent:'center'}}>
                Live Coaching
      </Text>

      <ImageBackground
                style={{
                  flex: 9,
                  }}
                source={require('./assets/livecoaching.png')} resizeMode="contain"
              
                >
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>

      </ImageBackground>
      </View>

      <View style={{flex:1}}>
      
      <Text style={{
        flex:1,
        backgroundColor:'green',
        marginTop:40,
        marginBottom:10,
        alignContent:'center'}}>
                Physical Coaching
      </Text>

      <ImageBackground
                style={{
                  flex: 9,
                  }}
                source={require('./assets/physicalcoaching.png')} resizeMode="contain"
              
                >
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>
                  <Text> Testing Jaari hai </Text>

      </ImageBackground>
      </View>

      {/* <View>
              <Text style={{marginTop:'15%', marginLeft: '18%'}}>
                Live Coaching
              </Text>
              <Text style={{marginTop:'15%', position: 'absolute', left: '55%'}}>
                Physical Coaching
              </Text>
      </View>

      <View style={styles.menuItem}>
        <Text style={{fontSize: 8, marginTop: '5%', color: 'white' }}>
          Price/Session  
        </Text>
        <Text style={{fontSize: 8, marginTop: '5%', color: 'white'}}>
          Price/4Session  
        </Text>
        <Text style={{fontSize: 8, marginTop: '5%', color: 'white'}}>
          Price/5Session  
        </Text>
        <Text style={{fontSize: 8, marginTop: '5%', color: 'white'}}>
          Duration 
        </Text>  
      </View>
      
      <View style={styles.menuPrice}>
        <Text style={{fontSize: 8, marginTop: '20%', color: 'white' }}>
         8000  
        </Text>
        <Text style={{fontSize: 8, marginTop: '18%', color: 'white'}}>
          20000  
        </Text>
        <Text style={{fontSize: 8, marginTop: '15%', color: 'white'}}>
          25000  
        </Text>
        <Text style={{fontSize: 8, marginTop: '10%', color: 'white'}}>
          40 Minutes 
        </Text>  
      </View>

      <View style={styles.menuItem2}>
        <Text style={{fontSize: 8, marginTop: '5%', color: 'white' }}>
          Price/Session  
        </Text>
        <Text style={{fontSize: 8, marginTop: '15%', color: 'white'}}>
          Price/4Session  
        </Text>
        <Text style={{fontSize: 8, marginTop: '15%', color: 'white'}}>
          Price/5Session  
        </Text>
        <Text style={{fontSize: 8, marginTop: '15%', color: 'white'}}>
          Duration 
        </Text> 
        <Button 
          color="green"
          font
          title="SUBMIT"
          onPress={() => Alert.alert('Simple Button pressed')}
        /> 
      </View>
      
      <View style={styles.menuPrice2}>
        <Text style={{fontSize: 8, marginTop: '20%', color: 'white' }}>
         8000  
        </Text>
        <Text style={{fontSize: 8, marginTop: '25%', color: 'white'}}>
          20000  
        </Text>
        <Text style={{fontSize: 8, marginTop: '23%', color: 'white'}}>
          25000  
        </Text>
        <Text style={{fontSize: 8, marginTop: '15%', color: 'white'}}>
          40 Minutes 
        </Text>  
      </View> */}
      
     </View>
    </View>

        );
    }
}



const styles = StyleSheet.create({
    title:{
      color: '#009900',
    },
    menuItem:{
      marginTop: '35%',
      marginLeft: '20%',
      
    },
    menuPrice:{
      position: 'absolute',
      marginTop: '86%',
      marginLeft: '33.33%',
  
    },
    menuItem2:{
      marginTop: '88%',
      marginLeft: '60%',
      position: 'absolute',
      
    },
    menuPrice2:{
      position: 'absolute',
      marginTop: '88%',
      marginLeft: '74%',
  
    },
    header: {
      width: '100%',
      height: '10%',
      backgroundColor: 'blue'
    },      
  });
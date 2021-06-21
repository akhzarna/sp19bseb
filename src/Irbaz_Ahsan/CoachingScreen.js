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
        <View style = {{flex : 1, flexDirection : 'column', backgroundColor : 'white'}}>
          <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {false}/>
          <ScrollView showsVerticalScrollIndicator = {false}>
            <View style={{marginVertical : 20, backgroundColor: 'lightgrey', width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf : 'center'}}>
              <Text style={styles.textTop}>Physical Coaching not available for now due to current pandemic. Thank you</Text>
            </View>

            <View style = {{flexDirection : 'row', width : "90%", marginVertical : 50, alignSelf : 'center'}}>
              <View style = {{flexDirection : 'column', width : "40%", justifyContent : 'center', alignItems : 'center'}}>
                <Text>Live Coaching</Text>

                <ImageBackground style = {{flex : 1, width : '100%', height : '100%'}} source={require('./assets/livecoaching.png')} resizeMode="contain">

                </ImageBackground>
              </View>
              <View style = {{marginLeft : '10%',flexDirection : 'column', width : "40%", justifyContent : 'center', alignItems : 'center'}}>
                <Text>Physical Coaching</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
        return(
           
    <View style={{flex:1,flexDirection: "column", backgroundColor:'white'}}>
    
    <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {false}/>
     
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
        marginTop:0,
        marginLeft:35,
        alignContent:'center',
        alignItems:'center'}}>
                Live Coaching
      </Text>

      <ImageBackground
                style={{
                  flex: 9,
                  }}
                source={require('./assets/livecoaching.png')} resizeMode="contain"
              
                >
                  <Text style = {{fontSize:11, marginLeft:24, marginTop:110, color:'white'}}> Price/session </Text>
                  <Text style = {{fontSize:8, marginLeft:96, marginTop:0, color:'white'}}> 5000 </Text>

                  <Text style = {{fontSize:11, marginLeft:24, marginTop:0, color:'white'}}> Price/4 session </Text>
                  <Text style = {{fontSize:8, marginLeft:96, marginTop:0, color:'white'}}> 20000 </Text>

                  <Text style = {{fontSize:11, marginLeft:24, marginTop:0, color:'white'}}> Price/5 session </Text>
                  <Text style = {{fontSize:8, marginLeft:96, marginTop:0, color:'white'}}> 25000 </Text>

                  <Text style = {{fontSize:11, marginLeft:24, marginTop:0, color:'white'}}> Duration </Text>
                  <Text style = {{fontSize:8, marginLeft:96, marginTop:0, color:'white'}}> 60 Minutes </Text>

                  <TouchableOpacity style = {{marginTop : 12, alignItems:'center'}} onPress = {() => this.submitLiveCoaching()}>
                  <Text style={{color:'green', fontWeight: 'bold'}}>
                    SUBMIT
                  </Text>
                  </TouchableOpacity>

      </ImageBackground>
      </View>

      <View style={{flex:1}}>
      
      <Text style={{
        flex:1,
        marginTop:0,
        marginLeft:25,
        alignContent:'center',
        alignItems:'center'}}>
                Physical Coaching
      </Text>

      <ImageBackground
                style={{
                  flex: 9,
                  }}
                source={require('./assets/physicalcoaching.png')} resizeMode="contain"
                >
            
                  <Text style = {{fontSize:11, marginLeft:24, marginTop:115, color:'white'}}> Price/session </Text>
                  <Text style = {{fontSize:8, marginLeft:96, marginTop:0, color:'white'}}> 5000 </Text>

                  <Text style = {{fontSize:11, marginLeft:24, marginTop:0, color:'white'}}> Price/4 session </Text>
                  <Text style = {{fontSize:8, marginLeft:96, marginTop:0, color:'white'}}> 20000 </Text>

                  <Text style = {{fontSize:11, marginLeft:24, marginTop:0, color:'white'}}> Price/5 session </Text>
                  <Text style = {{fontSize:8, marginLeft:96, marginTop:0, color:'white'}}> 25000 </Text>

                  <Text style = {{fontSize:11, marginLeft:24, marginTop:0, color:'white'}}> Duration </Text>
                  <Text style = {{fontSize:8, marginLeft:96, marginTop:0, color:'white'}}> 60 Minutes </Text>

                  <TouchableOpacity style = {{marginTop : 10, alignItems:'center'}} onPress = {() => this.submitPhysicalCoaching()}>
                  <Text style={{color:'green', fontWeight: 'bold'}}>
                    SUBMIT
                  </Text>
                  </TouchableOpacity>

                
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
  textTop: {
    fontSize: 16,
    textAlign : 'center'
  },  
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
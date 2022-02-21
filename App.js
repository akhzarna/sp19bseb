import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

var a = 10;

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state={

    }
  }

  // Write Functions Here
  render(){
    return (


      <View style={{flex:1, flexDirection:'column'}}>



        <View style={{flex:0.20}}>
          <Text> Login Screen </Text>

        </View>
        <View style={{flex:0.40}}>
          <TextInput style={{backgroundColor:'lightgrey', marginBottom:10}} />
          <TextInput style={{backgroundColor:'lightgrey'}} />

        </View>
        <View style={{flex:0.40}}>
          <Button
          title="Sin In"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />

          <Button
          title="Sin Up"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />

        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

});






// <View style={{backgroundColor:'grey', flex:1}}>
//
//   <View style={{backgroundColor:'red', flex:0.25}}>
//
//   <Text style={{color:'white'}}>
//                Usama Working SP19 BSE C First Commit Login
//   </Text>
//
//   </View>
//
//   <View style={{backgroundColor:'green', flex:0.35}}>
//
//
//   <TextInput style={{backgroundColor:'white'}}
//   />
//
//   </View>
//
//   <View style={{backgroundColor:'blue', flex:0.45}}>
//
//   <Button
//   title="Sin In"
//   color="#841584"
//   accessibilityLabel="Learn more about this purple button"
//   />
//
//   <Button
//   title="Sign Up"
//   color="#841584"
//   accessibilityLabel="Learn more about this purple button"
//   />
//
//   </View>
//
// </View>

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

    <View style={{backgroundColor:'grey', flex:1}}>

      <View style={{backgroundColor:'red', flex:0.25}}>

      <Text style={{color:'white'}}>
        Login
      </Text>

      </View>

      <View style={{backgroundColor:'green', flex:0.35}}>


      <TextInput style={{backgroundColor:'white'}}
      />

      </View>

      <View style={{backgroundColor:'blue', flex:0.45}}>


      <Button
      title="Sin In"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
      />

      <Button
      title="Sign Up"
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

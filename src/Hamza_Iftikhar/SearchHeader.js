import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  SectionList,
} from 'react-native';

class SearchHeader extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={{
        width:200,
        height:40,
        backgroundColor:'orange'
      }}>
      <Text>newText fmdsnaf ioda fjoida</Text>
      </View>
    )
  }

}


module.exports = SearchHeader;

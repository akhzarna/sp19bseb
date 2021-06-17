import React from "react";
import {CheckBox} from 'react-native-elements';

import {
    StyleSheet,
  } from 'react-native';

export default class MyCheckBox extends React.Component
{
    render()
    {
        return (
            <CheckBox containerStyle = {styles.checkBox} checked = {this.props.checked} title = {this.props.title} checkedColor = {this.props.themeColor} checkedIcon = 'square' fontFamily = 'sans-serif-thin' size = {20} onIconPress = {this.props.onIconPress}/>
        );
    }
}

const styles = StyleSheet.create({
    checkBox:
    {
        padding : 0,
        marginLeft : 0,
        marginBottom : 0,
        borderWidth : 0,
        fontWeight : 'normal'
    }
  });
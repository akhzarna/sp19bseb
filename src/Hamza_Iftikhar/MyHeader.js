import React from "react";
import {Appbar} from 'react-native-paper';

import {
    StyleSheet,
    Alert
  } from 'react-native';

export default class MyHeader extends React.Component
{
    render()
    {
        return (
            <Appbar.Header style = {{backgroundColor : this.props.themeColor, justifyContent : 'space-between'}}>
                <Appbar.Action
                    icon="menu"
                    onPress={() => Alert.alert("Menu Pressed")}/>
                <Appbar.Action
                    icon="dots-vertical"
                    onPress ={() => Alert.alert("Dots Pressed")}/>
            </Appbar.Header>
        );
    }
}
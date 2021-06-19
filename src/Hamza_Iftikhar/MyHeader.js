import React from "react";
import {Appbar} from 'react-native-paper';

import {
    Alert, View
  } from 'react-native';

export default class MyHeader extends React.Component
{
    renderHeader()
    {
        if(this.props.homeScreen === true)
        {
            return(
                <Appbar.Header style = {{backgroundColor : this.props.themeColor, justifyContent : 'space-between'}}>
                    <Appbar.Action
                        icon="menu"
                        onPress={() => this.props.navigation.toggleDrawer()}/>
                    <Appbar.Action
                        icon="dots-vertical"
                        onPress ={() => Alert.alert("Dots Pressed")}/>
                </Appbar.Header>
            );
        }
        else
        {
            return(
                <Appbar.Header style = {{backgroundColor : this.props.themeColor, justifyContent : 'space-between'}}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}/>
                </Appbar.Header>
            );
        }
    }

    render()
    {
        return (
            <View>
                {this.renderHeader()}
            </View>
        );
    }
}
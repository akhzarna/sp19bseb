import React, {Component} from 'react';
import { View, ScrollView, Text, BackHandler, Alert } from 'react-native';

import MyHeader from './MyHeader';

export default class ComingSoonScreen extends Component {

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
            },
            // { text: "YES", onPress: () => BackHandler.exitApp() }
            { text: "YES", onPress: () => this.props.navigation.pop() }
        ]);
        return true;
    };

    componentDidMount() {

        this.unsubscribeFocus  = this.props.navigation.addListener('focus', () => {
          this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
          );
         });
    
        this.unsubscribeBlur = this.props.navigation.addListener('blur', () => {
          BackHandler.removeEventListener("hardwareBackPress", this.backAction);
        });
      }
    
      componentWillUnmount() {
        this.unsubscribeFocus();
        this.unsubscribeBlur();
      }
    render()
    {
        return(
            <View>
                <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {true}/>
                
                <ScrollView style = {{backgroundColor : '#fff', height : '100%'}}>
                    <View style = {{flex : 1}}>
                        <Text style = {{alignSelf : 'center', marginVertical : '50%'}}>Coming Soon. Please use other screens for now.</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
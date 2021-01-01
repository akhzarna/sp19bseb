import React from "react";

import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';

export default class MyText extends React.Component
{
    render()
    {
        return (
            <TouchableOpacity style = {[styles.container, styles.boxWithShadow]} onPress = {() => this.props.navigation.navigate('ChaptersListComponent')}>
                <View style = {styles.innerContainer}>
                    <Image style={styles.image} source={this.props.item.url} />
                    <Text>
                        {this.props.item.title}
                    </Text>
                    <Text style = {[styles.text, {color : this.props.themeColor}]}>
                        ${this.props.item.price}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex : 0.5,
            flexDirection : 'row',
            height : 250,
            backgroundColor : "#fff",
            margin : 10,
            paddingBottom : 50,
            alignItems : 'center',
            justifyContent : 'center',

        },
        innerContainer:
        {
            flex : 1,
            flexDirection : 'column',
            justifyContent : 'center',
            alignItems : 'center'
        },
        boxWithShadow: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5
        },
        text:
        {
            marginHorizontal : 30,
            marginVertical : 10
        },
        image: {
            flex : 1,
            borderRadius: 4,
            margin : 10,
            resizeMode: 'center'
        }
    }
);

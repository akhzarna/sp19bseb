import React from 'react';
import {
    Text,
    FlatList,
    View,
    TouchableOpacity
} from 'react-native';

import { Divider } from 'react-native-paper';

import MyHeader from '../MyHeader.js'

export default class ProductsMenu extends React.Component
{   
    state = {
        searchQuery : ''
    }

    onChangeSearch = (query) =>
    {
        this.setState({searchQuery : query})
    }

    render()
    {
        const DATA = [
            {
              id: 1,
              title: 'Natural Herbs',
            },
            {
                id: 2,
              title: 'Snacks/Drinks',
            },
            {
                id: 3,
              title: 'Supplies',
            },
            {
                id: 4,
                title: 'Natural Herbs',
            },
            {
                id: 5,
                title: 'Snacks/Drinks',
            },
            {
                id: 6,
                title: 'Supplies',
            },
            {
                id: 7,
                title: 'Natural Herbs',
            },
            {
                id: 8,
                title: 'Snacks/Drinks',
            },
            {
                id: 9,
                title: 'Supplies',
            },
            {
                id: 10,
                title: 'Natural Herbs',
            }
          ];

        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity style = {{flexDirection : 'row', marginVertical : '5%'}} onPress = {() => this.props.navigation.navigate('Products-Screen')}>
                    <Text style = {{marginRight : '10%', textAlign : 'right', width : 30, fontSize : 18}}>{item.id}</Text>
                    <Text style = {{fontSize : 18}}>{item.title}</Text>
                </TouchableOpacity>
                <Divider style = {{height : 1, backgroundColor : this.props.route.params.themeColor, marginHorizontal : '5%'}}/>
            </View>
        );

        return(
            <View style = {{flex : 1}}>
                <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {false}/>

                <FlatList
                    style = {{margin : 0, backgroundColor : "#fff"}}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}
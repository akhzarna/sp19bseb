import React from 'react';
import {
    Text,
    FlatList,
    View,
} from 'react-native';

import { Searchbar } from 'react-native-paper';

import MyHeader from '../MyHeader.js'

import ProductBox from '../ProductBox.js'

export default class WishlistScreen extends React.Component
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
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_1.png')
            },
            {
              id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_2.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d72',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_3.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d73',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_4.png')
            },
            {
              id: 'bd7acbea-c1b1-66c2-aed5-3ad53abb28ba',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_5.png')
            },
            {
              id: '3ac68afc-c605-4863-a4f8-fbd91aa97f63',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_1.png')
            },
            {
              id: '58694a0f-3da1-476f-bd96-145571e29d72',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_2.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-645571e29d73',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_3.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-645571329d73',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_4.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-645573e29d73',
              title: 'Turpis et iaculis',
              price : '115.00',
              url : require('../Images/image_pro_5.png')
            }
          ];

        const renderItem = ({ item }) => (
            <ProductBox item={item} themeColor = {this.props.route.params.themeColor} />
        );

        return(
            <View>
                <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {true}/>

                <FlatList
                    style = {{margin : 10, backgroundColor : "#fff"}}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns = {2}
                    ListHeaderComponent = {<FlatListHeader themeColor = {this.props.route.params.themeColor} onChangeSearch = {this.onChangeSearch} searchQuery = {this.state.searchQuery}/>}
                />
            </View>
        );
    }
}

class FlatListHeader extends React.Component
{
    render()
    {
        return(
            <View>
                <Searchbar
                    placeholder = "Product Name"
                    iconColor = {this.props.themeColor}
                    style = {{marginHorizontal : 20, marginVertical : 10, padding : 1}}
                    onChangeText={this.props.onChangeSearch}
                    value={this.props.searchQuery}
                    />
                <Text style = {{marginHorizontal : 30, marginVertical : 10, color : this.props.themeColor, fontSize : 15}}>
                    Wishlist
                </Text>
            </View>
        );
    }
}
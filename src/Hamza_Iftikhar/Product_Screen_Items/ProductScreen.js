import React from 'react';
import {
    Text,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import { Searchbar } from 'react-native-paper';
import MyHeader from '../MyHeader.js'
// import ProductBox from '../ProductBox.js'
// Realtime Database
import database from '@react-native-firebase/database';
// Firestore Database
import firestore from '@react-native-firebase/firestore';

export default class ProductScreen extends React.Component
{
    state = {
        searchQuery : '',
        allproducts : [],
        dumpArray : []
    }

    onChangeSearch = (query) =>
    {
        this.setState({searchQuery : query})
    }

    componentDidMount() {

      database()
      .ref('/medicines/')
      .on('value', snapshot => {
        console.log('Akhzar Data is not responsive =', snapshot.val());
        this.setState({allproducts:snapshot.val()});
        this.setState({dumpArray:snapshot.val()});
      });

  // For not Live Update
  //     database()
  //     .ref('/books/')
  //     .once('value')
  //     .then(snapshot => {
  //       console.log('All Books are: ', snapshot.val());
  //       this.setState({allBooksData:snapshot.val()});
  //       this.setState({dumpArray:snapshot.val()});
  // });

  }

    render()
    {
        const DATA = [
            {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_1.png')
            },
            {
              id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_2.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d72',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_3.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d73',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_4.png')
            },
            {
              id: 'bd7acbea-c1b1-66c2-aed5-3ad53abb28ba',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_5.png')
            },
            {
              id: '3ac68afc-c605-4863-a4f8-fbd91aa97f63',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_1.png')
            },
            {
              id: '58694a0f-3da1-476f-bd96-145571e29d72',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_2.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-645571e29d73',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_3.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-645571329d73',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_4.png')
            },
            {
              id: '58694a0f-3da1-471f-bd96-645573e29d73',
              title: 'Turpis et iaculis',
              price : '115.00',
              name : 'Test1',
              url : require('../Images/image_pro_5.png')
            }
          ];

        const renderItem = ({ item }) => (
          <TouchableOpacity style = {[styles.container, styles.boxWithShadow]} onPress = {() => this.props.navigation.navigate('Product-Detail-Screen', {item : item, fromWishlist : this.props.fromWishlist})}>
              <View style = {styles.innerContainer}>
                  <Image
                  style={styles.image}
                  source={{ uri: item.url}}
                  />

                  <Text>
                      {item.title}
                  </Text>
                  <Text style = {[styles.text, {color : this.props.themeColor}]}>
                      ${item.price}
                  </Text>
              </View>
          </TouchableOpacity>
        );

        return(
            <View>
                <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {true}/>

                <FlatList
                    style = {{margin : 10, backgroundColor : "#fff"}}
                    data={this.state.allproducts}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
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
                    Product
                </Text>
            </View>
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
           width:'70%',
           height:'70%',
           borderRadius:10,
           resizeMode:'cover'
        }
    }
);

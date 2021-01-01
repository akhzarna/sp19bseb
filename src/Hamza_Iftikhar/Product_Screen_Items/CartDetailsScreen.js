import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import InputSpinner from "react-native-input-spinner";
import MyHeader from '../MyHeader';
import AnimatedLoader from "react-native-animated-loader";
import axios from 'axios';

export default class CartDetailsScreen extends React.Component
{
    constructor(props)
    {
        super(props);

        // var obtainedImages = [];
        // if(this.props.route.params.item.thumbnail != 0)
        // {
        //     obtainedImages.push(this.props.route.params.item.thumbnail);
        // }
        // if(this.props.route.params.item.thumbnail2 != 0)
        // {
        //     obtainedImages.push(this.props.route.params.item.thumbnail2);
        // }
        // if(this.props.route.params.item.thumbnail3 != 0)
        // {
        //     obtainedImages.push(this.props.route.params.item.thumbnail3);
        // }
        // if(this.props.route.params.item.thumbnail4 != 0)
        // {
        //     obtainedImages.push(this.props.route.params.item.thumbnail4);
        // }
        // if(obtainedImages.length === 0)
        // {
        //     obtainedImages.push(require('../Images/image_pro_5.png'));
        // }

        this.state =
        {
            // images : obtainedImages,
            selectedQuantity : 1,
            visible : false,
            dataFound : true,
            products: [
                {id:0, key:0, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78},
                {id:1, key:1, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78},
                {id:2, key:2, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78},
                {id:3, key:3, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78},
                {id:4, key:4, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78}
                ]
        };
    }

    fetchDataFromAPI()
    {
        console.log('Token is = ', this.props.route.params.token);
        // Alert.alert('Is Working ?');
        this.setState({dataFound : false});
        this.setState({visible:true});

        const headers = {
            'Authorization': 'Bearer ' + this.props.route.params.token,
            'content-type':'application/json'
        };

        axios.get('https://thefoodpharmacy.general.greengrapez.com/api/auth/get/all/cart/1', {headers}).
        then(response => {
            // this.setState({products:[
            //     {id:0, key:0, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78},
            //     {id:1, key:1, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78},
            //     // {id:2, key:2, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78},
            //     // {id:3, key:3, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78},
            //     // {id:4, key:4, products:'Dumbell', unitprice:115, size:'500ml', quantity:2, total:78}
            //     ]
            // });
            console.log('Response is = ', response.data);
            if(response.data["status"] === "okay"){
                console.log('Cart Detail is = ', response.data['response']['Products']);
                if(response.data['response']['message'] == 'successful')
                {
                    this.setState({products : response.data['response']['Products']});
                    this.setState({dataFound : true});
                    this.setState({visible:false});
                }
                else if(response.data['response']['message'] == 'unSuccessful')
                {
                    this.setState({dataFound : false});
                    this.setState({visible:false});
                }
            }else if(response.data["status"] === "error"){
                console.log('Error is =',response.data["response"]["message"]);
                this.setState({visible:false});
                this.setState({dataFound : false});
            }
        }).catch(error => {
            Alert.alert("Error", error.message);
            this.setState({visible:false});
            this.setState({dataFound : false});
        });
    }

    isProductOutOfStock()
    {
        return this.stockCount() <= 0;
    }

    stockCount()
    {
        return this.props.route.params.item.quantity_on_hand === null ? 0 : this.props.route.params.item.quantity_on_hand;
    }

    componentDidMount() {
        this.unsubscribeFocus  = this.props.navigation.addListener('focus', () => {
            this.fetchDataFromAPI();
        });
    }

    render()
    {
        const renderItem = ({ item }) => (
            <View style={{flex:1, borderColor:'grey', borderWidth:1}}>
                <TouchableOpacity style = {{flexDirection : 'row', flex: 1}} onPress = {() => this.props.navigation.navigate('Products-Menu-Sub-Category', {category : item.products})}>
                    <View style={{flex:3}}>
                    <Image style={{
                        borderRadius: 4,
                        margin : 12,
                        height : 125, width : 125,
                        }} source={{uri : "https://thefoodpharmacy.general.greengrapez.com/storage/images/619503c486de7bike2.jfif"}} resizeMethod = {'auto'} resizeMode = {'cover'}/>
                    </View>
                    <View style={{flex:3, margin:3}}>
                    <Text style = {{fontSize : 13, margin:5}}>Products                {item.products}</Text>
                    <Text style = {{fontSize : 13, margin:5}}>Unit Price               {item.unitprice}</Text>
                    <Text style = {{fontSize : 13, margin:5}}>Size                         {item.size}</Text>
                    <Text style = {{fontSize : 13, margin:5}}>Quantity                  {item.quantity}</Text>
                    <Text style = {{fontSize : 13, margin:5}}>Total                        {item.total}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Image style={{
                        borderRadius: 2,
                        margin:8,
                        marginLeft:30,
                        height : 20,
                        width : 20,
                        }} source={require('./image.jpeg')} resizeMethod = {'auto'} resizeMode = {'cover'}/>
                    </View>
                </TouchableOpacity>
            </View>
        );

        const footer = () => {
            return (
                <View style={{margin:15}}>
                    <TouchableOpacity style={{margin:5, flexDirection:'row',backgroundColor:'green', alignItems:'center',alignSelf:'flex-end', width:120, height:50}} onPress = {() => this.props.navigation.navigate('Products-Screen')}>
                        <Text style={{margin:10, fontSize:14, color:'white'}}>Continue Shop</Text>
                    </TouchableOpacity>
                    <Text style={{margin:5, fontWeight:'bold'}}>Sub Totals</Text>
                    <Text style={{margin:5, marginLeft:20}}>Totals                                                        $78.00</Text>
                    <Text style={{margin:5, marginLeft:20}}>Sub Totals                                                 $78.00</Text>
                    <TouchableOpacity style={{margin:5,backgroundColor:'green', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center',alignSelf:'flex-start', width:180, height:50}} onPress = {() => this.props.navigation.navigate('CheckAddressScreen')}>
                        <Text style={{margin:10,fontSize:14, color:'white'}}>Procedd to Checkout</Text>
                    </TouchableOpacity>
                </View>
            );
          };

        return(
            <SafeAreaView style = {styles.safeAreaView}>
                <View style = {styles.mainContainer}>
                    <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} token = {this.props.route.params.token} homeScreen = {true} />
                    <Text style={{color:'green', fontSize:30, fontWeight:'bold', margin:7}}>Cart:</Text>

                    {/* {this.state.dataFound ? ( */}

                    <FlatList
                    style = {{margin : 10, backgroundColor : "#fff"}}
                    data={this.state.products}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns = {1}
                    ListFooterComponent={footer}
                    // ListHeaderComponent = {<FlatListHeader themeColor = {this.props.route.params.themeColor} onChangeSearch = {this.onChangeSearch} searchQuery = {this.state.searchQuery}/>}
                    />

                    {/* ) : (
                    <View>
                        <Text style = {{fontWeight : 'bold', fontSize : 20, alignSelf : 'center', textAlign : 'center', marginTop : '50%'}}>No products found.</Text>
                    </View>
                    )} */}

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeAreaView :
    {
        backgroundColor : 'white',
        flex : 1
    },
    mainContainer :
    {
        flex : 1
    },
    contentContainer :
    {
        flex : 1,
        marginHorizontal : 30
    },
    detailText :
    {
        fontSize : 18,
        margin : 10
    },
    productDetailsView :
    {
        flexDirection : 'column',
        alignItems : 'center',
    },
    itemName :
    {
        fontWeight : 'bold',
        fontSize : 22,
        marginVertical : 10
    },
    imageSliderBox :
    {
        height : 250,
        width : 300,
    },
    orderView :
    {

    },
    vendorInfo :
    {
        fontSize : 13,
        marginTop : 15
    },
    price :
    {
        fontSize : 24,
        marginVertical : 5
    },
    quantityView :
    {
        flexDirection : 'column',
        //justifyContent : 'space-around',
        marginVertical : 20,
        marginHorizontal : 10
    },
    buttonsView :
    {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginVertical : 50,
        marginHorizontal : 10
    },
    button :
    {
        height : 40,
        width : 140,
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'center'
    },
    spinnerButton :
    {
        height : 30,
        alignItems : 'center'
    },
    buttonText :
    {
        fontSize : 16,
        color : 'white'
    },
    lottie:
    {
        height : 100,
        width : 100
    }
});

import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import InputSpinner from "react-native-input-spinner";

import MyHeader from '../MyHeader';
import AnimatedLoader from "react-native-animated-loader";
import axios from 'axios';

export default class ProductDetailsScreen extends React.Component
{
    constructor(props)
    {
        super(props);

        var obtainedImages = [];
        // obtainedImages.push(require('../Images/image_pro_5.png'));
        obtainedImages.push(this.props.route.params.item.url);

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
            images : obtainedImages,
            selectedQuantity : 1,
            visible : false
        };
    }

    isProductOutOfStock()
    {
        return this.stockCount() <= 0;
    }

    stockCount()
    {
        return this.props.route.params.item.quantity_on_hand === null ? 0 : this.props.route.params.item.quantity_on_hand;
    }

    addToCart(){
        this.setState({visible:true});
        this.props.navigation.navigate('CartDetailsScreen');

        // const data =
        // {
        //   'product_id':this.props.route.params.item.pk_id,
        //   'user_id':this.props.route.params.userId,
        //   'product_name':this.props.route.params.item.name,
        //   'quantity':this.state.selectedQuantity,
        //   'size':this.props.route.params.item.size,
        //   'price':this.props.route.params.item.price,
        //   'sub_category':this.props.route.params.item.sub_category,
        //   'image':this.props.route.params.item.thumbnail,
        // };
        //
        // const headers = {
        //     'Authorization': 'Bearer ' + this.props.route.params.token,
        //     'content-type':'application/json'
        // };
        //
        // axios.post('https://thefoodpharmacy.general.greengrapez.com/api/auth/add/to/cart', data, {headers}).
        // then(response => {
        //     this.setState({visible:false});
        //     console.log('Add To Cart is = ',response.data);
        //     if(response.data["status"] === "error")
        //     {
        //         Alert.alert("Error", response.data["response"]);
        //         this.props.navigation.navigate('CartDetailsScreen');
        //     }
        //
        //     if(response.data["status"] === "successful")
        //     {
        //       this.props.navigation.navigate('Wishlist');
        //     }
        //
        //     if(response.data["status"] === "UnSuccessful")
        //     {
        //         Alert.alert("Status", response.data["response"]);
        //         this.props.navigation.navigate('CartDetailsScreen');
        //     }
        // }).
        // catch(error => {
        //     Alert.alert("Error", error.message);
        //     this.setState({visible:false});
        // });
    }

    addToWishlist()
    {
        this.setState({visible:true});
        this.props.navigation.navigate('Wishlist');

        // const data =
        // {
        //   'product_id':this.props.route.params.item.pk_id,
        //   'user_id':this.props.route.params.userId,
        //   'product_name':this.props.route.params.item.name,
        //   'price':this.props.route.params.item.price,
        //   'image':this.props.route.params.item.thumbnail,
        // };
        //
        // const headers = {
        //     'Authorization': 'Bearer ' + this.props.route.params.token,
        //     'content-type':'application/json'
        // };
        //
        // axios.post('https://thefoodpharmacy.general.greengrapez.com/api/auth/add/to/wishlist', data, {headers}).
        // then(response => {
        //     this.setState({visible:false});
        //     if(response.data["status"] === "error")
        //     {
        //         Alert.alert("Error", response.data["response"]);
        //         this.props.navigation.navigate('Wishlist');
        //     }
        //
        //     if(response.data["status"] === "successful")
        //     {
        //       this.props.navigation.navigate('Wishlist');
        //     }
        //
        //     if(response.data["status"] === "UnSuccessful")
        //     {
        //         Alert.alert("Status", response.data["response"]);
        //     }
        // }).
        // catch(error => {
        //     Alert.alert("Error", error.message);
        //     this.setState({visible:false});
        // });
    }

    removeFromWishlist()
    {
        this.setState({visible:true});
        const data =
        {
          'product_id':this.props.route.params.item.pk_id,
          'user_id':this.props.route.params.userId,
          'product_name':this.props.route.params.item.name,
          'price':this.props.route.params.item.price,
          'image':this.props.route.params.item.thumbnail,
        };

        const headers = {
            'Authorization': 'Bearer ' + this.props.route.params.token,
            'content-type':'application/json'
        };

        axios.get('https://thefoodpharmacy.general.greengrapez.com/api/auth/remove/to/wishlist/'+ this.props.route.params.userId +'/' + this.props.route.params.item.pk_id, {headers}).
        then(response => {
            this.setState({visible:false});
            if(response.data["status"] === "error")
            {
                Alert.alert("Error", response.data["response"]);
            }

            if(response.data["status"] === "successful")
            {
              this.props.navigation.navigate('Wishlist');
            }

            if(response.data["status"] === "UnSuccessful")
            {
                Alert.alert("Status", response.data["response"]);
            }
        }).
        catch(error => {
            Alert.alert("Error", error.message);
            this.setState({visible:false});
        });
    }

    render()
    {
        return(
            <SafeAreaView style = {styles.safeAreaView}>
                <View style = {styles.mainContainer}>
                    <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} token = {this.props.route.params.token} homeScreen = {true}/>

                    <ScrollView showsVerticalScrollIndicator = {false}>
                        <Text style = {[styles.detailText, {color : this.props.route.params.themeColor}]}>Products Detail:</Text>
                        <View style = {styles.contentContainer}>
                            <View style = {styles.productDetailsView}>
                                <Text style = {[styles.itemName, {color : this.props.route.params.themeColor}]}>{this.props.route.params.item.name}</Text>
                                <View style = {styles.imageSliderBox}>
                                    <SliderBox images={this.state.images} sliderBoxHeight = {250} parentWidth = {300} dotColor = {this.props.route.params.themeColor} imageLoadingColor = {this.props.route.params.themeColor} resizeMethod = {'auto'}/>
                                </View>
                            </View>
                            <View style = {styles.orderView}>
                                <TouchableOpacity onPress = {() => Alert.alert('Available soon')}>
                                    <Text style = {[styles.vendorInfo, {color : this.props.route.params.themeColor}]}>Vendor Info</Text>
                                </TouchableOpacity>
                                <Text style = {styles.price}>${this.props.route.params.item.price}</Text>
                            </View>
                            <View style = {styles.quantityView}>
                                <View style = {{flexDirection : 'row', marginVertical : 5}}>
                                    <Text style = {{alignSelf : 'center', fontSize : 18, marginRight : 10}}>Quantity :</Text>
                                    <InputSpinner
                                        disabled = {this.isProductOutOfStock()}
                                        max={this.stockCount() > 10 ? 10 : this.stockCount()}
                                        min={1}
                                        longStep = {this.stockCount() > 10 ? 10 : this.stockCount()}
                                        colorMax={'red'}
                                        colorMin={this.isProductOutOfStock() ? 'lightgrey' : this.props.route.params.themeColor}
                                        color = {this.isProductOutOfStock() ? 'lightgrey' : this.props.route.params.themeColor}
                                        height = {35}
                                        fontSize = {14}
                                        value = {this.state.selectedQuantity}
                                        onChange={(num) => {
                                            this.setState({selectedQuantity : num});
                                        }}
                                    />
                                </View>
                                {this.isProductOutOfStock() ? (
                                    <Text style = {{color : 'red', marginVertical : 5}}>Out of Stock</Text>
                                ) : null}
                                <View style = {{flexDirection : 'row', marginVertical : 5}}>
                                    <Text style = {{alignSelf : 'center', fontSize : 18, marginRight : 10}}>Size : {this.props.route.params.item.size}</Text>
                                </View>
                            </View>
                            <View style = {styles.buttonsView}>
                                <TouchableOpacity style = {[styles.button, {backgroundColor : this.isProductOutOfStock() ? 'lightgrey' : this.props.route.params.themeColor}]}
                                onPress = {() => this.addToCart()} disabled = {this.isProductOutOfStock()}>
                                    <Text style = {styles.buttonText}>Add to Cart</Text>
                                </TouchableOpacity>
                                {!this.props.route.params.fromWishlist ? (
                                    <TouchableOpacity style = {[styles.button, {backgroundColor : this.props.route.params.themeColor}]} onPress = {() => this.addToWishlist()}>
                                        <Text style = {styles.buttonText}>Add to Wishlist</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style = {[styles.button, {backgroundColor : this.props.route.params.themeColor}]} onPress = {() => this.removeFromWishlist()}>
                                        <Text style = {styles.buttonText}>Remove</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                    {this.state.visible?(
                        <AnimatedLoader
                        visible={this.state.visible}
                        overlayColor="rgba(255,255,255,0.75)"
                        source={require("../loader.json")}
                        animationStyle={styles.lottie}
                        speed={1}
                        >
                        <Text> Processing...</Text>
                        </AnimatedLoader>
                    ):(null)}
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

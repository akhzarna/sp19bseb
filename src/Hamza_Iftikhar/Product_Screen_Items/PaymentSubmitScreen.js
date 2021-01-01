import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import MyHeader from '../MyHeader';

export default class PaymentSubmitScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = { };
    }

    componentDidMount() {
    }

    render(){

        return(
            <SafeAreaView style = {styles.safeAreaView}>
                <View style = {styles.mainContainer}>
                <Text style={{color:'green', fontSize:60, fontWeight:'bold', alignSelf:'center', marginBottom:30, marginTop:10}}>
                    Thank You
                </Text>   

                <Text style={{color:'grey', fontSize:16, fontWeight:'bold', alignSelf:'center', marginBottom:5}}>
                    Thank You for buy a product from supply bridges 
                </Text> 

                <Text style={{color:'grey', fontSize:16, fontWeight:'bold', alignSelf:'center', marginBottom:40}}>
                    Your order ID is       t654yt
                </Text>   

                <TouchableOpacity style={{backgroundColor:'green', alignSelf:'center', alignItems:'center',alignContent:'center', width:220, height:70}} onPress = {() => this.props.navigation.navigate('Products-Screen')}>    
                    <Text style={{margin:20, fontSize:18, color:'white'}}>Continue Shopping</Text>               
                </TouchableOpacity>  
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
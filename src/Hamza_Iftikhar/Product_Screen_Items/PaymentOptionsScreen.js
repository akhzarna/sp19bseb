import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import MyHeader from '../MyHeader';
import { Linking } from 'react-native';

export default class PaymentOptionsScreen extends React.Component{
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
            <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} token = {this.props.route.params.token} homeScreen = {true} />
                <View style={{margin:10, flex:2}}>
                <Text style={{color:'green', fontSize:30, fontWeight:'bold', margin:7}}>Payments:</Text>
                </View>
                <View style={{flexDirection:'row', flex:3}}>
                    
                    <Image style={{
                        borderRadius: 4,
                        margin : 12,
                        height : 15, width : 15,
                        }} source={{uri : "https://thefoodpharmacy.general.greengrapez.com/storage/images/619503c486de7bike2.jfif"}} resizeMethod = {'auto'} resizeMode = {'cover'}/>
                    
                    <Text style={{color: 'grey', margin:12}}
                        onPress={() => Linking.openURL('http://google.com')}>
                        Pay With Cash
                    </Text>
                    
                    </View>
                    
                    

                    <View style={{flexDirection:'row', flex:8}}>
                    <TouchableOpacity style={{backgroundColor:'green', marginLeft:20, alignItems:'center', alignContent:'center', width:120, height:50}} onPress = {() => this.props.navigation.navigate('PaymentSubmitScreen')}>    
                        <Text style={{margin:15, fontSize:14, color:'white'}}>Submit</Text>               
                    </TouchableOpacity>            
                    <Text style={{color:'grey', fontSize:14, alignItems:'center', alignContent:'center', fontWeight:'bold', margin:15}}>Order Confirm</Text>
                </View>
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
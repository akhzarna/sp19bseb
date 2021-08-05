import React, {Component} from 'react';
import { View, ScrollView, Text, BackHandler, Alert, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome'
import { Appbar, Divider, Avatar, Title } from 'react-native-paper';

const themeColor = '#1f8e46';

function DrawerHeader(props){
    return(
        <Appbar.Header style = {{backgroundColor : themeColor, justifyContent : 'flex-start'}}>
            <Appbar.Action
                icon="menu"
                onPress={() => props.navigation.toggleDrawer()}/>
            <Avatar.Image source = {require('../Muhammad_Hamza/Icons/logo.png')} size = {30}/>
            <Title style = {{fontSize : 20, fontWeight : 'bold', marginLeft : '5%', color : 'white'}}>مطب سلیمانی</Title>
        </Appbar.Header>
    );
}

export default function CustomDrawerContent(props) {
    return (
       
       <DrawerContentScrollView {...props}>
           
            {DrawerHeader(props)}

            <DrawerItem label =  {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent : 'space-between'}}>
                    
                    <Text style = {{fontSize : 14}}>ڈیش بورڈ</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : 0}}
                    />
                </View>

            )} onPress = {() => props.navigation.navigate('Home')} 
                
            icon = {({ focused, size }) => (
                    
                    // <Icon
                    // name="circle"
                    // size={size/3}
                    // color={themeColor}
                    // />

                    <Image
                    style={{width:30, height:30}}
                    source={require('../Muhammad_Hamza/Icons/ExpandMenu_1.png')}
                    />


                    )}
            />

            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style = {{fontSize : 14}}>طبی کتب</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : 0}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('Products-Menu')} 
                icon = {({ focused, size }) => (
                    // <Icon
                    //     name="circle"
                    //     size={size/3}
                    //     color={themeColor}
                    // />
                    <Image
                    style={{width:30, height:30}}
                    source={require('../Muhammad_Hamza/Icons/ExpandMenu_2.png')}
                    />
                    )}
            />

            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style = {{fontSize : 14}}>نسخہ جات</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : -3}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('Coaching')} 
                icon = {({ focused, size }) => (
                    // <Icon
                    //     name="circle"
                    //     size={size/3}
                    //     color={themeColor}
                    // />
                    <Image
                    style={{width:30, height:30}}
                    source={require('../Muhammad_Hamza/Icons/ExpandMenu_6.png')}
                    />
                    )}
            />

            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style = {{fontSize : 14}}>بک مارکس</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : -3}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('Recommendation')} 
                icon = {({ focused, size }) => (
                    // <Icon
                    //     name="circle"
                    //     size={size/3}
                    //     color={themeColor}
                    // />
                    <Image
                    style={{width:30, height:30}}
                    source={require('../Muhammad_Hamza/Icons/ExpandMenu_3.png')}
                    />
                    )}
            />

            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent:'space-between'}}>
                    <Text style = {{fontSize : 14}}>یونانی ادویہ</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : -3}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('Sale')} 
                icon = {({ focused, size }) => (
                    // <Icon
                    //     name="circle"
                    //     size={size/3}
                    //     color={themeColor}
                    // />
                    <Image
                    style={{width:30, height:30}}
                    source={require('../Muhammad_Hamza/Icons/ExpandMenu_9.png')}
                    />
                    )}
            />

            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent:'space-between'}}>
                    <Text style = {{fontSize : 14}}>ادارہ سلیمانی منزل بہ منزل</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : -3}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('Orders')} 
                icon = {({ focused, size }) => (
                    // <Icon
                    //     name="circle"
                    //     size={size/3}
                    //     color={themeColor}
                    // />
                    <Image
                    style={{width:30, height:30}}
                    source={require('../Muhammad_Hamza/Icons/ExpandMenu_4.png')}
                    />
                    )}
            />

            {/* <Divider style = {{height : 2, marginLeft : '6%', marginRight : '30%', backgroundColor : themeColor}}/> */}

            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent:'space-between'}}>
                    <Text style = {{fontSize : 14}}>مضامین</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : -3}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('FAQ')} 
                icon = {({ focused, size }) => (
                    // <Icon
                    //     name="circle"
                    //     size={size/3}
                    //     color={themeColor}
                    // />
                    <Image
                    style={{width:30, height:30}}
                    source={require('../Muhammad_Hamza/Icons/ExpandMenu_7.png')}
                    />
                    )}
            />
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent:'space-between'}}>
                    <Text style = {{fontSize : 14}}>برائے رابطہ</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : -3}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('Blog')} 
                icon = {({ focused, size }) => (
                    // <Icon
                    //     name="circle"
                    //     size={size/3}
                    //     color={themeColor}
                    // />
                    <Image
                    style={{width:30, height:30}}
                    source={require('../Muhammad_Hamza/Icons/ExpandMenu_14.png')}
                    />
                    )}
            />
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent:'space-between'}}>
                    <Text style = {{fontSize : 14}}>برائے فورم</Text>
                     <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : -3}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('Contact')} 
                icon = {({ focused, size }) => (
                    // <Icon
                    //     name="circle"
                    //     size={size/3}
                    //     color={themeColor}
                    // />
                    <Image
                    style={{width:30, height:30}}
                    source={require('../Muhammad_Hamza/Icons/ExpandMenu_10.png')}
                    />
                    )}
            />
                    
        </DrawerContentScrollView>
    );
}
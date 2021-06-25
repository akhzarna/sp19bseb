import React, {Component} from 'react';
import { View, ScrollView, Text, BackHandler, Alert, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome'
import { Appbar, Divider, Avatar, Title } from 'react-native-paper';

const themeColor = '#1f8e46';

function DrawerHeader(props)
{
    return(
        <Appbar.Header style = {{backgroundColor : themeColor, justifyContent : 'flex-start'}}>
            <Appbar.Action
                icon="menu"
                onPress={() => props.navigation.toggleDrawer()}/>
            <Avatar.Image source = {require('../Muhammad_Hamza/img/cal.jpg')} size = {30}/>
            <Title style = {{fontSize : 15, fontWeight : 'bold', marginLeft : '5%', color : 'white'}}>FAIZAN RASOOL</Title>
        </Appbar.Header>
    );
}

export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            {DrawerHeader(props)}
            <DrawerItem label =  {() => (
                <View style = {{flex : 1, flexDirection : 'row'}}>
                    <Text style = {{fontSize : 10}}>HOME</Text>
                </View>
            )} onPress = {() => props.navigation.navigate('Home')} 
                icon = {({ focused, size }) => (
                    <Icon
                    name="circle"
                    size={size/3}
                    color={themeColor}
                    />)}
            />
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style = {{fontSize : 11}}>PRODUCTS</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : -3}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('Products-Menu')} 
                icon = {({ focused, size }) => (
                    <Icon
                        name="circle"
                        size={size/3}
                        color={themeColor}
                    />)}
            />
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style = {{fontSize : 11}}>COACHING</Text>
                </View>
            )} onPress = {() => props.navigation.navigate('Coaching')} 
                icon = {({ focused, size }) => (
                    <Icon
                        name="circle"
                        size={size/3}
                        color={themeColor}
                    />)}
            />
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style = {{fontSize : 11}}>TFP RECOMMENDATION</Text>
                    <Icon
                        name="caret-right"
                        size={20}
                        color={themeColor}
                        style={{marginTop : -3}}
                    />
                </View>
            )} onPress = {() => props.navigation.navigate('Recommendation')} 
                icon = {({ focused, size }) => (
                    <Icon
                        name="circle"
                        size={size/3}
                        color={themeColor}
                    />)}
            />
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row'}}>
                    <Text style = {{fontSize : 11}}>SALE</Text>
                </View>
            )} onPress = {() => props.navigation.navigate('Sale')} 
                icon = {({ focused, size }) => (
                    <Icon
                        name="circle"
                        size={size/3}
                        color={themeColor}
                    />)}
            />
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row'}}>
                    <Text style = {{fontSize : 11}}>ORDERS</Text>
                </View>
            )} onPress = {() => props.navigation.navigate('Orders')} 
                icon = {({ focused, size }) => (
                    <Icon
                        name="circle"
                        size={size/3}
                        color={themeColor}
                    />)}
            />

            <Divider style = {{height : 2, marginLeft : '6%', marginRight : '30%', backgroundColor : themeColor}}/>

            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row'}}>
                    <Text style = {{fontSize : 11}}>FAQ</Text>
                </View>
            )} onPress = {() => props.navigation.navigate('FAQ')} 
                icon = {({ focused, size }) => (
                    <Icon
                        name="circle"
                        size={size/3}
                        color={themeColor}
                    />)}
            />
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row'}}>
                    <Text style = {{fontSize : 11}}>BLOG</Text>
                </View>
            )} onPress = {() => props.navigation.navigate('Blog')} 
                icon = {({ focused, size }) => (
                    <Icon
                        name="circle"
                        size={size/3}
                        color={themeColor}
                    />)}
            />
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row'}}>
                    <Text style = {{fontSize : 11}}>CONTACT US</Text>
                </View>
            )} onPress = {() => props.navigation.navigate('Contact')} 
                icon = {({ focused, size }) => (
                    <Icon
                        name="circle"
                        size={size/3}
                        color={themeColor}
                    />)}
            />
            
            <Divider style = {{height : 2, marginLeft : '6%', marginRight : '50%', backgroundColor : themeColor}}/>
            
            <DrawerItem label = {() => (
                <View style = {{flex : 1, flexDirection : 'row'}}>
                    <Text style = {{fontSize : 11}}>ADDRESS & DETAILS</Text>
                </View>
            )} onPress = {() => props.navigation.navigate('Address')} 
                icon = {({ focused, size }) => (
                    <Icon
                        name="circle"
                        size={size/3}
                        color={themeColor}
                    />)}
            />
        </DrawerContentScrollView>
    );
}
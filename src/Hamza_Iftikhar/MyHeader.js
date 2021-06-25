import React from "react";
import { Appbar, Menu, Divider } from 'react-native-paper';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {
    Dimensions, View, Text, TouchableOpacity
} from 'react-native';

export default class MyHeader extends React.Component
{
    state = {
        menuVisible : false,
        profileMenuVisible : false,
        orderMenuVisible : false
    }

    openMenu = () => this.setState({menuVisible : true, profileMenuVisible : false, orderMenuVisible : false});

    openOrderMenu = () => this.setState({menuVisible : false, profileMenuVisible : false, orderMenuVisible : true});

    openProfileMenu = () => this.setState({menuVisible : false, profileMenuVisible : true, orderMenuVisible : false});

    closeMenu = () => this.setState({menuVisible : false, profileMenuVisible : false, orderMenuVisible : false});

    renderVerticalDotsMenu()
    {
        return (
            <View>
                <Menu visible={this.state.menuVisible} onDismiss={this.closeMenu} anchor={{x : Dimensions.get('window').width - 30, y : 30}}>
                    <TouchableOpacity style = {{padding : 10, flexDirection : 'row', justifyContent : 'space-between'}}>
                        <View style = {{flexDirection :'row'}}>
                            <FontAwesomeIcon style = {{marginTop : 1}} name="heart" size={20} color = {this.props.themeColor}/>
                            <Text style = {{marginHorizontal : 10, fontSize : 16}}>View Wishlist</Text>
                        </View>
                    </TouchableOpacity>

                    <Divider style = {{height : 2, marginHorizontal : '6%', backgroundColor : this.props.themeColor}}/>
                    
                    <TouchableOpacity style = {{padding : 10, flexDirection : 'row', justifyContent : 'space-between'}} onPress = {() => this.openProfileMenu()}>
                        <View style = {{flexDirection :'row'}}>
                            <FontAwesomeIcon style = {{marginTop : 1}} name="user" size={20} color = {this.props.themeColor}/>
                            <Text style = {{marginHorizontal : 10, fontSize : 16}}>Edit Profile</Text>
                        </View>
                        <FontAwesomeIcon style = {{marginTop : 1}} name="caret-right" size={20} color = {this.props.themeColor}/>
                    </TouchableOpacity>
                    
                    <Divider style = {{height : 2, marginHorizontal : '6%', backgroundColor : this.props.themeColor}}/>
                    
                    <TouchableOpacity style = {{padding : 10, flexDirection : 'row', justifyContent : 'space-between'}} onPress = {() => this.openOrderMenu()}>
                        <View style = {{flexDirection :'row'}}>
                            <FontAwesomeIcon style = {{marginTop : 1}} name="cart-arrow-down" size={20} color = {this.props.themeColor}/>
                            <Text style = {{marginHorizontal : 10, fontSize : 16}}>Orders</Text>
                        </View>
                        <FontAwesomeIcon style = {{marginTop : 1}} name="caret-right" size={20} color = {this.props.themeColor}/>
                    </TouchableOpacity>
                    
                    <Divider style = {{height : 2, marginHorizontal : '6%', backgroundColor : this.props.themeColor}}/>
                    
                    <TouchableOpacity style = {{padding : 10, flexDirection : 'row', justifyContent : 'space-between'}}>
                        <View style = {{flexDirection :'row'}}>
                            <MaterialIcon style = {{marginTop : 1}} name="logout" size={20} color = {this.props.themeColor}/>
                            <Text style = {{marginHorizontal : 10, fontSize : 16}}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </Menu>

                <Menu visible={this.state.profileMenuVisible} onDismiss={this.closeMenu} anchor={{x : Dimensions.get('window').width - 30, y : 30}}>
                    <TouchableOpacity style = {{padding : 10, flexDirection : 'row', justifyContent : 'space-between'}}>
                        <View style = {{flexDirection :'row'}}>
                            <FontAwesomeIcon style = {{marginTop : 1}} name="user" size={20} color = {this.props.themeColor}/>
                            <Text style = {{marginHorizontal : 10, fontSize : 16}}>View Profile</Text>
                        </View>
                    </TouchableOpacity>

                    <Divider style = {{height : 2, marginHorizontal : '6%', backgroundColor : this.props.themeColor}}/>
                    
                    <TouchableOpacity style = {{padding : 10, flexDirection : 'row', justifyContent : 'space-between'}}>
                        <View style = {{flexDirection :'row'}}>
                            <FontAwesomeIcon style = {{marginTop : 1}} name="user" size={20} color = {this.props.themeColor}/>
                            <Text style = {{marginHorizontal : 10, fontSize : 16}}>Edit Profile</Text>
                        </View>
                    </TouchableOpacity>
                </Menu>

                <Menu visible={this.state.orderMenuVisible} onDismiss={this.closeMenu} anchor={{x : Dimensions.get('window').width - 30, y : 30}}>
                    <TouchableOpacity style = {{padding : 10, flexDirection : 'row', justifyContent : 'space-between'}}>
                        <View style = {{flexDirection :'row'}}>
                            <FontAwesomeIcon style = {{marginTop : 1}} name="cart-arrow-down" size={20} color = {this.props.themeColor}/>
                            <Text style = {{marginHorizontal : 10, fontSize : 16}}>Order History</Text>
                        </View>
                    </TouchableOpacity>

                    <Divider style = {{height : 2, marginHorizontal : '6%', backgroundColor : this.props.themeColor}}/>
                    
                    <TouchableOpacity style = {{padding : 10, flexDirection : 'row', justifyContent : 'space-between'}}>
                        <View style = {{flexDirection :'row'}}>
                            <FontAwesomeIcon style = {{marginTop : 1}} name="cart-arrow-down" size={20} color = {this.props.themeColor}/>
                            <Text style = {{marginHorizontal : 10, fontSize : 16}}>Order Tracking</Text>
                        </View>
                    </TouchableOpacity>
                </Menu>
            </View>
        );
    }

    renderHeader()
    {
        if(this.props.homeScreen === true)
        {
            return(
                <Appbar.Header style = {{backgroundColor : this.props.themeColor, justifyContent : 'space-between'}}>
                    <Appbar.Action
                        icon="menu"
                        onPress={() => this.props.navigation.toggleDrawer()}/>
                    <Appbar.Action
                        icon="dots-vertical"
                        onPress ={this.openMenu}/>
                </Appbar.Header>
            );
        }
        else
        {
            return(
                <Appbar.Header style = {{backgroundColor : this.props.themeColor, justifyContent : 'space-between'}}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}/>
                </Appbar.Header>
            );
        }
    }

    render()
    {
        return (
            <View>
                {this.renderHeader()}
                {this.renderVerticalDotsMenu()}
            </View>
        );
    }
}
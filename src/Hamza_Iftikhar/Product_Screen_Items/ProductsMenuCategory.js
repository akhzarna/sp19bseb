import React from 'react';
import {
    Text,
    FlatList,
    View,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';

import { Divider } from 'react-native-paper';

import AnimatedLoader from "react-native-animated-loader";

import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'

import MyHeader from '../MyHeader.js'

export default class ProductsMenuCategory extends React.Component
{   
    constructor(props)
    {
        super(props);

        this.state = {
            visible : false,
            dataFound : false,
            categories : []
        };
    }

    fetchDataFromAPI()
    {
        this.setState({dataFound : false});
        this.setState({visible:true});

        const headers = { 
            'Authorization': 'Bearer ' + this.props.route.params.token,
            'content-type':'application/json'
        };

        axios.get('https://thefoodpharmacy.general.greengrapez.com/api/auth/category/', {headers}).
        then(response => {
            if(response.data["status"] === "okay"){
                if(response.data['response']['message'] == 'successful')
                {
                    this.setState({categories : response.data['response']['Category']});
                    this.setState({dataFound : true});
                }
                else if(response.data['response']['message'] == 'unSuccessful')
                {
                    this.setState({dataFound : false});
                }
                
                this.setState({visible:false});
            }else if(response.data["status"] === "error"){
                console.log('Error is =',response.data["response"]["message"]);
                this.setState({visible:false});
                this.setState({dataFound : false});
            }
        }).
        catch(error => {
            Alert.alert("Error", error.message);
            this.setState({visible:false});
            this.setState({dataFound : false});
        });
    }

    componentDidMount() {
        this.unsubscribeFocus  = this.props.navigation.addListener('focus', () => {
            this.fetchDataFromAPI();
        });
    }
    
    componentWillUnmount() {
        this.unsubscribeFocus();
    }

    render()
    {
        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity style = {{flexDirection : 'row', marginVertical : '5%'}} onPress = {() => this.props.navigation.navigate('Products-Menu-Sub-Category', {category : item.main_category})}>
                    <Icon style = {{marginHorizontal : '5%',marginTop : 5}} name="circle" size={14} color={this.props.route.params.themeColor} />
                    <Text style = {{fontSize : 18}}>{item.main_category}</Text>
                </TouchableOpacity>
                <Divider style = {{height : 1, backgroundColor : this.props.route.params.themeColor, marginHorizontal : '5%'}}/>
            </View>
        );

        return(
            <View style = {{flex : 1}}>
                <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} token = {this.props.route.params.token} homeScreen = {false}/>

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
                    ):(null)
                }

                {this.state.dataFound ? (
                    <FlatList
                        style = {{margin : 0, backgroundColor : "#fff"}}
                        data={this.state.categories}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <View>
                        <Text style = {{fontWeight : 'bold', fontSize : 20, alignSelf : 'center', textAlign : 'center', marginTop : '50%'}}>No categories found.</Text>
                    </View>
                )}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    },
});
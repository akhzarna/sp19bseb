import * as React from 'react';
import { View, TouchableOpacity, Image, Text, Alert, FlatList, ScrollView, StyleSheet, SectionList, PermissionsAndroid } from 'react-native';
import MyHeader from '../Hamza_Iftikhar/MyHeader.js';

import axios from 'axios';

import RNFetchBlob from 'rn-fetch-blob';

import AnimatedLoader from "react-native-animated-loader";
import { Divider } from 'react-native-paper';

export default class DietPlanScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  DATA = [];

  checkPermissionAndDownload()
  {
    console.log("Getting Permission");
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
    if (Platform.OS === 'ios') {
      this.downloadPDF();
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title:'storage title',
            message:'storage_permission',
          },
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            console.log('Storage Permission Granted.');
            this.downloadPDF();
          } else {
            //If permission denied then show alert 'Storage Permission  Not Granted'
           Alert.alert('storage_permission');
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log('error', err);
      }
    }
  }


  async downloadPDF()
  {
    const { config, fs } = RNFetchBlob;
    let DocumentDir = fs.dirs.DownloadDir;
    if (Platform.OS === 'ios') {
      DocumentDir = fs.dirs.DocumentDir;
    }
    let date = new Date();
    let docName = 'Diet_Plan_Download' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf';
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        title: docName,
        mime: 'application/pdf',
        path:
          DocumentDir +
          '/' + docName,
        description: 'Diet Plan downloading',
      },
    };

    config(options)
      .fetch('GET', 'https://thefoodpharmacy.general.greengrapez.com/api/auth/diet/pdf/'+ this.props.route.params.userId, {'Authorization': 'Bearer ' + this.props.route.params.token})
      .then((res) => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Report Downloaded Successfully.');
      });
  }

  fetchDataFromAPI()
  {
    this.setState({visible:true});

    const headers = { 
        'Authorization': 'Bearer ' + this.props.route.params.token,
        'content-type':'application/json'
    };

    axios.get('https://thefoodpharmacy.general.greengrapez.com/api/auth/diet/' + this.props.route.params.userId , {headers}).
    then(response => {
      if(response.data["status"] === "okay")
      {
        var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.DATA = [];
        var arrayResponse, diet, obj;

        for(let weekday of weekDays)
        {
          arrayResponse = response.data['response'][weekday];

          diet = 
          {
            breakfast : {
              array : arrayResponse['breakfast']
            },
            lunch : {
              array : arrayResponse['lunch']
            },
            snack : {
              array : arrayResponse['snacks']
            },
            dinner : {
              array : arrayResponse['dinner']
            }
          };
  
          obj = {
            key : 0,
            title : weekday,
            data : [
              {
                key : 0,
                title : 'Breakfast',
                dataArray : diet.breakfast.array,
                // item : diet.breakfast.array[0].item,
                // reciepe : diet.breakfast.array[0].reciepe,
                // grocery : diet.breakfast.array[0].grocery
              },
              {
                key : 1,
                title : 'Lunch',
                dataArray : diet.lunch.array,
                // item : diet.lunch.array[0].item,
                // reciepe : diet.lunch.array[0].reciepe,
                // grocery : diet.lunch.array[0].grocery
              },
              {
                key : 2,
                title : 'Snacks',
                dataArray : diet.snack.array,
                // item : diet.snack.array[0].item,
                // reciepe : diet.snack.array[0].reciepe,
                // grocery : diet.snack.array[0].grocery
              },
              {
                key : 3,
                title : 'Dinner',
                dataArray : diet.dinner.array,
                // item : diet.dinner.array[0].item,
                // reciepe : diet.dinner.array[0].reciepe,
                // grocery : diet.dinner.array[0].grocery
              }
            ]
          }
          this.DATA.push(obj);
        }

        // Alert.alert("Submission Status", "Data submitted successfully", [{text : "Ok", onPress : () => this.props.navigation.goBack(), style : 'default'}]);
        this.setState({visible:false});
      }else if(response.data["status"] === "error"){
        console.log('Error is =',response.data["response"]["message"]);
        // Alert.alert("Note", response.data["response"]["message"], [{text : "Ok", onPress : () => this.props.navigation.goBack(), style : 'default'}]);
        this.setState({visible:false});
      }
    }).
    catch(error => {
      Alert.alert("Error", error.message);
      this.setState({visible:false});
    });
  }

  rowSelected(item, section){
    
  }

  componentDidMount() {
    this.unsubscribe  = this.props.navigation.addListener('focus', () => {
      this.fetchDataFromAPI();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor:'white'}}>
        {this.state.visible?(
              <AnimatedLoader
                visible={this.state.visible}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("./loader.json")}
                animationStyle={styles.lottie}
                speed={1}
              >
                <Text> Processing...</Text>
              </AnimatedLoader>            
            ):(null)
          }
            
        <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {false}/>
        
        {this.DATA.length == 0 ? (
          <View>
            <Text style = {{fontWeight : 'bold', fontSize : 20, alignSelf : 'center', textAlign : 'center', marginTop : '50%'}}>No Diet Plan Assigned Yet. Please wait for approval.</Text>
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor:'white'}}>
              <View style={{flexDirection:'row', flex:2, justifyContent : 'center', alignItems : 'center'}}>
                <View style={{flex:1, justifyContent: 'center'}}>
                  <Text style={{
                    fontSize: 20,
                    marginLeft:15,
                    }}>Download From Here
                  </Text>
                </View>

                  <TouchableOpacity onPress = {() => this.checkPermissionAndDownload()} style={{flex:1, alignItems:'flex-end', justifyContent: 'center'}}>
                    <Image
                      style={{
                        width: 130,
                        height: 90,
                      }}
                      source={require('./img/1.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
              </View>

            <View style={{flex:4}}>
              <View style={{flex:1}}>
                <Text style={{
                  fontSize: 20,
                  marginLeft:15,
                  color:'green',
                }}>View Diet Plan:</Text>
              </View>
              
              <View style={{flex:3}}>
                <Text style={{
                  fontSize: 16,
                  marginLeft:15,
                  color:'black',
                }}>Meal Plan</Text>

                <Text style={{
                  fontSize: 13,
                  marginLeft:15,
                  color:'black',
                }}>22/6/2021</Text>

                <Text style={{
                  fontSize: 12,
                  marginLeft:15,
                  color:'black',
                }}>A healthy eating plan: Emphasizes vegetables, fruits, whole grains, and fat-free or low-fat dairy oroducts. Includes lean meats, poultry, fish, beans, eggs, and nuts. Limits saturated and trans fats, sodium, and added sugars 
                </Text>
              </View>
          </View>

          <View style={{flex:7}}>  
            <SectionList
              renderItem={({item,section}) => 
                <TouchableOpacity onPress={()=>this.rowSelected(item,section)}>
                  <View style={{
                    flex:1,
                    alignItems:'flex-start',
                    justifyContent:'flex-end',
                  }}>
                    <View style={{flex:2, alignSelf:'center', justifyContent: 'center' }}>
                      <Text style={{
                        textAlign:'center',
                        color:'green',
                        fontSize:18,
                        }}> ------------------- {item.title} --------------------
                      </Text>
                    </View>
                    {
                      item.dataArray.map(foodItem => 
                        <View style={{flex:4}}>
                          <Text style={{ color:'black', marginLeft:15, fontSize:16, alignSelf : 'flex-start', fontWeight : 'bold'}}>
                            Item : {foodItem.item}
                          </Text>
                          <Text style={{ color:'black', marginLeft:15, fontSize:14, alignSelf : 'flex-start', textAlign : 'justify'}}>
                            Reciepe : {foodItem.reciepe}
                          </Text>
                          <Text style={{ color:'black', marginLeft:15, fontSize:14, alignSelf : 'flex-start', textAlign : 'justify'}}>
                            Grocery : {foodItem.grocery}
                          </Text>
                        </View>
                        )
                    }
                  </View>
                </TouchableOpacity>
              }

              renderSectionHeader={({section}) =>
                <View style={{height:40,backgroundColor:'white',justifyContent:'center'}}>
                  <Divider style = {{backgroundColor : 'black', height : 3, marginTop : 20, marginBottom : 10}}/>
                  <Text style={{color:'green',textAlign:'left', marginLeft:15, fontSize:20, }}>
                  {section.title}
                  </Text>
                </View>
              }
              sections={this.DATA}
            />
          </View>
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
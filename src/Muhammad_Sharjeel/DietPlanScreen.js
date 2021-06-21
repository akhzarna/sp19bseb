import * as React from 'react';
import { View, TouchableOpacity, Image, Text, Alert, FlatList, ScrollView, StyleSheet, SectionList } from 'react-native';
import MyHeader from '../Hamza_Iftikhar/MyHeader.js';
import { NavigationEvents } from "react-navigation";

import axios from 'axios';

import AnimatedLoader from "react-native-animated-loader";

export default class DietPlanScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      visible: false,
    };
  }

  fetchDataFromAPI()
  {
    this.setState({visible:true});

    const headers = { 
        'Authorization': 'Bearer ' + this.props.route.params.token,
        'content-type':'application/json'
    };

    axios.get('https://thefoodpharmacy.pk/api/auth/diet/' + this.props.route.params.userId , {headers}).
    then(response => {
        if(response.data["status"] === "error")
        {
          // Alert.alert("Note", response.data["response"]["message"], [{text : "Ok", onPress : () => this.props.navigation.goBack(), style : 'default'}]);
          this.setState({visible:false});
        }

        if(response.data["status"] === "okay")
        {
          // Alert.alert("Submission Status", "Data submitted successfully", [{text : "Ok", onPress : () => this.props.navigation.goBack(), style : 'default'}]);
          this.setState({visible:false});
        }
    }).
    catch(error => {
      Alert.alert("Error", error.message);
      this.setState({visible:false});
    });
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

    const DATA = [
      {
        key:0,
        title: "Sunday",
        data: [{key:0, title: "Breakfast"}, {key:1, title: "Lunch"}, {key:2, title: "Snack"}, {key:3, title: "Dinner"}]
      },
      {
        key:1,
        title: "Monday",
        data: [{key:0, title: "Breakfast"}, {key:1, title: "Lunch"}, {key:2, title: "Snack"}, {key:3, title: "Dinner"}]
      },
      {
        key:2,
        title: "Tuesday",
        data: [{key:0, title: "Breakfast"}, {key:1, title: "Lunch"}, {key:2, title: "Snack"}, {key:3, title: "Dinner"}]
      },
      {
        key:3,
        title: "Wednesday",
        data: [{key:0, title: "Breakfast"}, {key:1, title: "Lunch"}, {key:2, title: "Snack"}, {key:3, title: "Dinner"}]
      }
    ];

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
        <View style={{flex:3}}>
          <View style={{flexDirection:'row', flex:2}}>
            <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{
                fontSize: 20,
                marginLeft:15,
              }}>Download From Here</Text>
            </View>

            <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
              <Image
                style={{
                  width: 130,
                  height: 90,
                  position: "absolute",
                  right: 20,
                }}
                source={require('./img/1.png')}
                resizeMode="contain"
              />
            </View>
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
              }}>A healthy eating plan: Emphasizes vegetables, fruits, whole grains, and fat-free or low-fat dairy oroducts. Includes lean meats, poultry, fish, beans, eggs, and nuts. Limits saturated and trans fats, sodium, and added sugars </Text>

            </View>
          </View>
        </View>

        <View style={{flex:7}}>
            
        <SectionList
        renderItem={
          
          ({item,section}) => 
                
                <TouchableOpacity onPress={()=>this.rowSelected(item,section)}>
                    <View style={{
                      flex:1,
                      alignItems:'center',
                      justifyContent:'flex-end',
                    }}>

                      <View style={{flex:2, alignItems:'center', justifyContent: 'center' }}>
                        <Text style={{
                              textAlign:'center',
                              color:'green',
                              fontSize:18,
                              }}> ------------------- {item.title} --------------------
                        </Text>
                      </View>
                      
                      <View style={{flex:4, justifyContent: 'center' }}>
                        <Text style={{
                              color:'black',
                              marginLeft:15,
                              fontSize:14,
                              }}>Item 1:           A healthy eating plan: Emphasizes vegetables, fruits, whole grains, and fat-free or low-fat dairy oroducts. Includes lean meats, poultry, fish, beans, eggs, and nuts. Limits saturated and trans fats, sodium, and added sugars
                        </Text>
                      </View>

                      <View style={{flex:4, justifyContent: 'center' }}>
                        <Text style={{
                              color:'black',
                              marginLeft:15,
                              fontSize:14,
                              }}>Item 2:           A healthy eating plan: Emphasizes vegetables, fruits, whole grains, and fat-free or low-fat dairy oroducts. Includes lean meats, poultry, fish, beans, eggs, and nuts. Limits saturated and trans fats, sodium, and added sugars
                        </Text>
                      </View>


                    </View>
                      
                  </TouchableOpacity>
                }

        renderSectionHeader={({section}) =>
        <View style={{height:40,backgroundColor:'white',justifyContent:'center'}}>
        <Text style={{color:'green',textAlign:'left',
        marginLeft:15, fontSize:20,
          }}>
          {section.title}
          </Text>
        </View>
        }
        sections={DATA}
        />

        </View>
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





















  //  <View style={{
  //           backgroundColor: '#fff',
  //         }}>
  //           <View>
  //             <Text style={{
  //               top: 125,
  //               left: 20,
  //               fontSize: 20,
  //             }}>Download From Here</Text>
  //             <Image
  //               style={{
  //                 width: 130,
  //                 height: 90,
  //                 position: "absolute",
  //                 right: 20,
  //               }}
  //               source={require('./img/1.png')}
  //               resizeMode="contain"
  //             />
  //             <Text style={{
  //               fontSize: 20,
  //               color: "#08943c",
  //               top: 50,
  //               left: 20,
  //             }}>View Diet Plane</Text>
  //             <Text style={{
  //               fontWeight: "200",
  //               fontSize: 20,
  //               top: 60,
  //               left: 20,
  //             }}>Meal Plan</Text>
  //             <Text style={{
  //               fontSize: 15,
  //               top: 60,
  //               left: 20,
  //             }}>12/5/2021</Text>
  //             <Text style={{
  //               fontSize: 12,
  //               top: 60,
  //               marginLeft: 20,
  //               marginRight: 20,
  //             }}>A healthy eating plan: Emphasizes vegetables, fruits, whole grains, and fat-free or low-fat dairy products. Includes lean meats, poultry, fish, beans, eggs, nuts. Linit saturated and trans fats, sodium, and added sugars.</Text>
  //             <View style={{
  //               top: 50,
  //               height: 50,
  //               backgroundColor: '#fff',
  //               zIndex: -100,
  //             }}></View>
  //           </View >
  //         </View>
  //         {/* <FlatList style={{
  //           top: 20,
  //         }}
  //           data={this.state.dataArray}
  //           renderItem={({ item, index }) => */}
  //           <ScrollView>
  //             <View style={{
  //             }}>
  //               <Text style={{
  //                 color: "#08943c",
  //                 top: 70,
  //                 marginLeft: 20,
  //                 fontWeight: "bold",
  //                 fontSize: 20,
  //               }}>Sunday</Text>
  
  //               {/* Lunch Code */}
  
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 90, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: 'black', left: 20, }} />
  //                 <View>
  //                   <Text style={{ left: 30, color: "#08943c", fontSize: 20, }}>BreakFast</Text>
  //                 </View>
  //                 <View style={{ width: 120, height: 1, backgroundColor: 'black', left: 40, }} />
  //               </View>
  //               <View style={{
  
  //                 top: 100,
  //                 // marginLeft: 20,
  //               }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 15,
  //                     left: 20,
  //                   }}>Item 1</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -20,
  //                 }}>Eggs & Onion Scramble</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                 }}>View Recipe{"\n"} Direction</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -40,
  //                 }}>Direction are for original recipe{"\n"}of 1 omelet.{"\n"}1. Dice onion. Whisk eggs and add{"\n"}the onion, pepper, and vinegar.{"\n"}2. Heat a pan over medium heat{"\n"}and coat with non-stick spray. </Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                   top: -30,
  //                 }}>View Grocery{"\n"}List</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -70,
  //                 }}>Cabbage, Onion, Red bell pepper,{"\n"} Parsley</Text>
  //               </View>
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: '#08943c', left: 130, }} />
  //               </View >
  //               <View style={{
  
  //                 top: 100,
  //               }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 15,
  //                     left: 20,
  //                   }}>Item 2</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -20,
  //                 }}>Eggs & Onion Scramble</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                 }}>View Recipe{"\n"} Direction</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -40,
  //                 }}>Direction are for original recipe{"\n"}of 1 omelet.{"\n"}1. Dice onion. Whisk eggs and add{"\n"}the onion, pepper, and vinegar.{"\n"}2. Heat a pan over medium heat{"\n"}and coat with non-stick spray. </Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                   top: -30,
  //                 }}>View Grocery{"\n"}List</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -70,
  //                 }}>Cabbage, Onion, Red bell pepper,{"\n"} Parsley</Text>
  //               </View>
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: '#08943c', left: 130, }} />
  //               </View >
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 90, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: 'black', left: 20, }} />
  //                 <View>
  //                   <Text style={{ left: 30, color: "#08943c", fontSize: 20, }}>Lunch</Text>
  //                 </View>
  //                 <View style={{ width: 120, height: 1, backgroundColor: 'black', left: 40, }} />
  //               </View>
  //               <View style={{
  
  //                 top: 100,
  //                 // marginLeft: 20,
  //               }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 15,
  //                     left: 20,
  //                   }}>Item 1</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -20,
  //                 }}>Eggs & Onion Scramble</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                 }}>View Recipe{"\n"} Direction</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -40,
  //                 }}>Direction are for original recipe{"\n"}of 1 omelet.{"\n"}1. Dice onion. Whisk eggs and add{"\n"}the onion, pepper, and vinegar.{"\n"}2. Heat a pan over medium heat{"\n"}and coat with non-stick spray. </Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                   top: -30,
  //                 }}>View Grocery{"\n"}List</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -70,
  //                 }}>Cabbage, Onion, Red bell pepper,{"\n"} Parsley</Text>
  //               </View>
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: '#08943c', left: 130, }} />
  //               </View >
  //               <View style={{
  
  //                 top: 100,
  //                 // marginLeft: 20,
  //               }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 15,
  //                     left: 20,
  //                   }}>Item 2</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -20,
  //                 }}>Eggs & Onion Scramble</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                 }}>View Recipe{"\n"} Direction</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -40,
  //                 }}>Direction are for original recipe{"\n"}of 1 omelet.{"\n"}1. Dice onion. Whisk eggs and add{"\n"}the onion, pepper, and vinegar.{"\n"}2. Heat a pan over medium heat{"\n"}and coat with non-stick spray. </Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                   top: -30,
  //                 }}>View Grocery{"\n"}List</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -70,
  //                 }}>Cabbage, Onion, Red bell pepper,{"\n"} Parsley</Text>
  //               </View>
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: '#08943c', left: 130, }} />
  //               </View >
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 90, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: 'black', left: 20, }} />
  //                 <View>
  //                   <Text style={{ left: 30, color: "#08943c", fontSize: 20, }}>Snacks</Text>
  //                 </View>
  //                 <View style={{ width: 120, height: 1, backgroundColor: 'black', left: 40, }} />
  //               </View>
  //               <View style={{
  
  //                 top: 100,
  //                 // marginLeft: 20,
  //               }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 15,
  //                     left: 20,
  //                   }}>Item 1</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -20,
  //                 }}>Eggs & Onion Scramble</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                 }}>View Recipe{"\n"} Direction</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -40,
  //                 }}>Direction are for original recipe{"\n"}of 1 omelet.{"\n"}1. Dice onion. Whisk eggs and add{"\n"}the onion, pepper, and vinegar.{"\n"}2. Heat a pan over medium heat{"\n"}and coat with non-stick spray. </Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                   top: -30,
  //                 }}>View Grocery{"\n"}List</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -70,
  //                 }}>Cabbage, Onion, Red bell pepper,{"\n"} Parsley</Text>
  //               </View>
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: '#08943c', left: 130, }} />
  //               </View >
  //               <View style={{
  
  //                 top: 100,
  //                 // marginLeft: 20,
  //               }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 15,
  //                     left: 20,
  //                   }}>Item 2</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -20,
  //                 }}>Eggs & Onion Scramble</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                 }}>View Recipe{"\n"} Direction</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -40,
  //                 }}>Direction are for original recipe{"\n"}of 1 omelet.{"\n"}1. Dice onion. Whisk eggs and add{"\n"}the onion, pepper, and vinegar.{"\n"}2. Heat a pan over medium heat{"\n"}and coat with non-stick spray. </Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                   top: -30,
  //                 }}>View Grocery{"\n"}List</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -70,
  //                 }}>Cabbage, Onion, Red bell pepper,{"\n"} Parsley</Text>
  //               </View>
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: '#08943c', left: 130, }} />
  //               </View >
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 90, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: 'black', left: 20, }} />
  //                 <View>
  //                   <Text style={{ left: 30, color: "#08943c", fontSize: 20, }}>Dinner</Text>
  //                 </View>
  //                 <View style={{ width: 120, height: 1, backgroundColor: 'black', left: 40, }} />
  //               </View>
  //               <View style={{
  
  //                 top: 100,
  //                 // marginLeft: 20,
  //               }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 15,
  //                     left: 20,
  //                   }}>Item 1</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -20,
  //                 }}>Eggs & Onion Scramble</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                 }}>View Recipe{"\n"} Direction</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -40,
  //                 }}>Direction are for original recipe{"\n"}of 1 omelet.{"\n"}1. Dice onion. Whisk eggs and add{"\n"}the onion, pepper, and vinegar.{"\n"}2. Heat a pan over medium heat{"\n"}and coat with non-stick spray. </Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                   top: -30,
  //                 }}>View Grocery{"\n"}List</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -70,
  //                 }}>Cabbage, Onion, Red bell pepper,{"\n"} Parsley</Text>
  //               </View>
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: '#08943c', left: 130, }} />
  //               </View >
  //               <View style={{
  
  //                 top: 100,
  //                 // marginLeft: 20,
  //               }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 15,
  //                     left: 20,
  //                   }}>Item 2</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -20,
  //                 }}>Eggs & Onion Scramble</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                 }}>View Recipe{"\n"} Direction</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -40,
  //                 }}>Direction are for original recipe{"\n"}of 1 omelet.{"\n"}1. Dice onion. Whisk eggs and add{"\n"}the onion, pepper, and vinegar.{"\n"}2. Heat a pan over medium heat{"\n"}and coat with non-stick spray. </Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 20,
  //                   top: -30,
  //                 }}>View Grocery{"\n"}List</Text>
  //                 <Text style={{
  //                   fontSize: 15,
  //                   left: 150,
  //                   top: -70,
  //                 }}>Cabbage, Onion, Red bell pepper,{"\n"} Parsley</Text>
  //               </View>
  //               <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, }}>
  //                 <View style={{ width: 120, height: 1, backgroundColor: '#08943c', left: 130, }} />
  //               </View >
  //             </View >
  //           </ScrollView>
  //           {/* }
  //           keyExtractor={item => item.id}
  //         /> */}
  //       </View>
  //         }
  //     </View>
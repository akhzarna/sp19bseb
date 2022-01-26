import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView
} from 'react-native';

// Realtime Database
import database from '@react-native-firebase/database';

// Firestore Database
import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Chip } from 'react-native-paper';

const BookPosters = [
  {
  key:0,
  poster:require('./aliahtashamdata/Images/bookpo.jpg')
  },
  {
  key:1,
  poster:require('./aliahtashamdata/Images/bookPoster.jpg')
  }
];

export default class Allbooks extends Component{

    constructor(props){
      super(props);
      this.state={
          bookArray:[],
          bookArrayNew:[],
          showProgress:true,
          university:[],
          allBooksData:[],
          dumpArray:[],
          showSearchField:false,
          searchArray:[]
      }
    }
    
    componentDidMount() {

      database()
      .ref('/books/')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        this.setState({allBooksData:snapshot.val()});
        this.setState({dumpArray:snapshot.val()});
      });

  // For not Live Update
  //     database()
  //     .ref('/books/')
  //     .once('value')
  //     .then(snapshot => {
  //       console.log('All Books are: ', snapshot.val());
  //       this.setState({allBooksData:snapshot.val()});
  //       this.setState({dumpArray:snapshot.val()});
  // });

}

    pushToNextViewController(arrayDB){
      this.props.navigation.navigate('ChaptersListComponent',{
        finalArray:arrayDB,
      });
    }

    rowSelected(item){
        var bookName = this.state.bookArray[item.key]
        this.props.navigation.navigate('ChaptersListComponent',{
          finalArray:this.state.bookArray[item.key].data,
          finalDict:this.state.bookArray[item.key],
        });
    }

    featured(){
     this.setState({allBooksData:this.state.dumpArray});
    }

    popular(){
    var cloneArray = [];
    cloneArray = this.state.dumpArray.filter(function(item){
        return item.category == 1;
     }).map(function({chapters, detail, key, name, title, url, author, bookintro, category}){
         return {chapters, detail, key, name, title, url, author, bookintro, category};
     });
     console.log(cloneArray);
     this.setState({allBooksData:cloneArray});
    }

    toprated(){
      var cloneArray = [];
      cloneArray = this.state.dumpArray.filter(function(item){
          return item.category == 2;
       }).map(function({chapters, detail, key, name, title, url, author, bookintro, category}){
           return {chapters, detail, key, name, title, url, author, bookintro, category};
       });
       console.log(cloneArray);
       this.setState({allBooksData:cloneArray});
    }

    actSearch(text){
      this.state.showSearchField=true;
      this.setState({
        showSearchField:this.state.showSearchField,
      })
    
      var searchWord=text.trim();
      if (searchWord) {
        var tempArray=[];
        for (var x = 0; x < this.state.allBooksData.length; x++) {
          var paragraph=''+this.state.allBooksData[x].title;
          var index=paragraph.indexOf(searchWord);
          if (index !=-1){
            console.log('Testing Log');
            tempArray.push(this.state.allBooksData[x]);
          }else{
            var paragraph=''+this.state.allBooksData[x].name;
            var index=paragraph.indexOf(searchWord);
            if (index !=-1){
              console.log('Testing Log');
              tempArray.push(this.state.allBooksData[x]);
            }else{
              var paragraph=''+this.state.allBooksData[x].detail;
              var index=paragraph.indexOf(searchWord);
              if (index !=-1){
                console.log('Testing Log');
                tempArray.push(this.state.allBooksData[x]);
              }else{
              }
            }
          }
        }
      }else{
        console.log('Else Part');
        tempArray=this.state.allBooksData;
      }
        
    this.setState({
    searchArray:tempArray,
    })

    console.log('After Searching Array temp Array is =',tempArray);
    console.log('After Searching Array Search Array is =',this.state.searchArray);
    }
    
    actionTextBlur(){
    // Alert.alert('false');
    // if (this.state.textSearch == '') {
    //   this.setState({
    //     showSearchField:false,
    //   })
    // }
    }

    chaptersLoadAction(chapters){
      console.log('All Books Data is = ', chapters);
      this.props.navigation.navigate('Allchapters',{chapters:chapters});
    }
    
    render(){

    console.log('Render All Books Data is =', this.state.allBooksData);
    console.log('Render Search Data is =', this.state.searchArray);
    return (
    
    <View style = {Styles.container}>
  
      <View style={{flexDirection:'row', marginTop:10}}> 
        <TouchableOpacity style = {Styles.backbtn} onPress={()=>this.props.navigation.pop()}>
        <Icon name='chevron-left' size={30} color='#699c26'  /> 
        </TouchableOpacity>
      <View style={Styles.searchbarDesign}> 
        <TouchableOpacity>
          <Icon name='search' size={23} color='#0e0e0e'  /> 
        </TouchableOpacity>
        <TextInput
                autoFocus={false}
                selectionColor='white'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.actSearch(text)}
                onBlur={()=>this.actionTextBlur()}
                placeholder="تلاش کریں"
                style={{
                  marginHorizontal:10,
                  borderRightWidth:1,
                  borderColor:'#e5e5e5',
                  paddingHorizontal:20,
                  fontSize:16,
              }}
         />
         </View>
      </View>
        
        <View>
          <FlatList 
            style={Styles.posterList}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            horizontal={true}
            data={BookPosters}
            keyExtractor={(key) => (key.key)}
            renderItem={
            ({item})=>
              <View style = {Styles.poster}>
                <Image style={Styles.undraw} source={item.poster} />
              </View>
            } 
          />
         </View>       

        <View style ={Styles.chipDesign}>
         <Chip icon="slack" onPress={() => this.featured()} >Featured</Chip>
         <Chip icon="star" onPress={() => this.popular()}>Popular</Chip>
         <Chip icon="tag" onPress={() => this.toprated()}>Top Rated</Chip>
        </View>

          <View  style={Styles.midSection}>
            <FlatList 
             numColumns={2}
             keyExtractor={(item) => item.id}
             nestedScrollEnabled={true}
             data={this.state.showSearchField?this.state.searchArray:this.state.allBooksData}
             renderItem={
              ({item}) => 
              <TouchableOpacity  style={Styles.Grid} onPress={()=>this.props.navigation.navigate('BookDetail',{item: item})}>
                <View style ={Styles.imgBox}>
                    <Image 
                    style={Styles.Proimage}
                    source={{ uri: item.url}} 
                    />
                </View>
                <View style = {Styles.GridContent}>
                  <Text style = {Styles.MainTitle}>
                    {item.title}
                  </Text>
                  <Text style = {Styles.Details}>
                    {item.detail}
                  </Text>
                </View>
                </TouchableOpacity > 
              }
            />
          </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({

  container:{
      flex:1,
      backgroundColor:'#fff',
  },
  searchbarDesign:{
    width:'80%',
    height:45,
    borderRadius:20,
    backgroundColor:'#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 4,
    paddingHorizontal:20,
    flexDirection:'row-reverse',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#24A148',
  },
  backbtn:{
    height:45,
    width:45,
    padding:8,
    borderRadius:100/2,
    backgroundColor:'rgba(217, 215, 215, 0.5)',
    marginHorizontal:10,
},
chipDesign:{
  flexDirection:'row',
  justifyContent:'space-evenly',
  margin:10,
  },
  midSection:{
    flex:1,
    margin:10, 
},

  Bookheader:{
      flexDirection:'row',
      marginVertical:15,
  },
    bookSearch:{
        marginHorizontal:10,
        borderRightWidth:1,
        borderColor:'#e5e5e5',
        paddingHorizontal:20,
        fontSize:16,
    },
  posterList:{
      marginHorizontal:20,
  },
  poster:{
      width:340,
      height:150,
      backgroundColor:'#fafafa',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 5,
      alignSelf:'center',
      borderRadius:20,
      marginVertical:10,
      marginHorizontal:7
      
  },
  undraw:{
      width:'100%',
      height:'100%',
      borderRadius:20,
     
  },
 
  Grid:{
     width:135,
     height:270,
     alignItems:'center',
     borderRadius:10,
     backgroundColor:"#fafafa",
      marginHorizontal:30,
      marginVertical:18,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.3,
      shadowRadius: 3,
      elevation: 5,
  },
  imgBox:{
     width:135,
     height:200,
     borderRadius:10,
  },
  Proimage:{
     width:'100%',
     height:'100%',
     borderRadius:10,
     resizeMode:'cover'
  },
  GridContent:{
      alignSelf:'flex-end',
      marginHorizontal:10,
      marginVertical:5,
  },
  MainTitle:{
      color:'#18191A',
      fontFamily:'Jameel-Noori-Nastaleeq-Kasheeda',
      fontSize:19,
      
  },
  Details:{
      fontFamily:'Jameel Noori Nastaleeq Regular',
  color:'#a5a5a5',
  fontSize:14, 
  marginTop:-5
 
  },
})

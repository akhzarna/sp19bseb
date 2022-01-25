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
          flag1:45,
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
      .once('value')
      .then(snapshot => {
        console.log('All Books are: ', snapshot.val());
        this.setState({allBooksData:snapshot.val()});
        this.setState({dumpArray:snapshot.val()});
  });
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
    var cloneArray = [];
    // cloneArray = this.state.dumpArray.filter(function(item){
    //     return item.category == 0;
    //  }).map(function({chapters, detail, key, name, title, url}){
    //      return {chapters, detail, key, name, title, url};
    //  });
    //  console.log(cloneArray);
     this.setState({allBooksData:this.state.dumpArray});
    }

    popular(){
    var cloneArray = [];
    cloneArray = this.state.dumpArray.filter(function(item){
        return item.category == 1;
     }).map(function({chapters, detail, key, name, title, url}){
         return {chapters, detail, key, name, title, url};
     });
     console.log(cloneArray);
     this.setState({allBooksData:cloneArray});
    }

    toprated(){
    var cloneArray = [];
    cloneArray = this.state.dumpArray.filter(function(item){
        return item.category == 2;
     }).map(function({chapters, detail, key, name, title, url}){
         return {chapters, detail, key, name, title, url};
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
    
    console.log('After Searching Array temp Array is =',tempArray);
    
    this.setState({
    searchArray:tempArray,
    })
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
      return (
      <ScrollView 
        style = {Styles.container}
        nestedScrollEnabled={true}> 
        <View style ={Styles.Bookheader}>
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
                    placeholder="Search Surah Number or Name"
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

          <View style ={Styles.chipDesign}>
            <Chip icon="slack" onPress={() => this.featured()} >Featured</Chip>
            <Chip icon="star" onPress={() => this.popular()}>Popular</Chip>
            <Chip  icon="tag" onPress={() => this.toprated()}>Top Rated</Chip>
          </View>

<View  style={Styles.midSection}>
    <FlatList 
            data={this.state.showSearchField?this.state.searchArray:this.state.allBooksData}
            renderItem={
                ({item}) => 
            <TouchableOpacity  style={Styles.Grid} onPress={()=>this.props.navigation.navigate('BookDetail',{item :[item]})}>
                <View style ={Styles.imgBox}>
                    <Image 
                    style={Styles.Proimage}
                    source={{ uri: item.url}} />
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
            numColumns={2}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled={true}/>
       </View>
      </ScrollView>
      );
  }
}

const Styles = StyleSheet.create({

  container:{
      flex:1,
      backgroundColor:'#fff',
  },
  Bookheader:{
      flexDirection:'row',
      marginVertical:15,
  },
  backbtn:{
      height:45,
      width:45,
      padding:8,
      borderRadius:100/2,
      backgroundColor:'rgba(217, 215, 215, 0.5)',
      marginHorizontal:10,
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
      borderColor:'#24A148'
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

  chipDesign:{
      flexDirection:'row',
  justifyContent:'space-evenly',
  margin:10,
  },

  midSection:{
      flex:1,
    
      margin:10, 
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
  action:{
      flex:2,
      backgroundColor:'#24A148',
      borderTopRightRadius:20,
      borderBottomRightRadius:20,
      justifyContent:'center',
      alignItems:'center'
  }
})


















// const styles=StyleSheet.create({
// outerContainer:{
//   flex:1,
//   backgroundColor:'white',
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// buttonStyle:{
//   marginLeft:0,
//   marginRight:0,
//   marginTop:10,
//   marginBottom:0,
//   justifyContent: 'center',
//   alignItems: 'center',
//   width:Cell_Width,
// },

// imageStyle:{
//   marginLeft:5,
//   marginRight:5,
//   marginTop:5,
//   marginBottom:5,
//   width:80,
//   height:120,
// },

// textStyle:{
//   color:'#38803B',
//   marginTop:0,
//   marginBottom:5,
//   textAlign:'center',
//   fontSize:20,
//   // fontWeight:'bold',
//   fontFamily:'MehrNastaliqWeb'
// },

// viewStyleMain:{
//   flex:1,
//   flexDirection:'row',
//   // marginLeft:5,
//   // marginRight:5,
//   // marginTop:5,
//   // marginBottom:5,
//   // elevation: 3,
//   // borderRadius:4,
//   padding:4,
//   height:140,
//   // justifyContent: 'flex-start',
//   // shadowOpacity: 10,
//   // shadowColor: 'grey',
//   // alignItems: 'center',
//   // justifyContent: 'center',
//   backgroundColor : 'lightgrey', 
// },

// leftView:{
//   flex:0.33,
//   // marginLeft:5,
//   // marginRight:5,
//   // marginTop:5,
//   // marginBottom:5,
//   // elevation: 3,
//   // justifyContent: 'flex-start',
//   // alignItems: 'center',
//   // width:Cell_Width,
//   // borderRadius:4,
//   // padding:4,
//   // shadowOpacity: 10,
//   backgroundColor : 'white',
//   // shadowColor: 'black',
//   // justifyContent: 'center',
// },

// rightView:{
//   flex:0.67,
//   // marginLeft:15,
//   // marginRight:5,
//   // marginTop:5,
//   // marginBottom:5,
//   // elevation: 3,
//   // justifyContent: 'flex-start',
//   // alignItems: 'center',
//   // width:Cell_Width,
//   // borderRadius:4,
//   // padding:4,
//   // shadowOpacity: 10,
//   backgroundColor : 'grey',
//   // shadowColor: 'black',
//   // justifyContent: 'center',
// },

// viewStyleTop:{
//   flex:0.50,
//   // marginLeft:15,
//   // marginRight:5,
//   // marginTop:5,
//   // marginBottom:5,
//   // elevation: 3,
//   // justifyContent: 'flex-start',
//   // alignItems: 'center',
//   // width:Cell_Width,
//   // borderRadius:4,
//   // padding:4,
//   // shadowOpacity: 10,
//   backgroundColor : 'white',
//   // shadowColor: 'black',
//   // justifyContent: 'center',
// },

// bottomView:{
//   flex:0.50,
//   flexDirection:'row',
//   // marginLeft:15,
//   // marginRight:5,
//   // marginTop:5,
//   // marginBottom:5,
//   // elevation: 3,
//   // justifyContent: 'flex-start',
//   // alignItems: 'center',
//   // width:Cell_Width,
//   // borderRadius:4,
//   // padding:4,
//   // shadowOpacity: 10,
//   backgroundColor : 'white',
//   // shadowColor: 'black',
//   // justifyContent: 'center',
// },
// titleStyle:{
//   color:'lightgrey',
//   marginTop:0,
//   // marginBottom:0,
//   // textAlign:'center',
//   fontSize:18,
//   // fontWeight:'bold',
//   // fontFamily:'MehrNastaliqWeb'
// },

// buttontitleStyle:{
//   color:'lightgrey',
//   marginTop:0,
//   // marginBottom:0,
//   // textAlign:'center',
//   fontSize:12,
//   // fontWeight:'bold',
//   // fontFamily:'MehrNastaliqWeb'
// },

// subtitleStyle:{
//   color:'grey',
//   marginTop:5,
//   // marginBottom:0,
//   // textAlign:'center',
//   fontSize:13,
//   // fontWeight:'bold',
//   // fontFamily:'MehrNastaliqWeb'
// },

// buttonStyleAudio:{
//   marginLeft:5,
//   marginRight:5,
//   marginTop:50,
//   marginBottom:5,
//   elevation: 3,
//   // justifyContent: 'flex-start',
//   alignItems: 'center',
//   width:60,
//   height:35,
//   borderRadius:4,
//   padding:4,
//   shadowOpacity: 10,
//   backgroundColor : '#D3D3D3',
//   shadowColor: 'lightgrey',
//   justifyContent: 'center',
// },

// buttonStyleUnicode:{
//   // marginLeft:0,
//   marginRight:5,
//   marginTop:50,
//   // marginBottom:5,
//   // elevation: 3,
//   // justifyContent: 'flex-start',
//   alignItems: 'center',
//   width:60,
//   height:35,
//   borderRadius:4,
//   padding:4,
//   shadowOpacity: 10,
//   backgroundColor : '#D3D3D3',
//   shadowColor: 'lightgrey',
//   justifyContent: 'center',
// },

// buttonStylePDF:{
//   // marginLeft:0,
//   // marginRight:5,
//   marginTop:50,
//   // marginBottom:5,
//   elevation: 3,
//   // justifyContent: 'flex-start',
//   alignItems: 'center',
//   width:60,
//   height:35,
//   borderRadius:4,
//   padding:4,
//   shadowOpacity: 10,
//   backgroundColor : '#D3D3D3',
//   shadowColor: 'lightgrey',
//   justifyContent: 'center',
// },

// })


// booksLoadAction(){
//   console.log('Book Load Action Always Call or Not');
//   var allBooksInOne = '';
//   if (isiPhone) {
//   // isiPhone
//   allBooksInOne = RNFS.MainBundlePath+'/allbooks.txt';

//   var finalBookArrayCarrot = [];
//   RNFS.readFile(allBooksInOne)
//       .then((contents) => {
//         var contentString = contents.toString();
//         console.log('contentString for iOS is = ', contentString);
//         var chaptersArray=[];
//         // For Chapters Titles denoted by & Sign
//         for (var i = 0; i < contentString.length; i++) {
//           var firstIndex=contentString.indexOf('^',i);
//           var secondIndex=contentString.indexOf('^',firstIndex+1);
//           if (secondIndex==-1 || firstIndex==-1) {
//             break;
//           }
//           var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//           chaptersArray.push(tempString);
//           i=secondIndex;
//         }
//         // console.log('Chapters Array is = ',chaptersArray);
//         var diseasesArray = [];
//         // For Main Titles denoted by @ Sign
//         for (var i = 0; i < chaptersArray.length; i++) {
//           var stringAtIndex = chaptersArray[i];
//           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//           var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
//           var titlesArray=[];
//           for (var x = 0; x < stringAtIndex.length; x++) {
//             var firstIndex=stringAtIndex.indexOf('&',x);
//             var secondIndex=stringAtIndex.indexOf('&',firstIndex+1);
//             if (secondIndex==-1 || firstIndex==-1) {
//               break;
//             }
//             var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//             // Save String and Heading Both in Array
//             // var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//             titlesArray.push(tempString.trim());
//             x=secondIndex;
//           }
//           var mainArrayObjIs = {key:i, title:testStringChapters,data:titlesArray};
//           diseasesArray.push(mainArrayObjIs);
//           // console.log('diseasesArray Array = ',diseasesArray);
//         }
//         var completeBookArray = [];
//         // For Main Titles denoted by @ Sign
//         for (var i = 0; i < diseasesArray.length; i++) {
//           var prescriptionArray = [];
//           for (var j = 0; j < diseasesArray[i].data.length; j++) {
//             var titlesArrayNew = [];
//             var stringAtIndex = diseasesArray[i].data[j];
//             var headingEndIndex = stringAtIndex.indexOf('\r',1);
//             var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
//             for (var x = 0; x < stringAtIndex.length; x++) {
//               var firstIndex=stringAtIndex.indexOf('@',x);
//               var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//               if (secondIndex==-1 || firstIndex==-1) {
//                 break;
//               }
//               var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//               // Save String and Heading Both in Array
//               titlesArrayNew.push(tempString.trim());
//               x=secondIndex;
//             }
//             var mainArrayObjIs = {key:j, title:testStringChapters,data:titlesArrayNew};
//             prescriptionArray.push(mainArrayObjIs);
//           }
//           var aiknaiarrayObj = {key:i, title:diseasesArray[i].title,data:prescriptionArray};
//           completeBookArray.push(aiknaiarrayObj);
//         }

//         // For Test
//         for (var g = 0; g < completeBookArray.length; g++) {
//           var completeBookArrayCarrot = [];
//           for (var h = 0; h < completeBookArray[g].data.length; h++) {
//             var prescriptionArrayCarrot = [];
//             for (var k = 0; k < completeBookArray[g].data[h].data.length; k++) {
//               var titlesArrayNew = [];
//               var stringAtIndex = completeBookArray[g].data[h].data[k];
//               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//               var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
//               var indexforDollar = -1;
//               for (var x = 0; x < stringAtIndex.length; x++) {
//                 // console.log('String At Index = ',completeBookArray[g].data[h].data[k]);
//                 var firstIndex=stringAtIndex.indexOf('$',x);
//                 var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                 if (secondIndex==-1 || firstIndex==-1) {
//                   break;
//                 }
//                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                 // Save String and Heading Both in Array
//                 indexforDollar++;
//                 var titlesArrayObj = {key:indexforDollar, title:tempString.trim()};
//                 titlesArrayNew.push(titlesArrayObj);
//                 x=secondIndex;
//               }
//               var mainArrayObjIs = {key:k, title:testStringChapters,data:titlesArrayNew};
//               prescriptionArrayCarrot.push(mainArrayObjIs);
//             }
//             var aiknaiarrayObj = {key:h, title:completeBookArray[g].data[h].title,data:prescriptionArrayCarrot};
//             completeBookArrayCarrot.push(aiknaiarrayObj);
//           }

//           // To Separate Title from CoverPhoto
//           var coverArray = completeBookArray[g].title.split(':cover:');
//           var aiknaiarrayObjCarrot = [];
//           if (g==0) {
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_arind.jpg'), data:completeBookArrayCarrot};
//           }else if (g==1){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_indrain.jpg'), data:completeBookArrayCarrot};
//           }else if (g==2){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_angoor.jpg'), data:completeBookArrayCarrot};
//           }else if (g==3){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_aam.jpg'), data:completeBookArrayCarrot};
//           }else if (g==4){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_aak.jpg'), data:completeBookArrayCarrot};
//           }else if (g==5){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_badam.jpg'), data:completeBookArrayCarrot};
//           }else if (g==6){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_bargad.jpg'), data:completeBookArrayCarrot};
//           }else if (g==7){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_dhatoora.jpg'), data:completeBookArrayCarrot};
//           }else if (g==8){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
//           }else if (g==9){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
//           }else if (g==10){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
//           }else if (g==11){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
//           }else if (g==12){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
//           }else if (g==13){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
//           }else if (g==14){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
//           }else if (g==15){
//             aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
//           }
//           finalBookArrayCarrot.push(aiknaiarrayObjCarrot);
//         }
//         // console.log('Final Book Array is = ',finalBookArrayCarrot);
//         this.setState({showProgress:false});
//         AsyncStorage.setItem('booksData', JSON.stringify(finalBookArrayCarrot));
//         // this.horizontalrowselected();
//         // this.dumpIntoDB();
//       })

//       Constants.BookArray=finalBookArrayCarrot;
//       Constants.isBookLoaded=true;
//       this.setState({
//         bookArray:finalBookArrayCarrot
//       })

//       console.log('final array to dump all bookss into DB is = ',this.state.bookArray);

//     }else{
//     // isAndroid
//     allBooksInOne ='allbooks.txt';

//     var finalBookArrayCarrot = [];
//     RNFS.readFileAssets(allBooksInOne)
//         .then((contents) => {
//           var contentString = contents.toString();
//           // console.log('contentString for Android is = ', contentString);
//           var chaptersArray=[];
//           // For Chapters Titles denoted by & Sign
//           for (var i = 0; i < contentString.length; i++) {
//             var firstIndex=contentString.indexOf('^',i);
//             var secondIndex=contentString.indexOf('^',firstIndex+1);
//             if (secondIndex==-1 || firstIndex==-1) {
//               break;
//             }
//             var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//             chaptersArray.push(tempString);
//             i=secondIndex;
//           }
//           // console.log('Chapters Array is = ',chaptersArray);
//           var diseasesArray = [];
//           // For Main Titles denoted by @ Sign
//           for (var i = 0; i < chaptersArray.length; i++) {
//             var stringAtIndex = chaptersArray[i];
//             var headingEndIndex = stringAtIndex.indexOf('\r',1);
//             var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
//             var titlesArray=[];
//             for (var x = 0; x < stringAtIndex.length; x++) {
//               var firstIndex=stringAtIndex.indexOf('&',x);
//               var secondIndex=stringAtIndex.indexOf('&',firstIndex+1);
//               if (secondIndex==-1 || firstIndex==-1) {
//                 break;
//               }
//               var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//               // Save String and Heading Both in Array
//               // var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//               titlesArray.push(tempString.trim());
//               x=secondIndex;
//             }
//             var mainArrayObjIs = {key:i, title:testStringChapters,data:titlesArray};
//             diseasesArray.push(mainArrayObjIs);
//             // console.log('diseasesArray Array = ',diseasesArray);
//           }
//           var completeBookArray = [];
//           // For Main Titles denoted by @ Sign
//           for (var i = 0; i < diseasesArray.length; i++) {
//             var prescriptionArray = [];
//             for (var j = 0; j < diseasesArray[i].data.length; j++) {
//               var titlesArrayNew = [];
//               var stringAtIndex = diseasesArray[i].data[j];
//               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//               var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
//               for (var x = 0; x < stringAtIndex.length; x++) {
//                 var firstIndex=stringAtIndex.indexOf('@',x);
//                 var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                 if (secondIndex==-1 || firstIndex==-1) {
//                   break;
//                 }
//                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                 // Save String and Heading Both in Array
//                 titlesArrayNew.push(tempString.trim());
//                 x=secondIndex;
//               }
//               var mainArrayObjIs = {key:j, title:testStringChapters,data:titlesArrayNew};
//               prescriptionArray.push(mainArrayObjIs);
//             }
//             var aiknaiarrayObj = {key:i, title:diseasesArray[i].title,data:prescriptionArray};
//             completeBookArray.push(aiknaiarrayObj);
//           }

//           // For Test
//           for (var g = 0; g < completeBookArray.length; g++) {
//             var completeBookArrayCarrot = [];
//             for (var h = 0; h < completeBookArray[g].data.length; h++) {
//               var prescriptionArrayCarrot = [];
//               for (var k = 0; k < completeBookArray[g].data[h].data.length; k++) {
//                 var titlesArrayNew = [];
//                 var stringAtIndex = completeBookArray[g].data[h].data[k];
//                 var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                 var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
//                 var indexforDollar = -1;
//                 for (var x = 0; x < stringAtIndex.length; x++) {
//                   // console.log('String At Index = ',completeBookArray[g].data[h].data[k]);
//                   var firstIndex=stringAtIndex.indexOf('$',x);
//                   var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                   if (secondIndex==-1 || firstIndex==-1) {
//                     break;
//                   }
//                   var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                   // Save String and Heading Both in Array
//                   indexforDollar++;
//                   var titlesArrayObj = {key:indexforDollar, title:tempString.trim()};
//                   titlesArrayNew.push(titlesArrayObj);
//                   x=secondIndex;
//                 }
//                 var mainArrayObjIs = {key:k, title:testStringChapters,data:titlesArrayNew};
//                 prescriptionArrayCarrot.push(mainArrayObjIs);
//               }
//               var aiknaiarrayObj = {key:h, title:completeBookArray[g].data[h].title,data:prescriptionArrayCarrot};
//               completeBookArrayCarrot.push(aiknaiarrayObj);
//             }

//             // To Separate Title from CoverPhoto
//             var coverArray = completeBookArray[g].title.split(':cover:');
//             // console.log('coverArray is =');
//             // console.log(coverArray[0]);
//             // console.log(coverArray[1]);
//             var aiknaiarrayObjCarrot = [];
//             if (g==0) {
//               aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_arind.jpg'), data:completeBookArrayCarrot};
//             }
//             // else if (g==1){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/indrain.jpg'), data:completeBookArrayCarrot};
//             // }
//             // else if (g==2){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/angoor.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==3){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/aam.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==4){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_aak.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==5){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/badam.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==6){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/bargad.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==7){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/dhatoora.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==8){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==9){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==10){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==11){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==12){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==13){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==14){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
//             // }else if (g==15){
//             //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
//             // }
//             finalBookArrayCarrot.push(aiknaiarrayObjCarrot);
//           } 
//           this.setState({showProgress:false});
//           AsyncStorage.setItem('booksData', JSON.stringify(finalBookArrayCarrot));
//           // this.horizontalrowselected();
//           // this.dumpIntoDB();
//         })

//         // console.log(coverArray[0]);
//         // console.log('Final Array Testing is =', finalBookArrayCarrot[0]);

//         Constants.BookArray=finalBookArrayCarrot;
//         Constants.isBookLoaded=true;
//         this.setState({
//           bookArray:finalBookArrayCarrot
//         })

//         // console.log('Final Book is = ',this.state.bookArray);
//       }

//       console.log('Final Book is = ',this.state.bookArray);

// }



      //   <View style = {Styles.container}>
      //   <TouchableOpacity style = {Styles.backbtn}>
      //       <Icon name='chevron-left' size={32} color='#699c26'  /> 
      //       </TouchableOpacity>
      //      <View style={Styles.searchbarDesign}> 
      //      <TouchableOpacity>
      //      <Icon name='search' size={23} color='#0e0e0e'  /> 
      //      </TouchableOpacity>
      //          <TextInput
      //   style={Styles.bookSearch}
      //   placeholder="تلاش کریں"
      // />
      // </View>

      // <FlatList 
      //       data={this.state.allBooksData}
      //       keyExtractor={(key) => (key.id)}
      //       renderItem={
      //           ({item}) => 
      //     <TouchableOpacity onPress = {() => this.chaptersLoadAction(item.chapters)}>
      //     <View style={Styles.midSection}>
      //       <View style={Styles.Grid}>
      //           <View style={Styles.Gridimg}>
      //               <Image 
      //               style={Styles.Proimage}
      //               source={{ uri: item.url}} />
      //           </View>
      //           <View style = {Styles.GridContent}>
      //           <Text style = {Styles.MainTitle}>
      //               {item.title}
      //               </Text>
      //               <Text style = {Styles.Details}>
      //                   {item.name}
      //               </Text>
      //           </View>
      //       </View>  
      //   </View>
      //   </TouchableOpacity>
      //   }/>
      //   </View>
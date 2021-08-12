import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

var Header=require('./Header');
// var arrow_left=require('./Icons/arrow_left.png');
var RNFS = require('react-native-fs');
var isiPhone=Platform.OS === 'ios';
var Constants=require('./Constants')

// For Database
// import { openDatabase } from 'react-native-sqlite-storage';
// var db = openDatabase({ name: 'booksdatabase.db' });

const window = Dimensions.get('window');
var DEVICE_WIDTH=window.width;
var DEVICE_HEIGHT=window.height;
var Cell_Width=(DEVICE_WIDTH/2);

var BookManager=require('./BookManager');
import MyHeader from './MyHeader';

// Realtime Database
import database from '@react-native-firebase/database';
// Firestore Database
import firestore from '@react-native-firebase/firestore';

export default class BookShelf extends Component{
    constructor(props){
      super(props);
      // this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
      this.state={
          bookArray:[],
          bookArrayNew:[],
          showProgress:true,
      }
    }
    
    componentDidMount() {
      console.log('Final Book is = ',this.state.bookArray);
      AsyncStorage.getItem("booksData").then((value) => {
        var booksData = JSON.parse(value);
        if (booksData == null) {
          this.booksLoadAction();
        }else{
        this.setState({
          bookArray:booksData,
          showProgress:false
        }); 
        this.booksLoadAction();
        }
      }
    ).done();

 
 // Complete Collection
  firestore()
  .collection('books')
  .get()
  .then(querySnapshot => {
    var tempArray = [];
    // console.log('Total users: ', querySnapshot.size);
    querySnapshot.forEach(documentSnapshot => {
      console.log('Document ', documentSnapshot.id, documentSnapshot.data());
      tempArray.push(documentSnapshot.data());
    });
    this.setState({
      bookArrayNew:tempArray
    }); 
  });

  


  // database()
  // .ref('/Student/1')
  // .once('value')
  // .then(snapshot => {
  //   console.log('User data: ', snapshot.val());
  // });


}

booksLoadAction(){
  console.log('Book Load Action Always Call or Not');
  var allBooksInOne = '';
  if (isiPhone) {
  // isiPhone
  allBooksInOne = RNFS.MainBundlePath+'/allbooks.txt';

  var finalBookArrayCarrot = [];
  RNFS.readFile(allBooksInOne)
      .then((contents) => {
        var contentString = contents.toString();
        console.log('contentString for iOS is = ', contentString);
        var chaptersArray=[];
        // For Chapters Titles denoted by & Sign
        for (var i = 0; i < contentString.length; i++) {
          var firstIndex=contentString.indexOf('^',i);
          var secondIndex=contentString.indexOf('^',firstIndex+1);
          if (secondIndex==-1 || firstIndex==-1) {
            break;
          }
          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
          chaptersArray.push(tempString);
          i=secondIndex;
        }
        // console.log('Chapters Array is = ',chaptersArray);
        var diseasesArray = [];
        // For Main Titles denoted by @ Sign
        for (var i = 0; i < chaptersArray.length; i++) {
          var stringAtIndex = chaptersArray[i];
          var headingEndIndex = stringAtIndex.indexOf('\r',1);
          var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
          var titlesArray=[];
          for (var x = 0; x < stringAtIndex.length; x++) {
            var firstIndex=stringAtIndex.indexOf('&',x);
            var secondIndex=stringAtIndex.indexOf('&',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }
            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
            // Save String and Heading Both in Array
            // var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
            titlesArray.push(tempString.trim());
            x=secondIndex;
          }
          var mainArrayObjIs = {key:i, title:testStringChapters,data:titlesArray};
          diseasesArray.push(mainArrayObjIs);
          // console.log('diseasesArray Array = ',diseasesArray);
        }
        var completeBookArray = [];
        // For Main Titles denoted by @ Sign
        for (var i = 0; i < diseasesArray.length; i++) {
          var prescriptionArray = [];
          for (var j = 0; j < diseasesArray[i].data.length; j++) {
            var titlesArrayNew = [];
            var stringAtIndex = diseasesArray[i].data[j];
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
            for (var x = 0; x < stringAtIndex.length; x++) {
              var firstIndex=stringAtIndex.indexOf('@',x);
              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // Save String and Heading Both in Array
              titlesArrayNew.push(tempString.trim());
              x=secondIndex;
            }
            var mainArrayObjIs = {key:j, title:testStringChapters,data:titlesArrayNew};
            prescriptionArray.push(mainArrayObjIs);
          }
          var aiknaiarrayObj = {key:i, title:diseasesArray[i].title,data:prescriptionArray};
          completeBookArray.push(aiknaiarrayObj);
        }

        // For Test
        for (var g = 0; g < completeBookArray.length; g++) {
          var completeBookArrayCarrot = [];
          for (var h = 0; h < completeBookArray[g].data.length; h++) {
            var prescriptionArrayCarrot = [];
            for (var k = 0; k < completeBookArray[g].data[h].data.length; k++) {
              var titlesArrayNew = [];
              var stringAtIndex = completeBookArray[g].data[h].data[k];
              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
              var indexforDollar = -1;
              for (var x = 0; x < stringAtIndex.length; x++) {
                // console.log('String At Index = ',completeBookArray[g].data[h].data[k]);
                var firstIndex=stringAtIndex.indexOf('$',x);
                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                // Save String and Heading Both in Array
                indexforDollar++;
                var titlesArrayObj = {key:indexforDollar, title:tempString.trim()};
                titlesArrayNew.push(titlesArrayObj);
                x=secondIndex;
              }
              var mainArrayObjIs = {key:k, title:testStringChapters,data:titlesArrayNew};
              prescriptionArrayCarrot.push(mainArrayObjIs);
            }
            var aiknaiarrayObj = {key:h, title:completeBookArray[g].data[h].title,data:prescriptionArrayCarrot};
            completeBookArrayCarrot.push(aiknaiarrayObj);
          }

          // To Separate Title from CoverPhoto
          var coverArray = completeBookArray[g].title.split(':cover:');
          var aiknaiarrayObjCarrot = [];
          if (g==0) {
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_arind.jpg'), data:completeBookArrayCarrot};
          }else if (g==1){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_indrain.jpg'), data:completeBookArrayCarrot};
          }else if (g==2){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_angoor.jpg'), data:completeBookArrayCarrot};
          }else if (g==3){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_aam.jpg'), data:completeBookArrayCarrot};
          }else if (g==4){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_aak.jpg'), data:completeBookArrayCarrot};
          }else if (g==5){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_badam.jpg'), data:completeBookArrayCarrot};
          }else if (g==6){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_bargad.jpg'), data:completeBookArrayCarrot};
          }else if (g==7){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_dhatoora.jpg'), data:completeBookArrayCarrot};
          }else if (g==8){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==9){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==10){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==11){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==12){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==13){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==14){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==15){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_anar.jpg'), data:completeBookArrayCarrot};
          }
          finalBookArrayCarrot.push(aiknaiarrayObjCarrot);
        }
        // console.log('Final Book Array is = ',finalBookArrayCarrot);
        this.setState({showProgress:false});
        AsyncStorage.setItem('booksData', JSON.stringify(finalBookArrayCarrot));
        // this.horizontalrowselected();
        // this.dumpIntoDB();
      })

      Constants.BookArray=finalBookArrayCarrot;
      Constants.isBookLoaded=true;
      this.setState({
        bookArray:finalBookArrayCarrot
      })

      console.log('final array to dump all bookss into DB is = ',this.state.bookArray);

    }else{
    // isAndroid
    allBooksInOne ='allbooks.txt';

    var finalBookArrayCarrot = [];
    RNFS.readFileAssets(allBooksInOne)
        .then((contents) => {
          var contentString = contents.toString();
          // console.log('contentString for Android is = ', contentString);
          var chaptersArray=[];
          // For Chapters Titles denoted by & Sign
          for (var i = 0; i < contentString.length; i++) {
            var firstIndex=contentString.indexOf('^',i);
            var secondIndex=contentString.indexOf('^',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }
            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
            chaptersArray.push(tempString);
            i=secondIndex;
          }
          // console.log('Chapters Array is = ',chaptersArray);
          var diseasesArray = [];
          // For Main Titles denoted by @ Sign
          for (var i = 0; i < chaptersArray.length; i++) {
            var stringAtIndex = chaptersArray[i];
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
            var titlesArray=[];
            for (var x = 0; x < stringAtIndex.length; x++) {
              var firstIndex=stringAtIndex.indexOf('&',x);
              var secondIndex=stringAtIndex.indexOf('&',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // Save String and Heading Both in Array
              // var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
              titlesArray.push(tempString.trim());
              x=secondIndex;
            }
            var mainArrayObjIs = {key:i, title:testStringChapters,data:titlesArray};
            diseasesArray.push(mainArrayObjIs);
            // console.log('diseasesArray Array = ',diseasesArray);
          }
          var completeBookArray = [];
          // For Main Titles denoted by @ Sign
          for (var i = 0; i < diseasesArray.length; i++) {
            var prescriptionArray = [];
            for (var j = 0; j < diseasesArray[i].data.length; j++) {
              var titlesArrayNew = [];
              var stringAtIndex = diseasesArray[i].data[j];
              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
              for (var x = 0; x < stringAtIndex.length; x++) {
                var firstIndex=stringAtIndex.indexOf('@',x);
                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                // Save String and Heading Both in Array
                titlesArrayNew.push(tempString.trim());
                x=secondIndex;
              }
              var mainArrayObjIs = {key:j, title:testStringChapters,data:titlesArrayNew};
              prescriptionArray.push(mainArrayObjIs);
            }
            var aiknaiarrayObj = {key:i, title:diseasesArray[i].title,data:prescriptionArray};
            completeBookArray.push(aiknaiarrayObj);
          }

          // For Test
          for (var g = 0; g < completeBookArray.length; g++) {
            var completeBookArrayCarrot = [];
            for (var h = 0; h < completeBookArray[g].data.length; h++) {
              var prescriptionArrayCarrot = [];
              for (var k = 0; k < completeBookArray[g].data[h].data.length; k++) {
                var titlesArrayNew = [];
                var stringAtIndex = completeBookArray[g].data[h].data[k];
                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
                var indexforDollar = -1;
                for (var x = 0; x < stringAtIndex.length; x++) {
                  // console.log('String At Index = ',completeBookArray[g].data[h].data[k]);
                  var firstIndex=stringAtIndex.indexOf('$',x);
                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }
                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  // Save String and Heading Both in Array
                  indexforDollar++;
                  var titlesArrayObj = {key:indexforDollar, title:tempString.trim()};
                  titlesArrayNew.push(titlesArrayObj);
                  x=secondIndex;
                }
                var mainArrayObjIs = {key:k, title:testStringChapters,data:titlesArrayNew};
                prescriptionArrayCarrot.push(mainArrayObjIs);
              }
              var aiknaiarrayObj = {key:h, title:completeBookArray[g].data[h].title,data:prescriptionArrayCarrot};
              completeBookArrayCarrot.push(aiknaiarrayObj);
            }

            // To Separate Title from CoverPhoto
            var coverArray = completeBookArray[g].title.split(':cover:');
            // console.log('coverArray is =');
            // console.log(coverArray[0]);
            // console.log(coverArray[1]);
            var aiknaiarrayObjCarrot = [];
            if (g==0) {
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_arind.jpg'), data:completeBookArrayCarrot};
            }
            // else if (g==1){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/indrain.jpg'), data:completeBookArrayCarrot};
            // }
            // else if (g==2){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/angoor.jpg'), data:completeBookArrayCarrot};
            // }else if (g==3){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/aam.jpg'), data:completeBookArrayCarrot};
            // }else if (g==4){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/thumbnail_aak.jpg'), data:completeBookArrayCarrot};
            // }else if (g==5){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/badam.jpg'), data:completeBookArrayCarrot};
            // }else if (g==6){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/bargad.jpg'), data:completeBookArrayCarrot};
            // }else if (g==7){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/dhatoora.jpg'), data:completeBookArrayCarrot};
            // }else if (g==8){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            // }else if (g==9){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            // }else if (g==10){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            // }else if (g==11){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            // }else if (g==12){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            // }else if (g==13){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            // }else if (g==14){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            // }else if (g==15){
            //   aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            // }
            finalBookArrayCarrot.push(aiknaiarrayObjCarrot);
          } 
          this.setState({showProgress:false});
          AsyncStorage.setItem('booksData', JSON.stringify(finalBookArrayCarrot));
          // this.horizontalrowselected();
          // this.dumpIntoDB();
        })

        // console.log(coverArray[0]);
        // console.log('Final Array Testing is =', finalBookArrayCarrot[0]);

        Constants.BookArray=finalBookArrayCarrot;
        Constants.isBookLoaded=true;
        this.setState({
          bookArray:finalBookArrayCarrot
        })

        // console.log('Final Book is = ',this.state.bookArray);
      }

      console.log('Final Book is = ',this.state.bookArray);

}

  // fetchDataFromDB(bookName){
  //   // console.log('bookName is = ',bookName);
  //   var arrayDB = [];
  //   db.transaction(tx => {
  //          tx.executeSql(
  //            'SELECT * FROM table_books WHERE book_name = ?',[bookName],
  //            (tx, results) => {
  //              var resultslength = results.rows.length;
  //             //  console.log('select * results are = ',resultslength);
  //              if (resultslength > 0) {
  //                for (let i = 0; i < resultslength; ++i) {
  //                  var objforDB = {
  //                    key:i,
  //                    book_name:results.rows.item(i).book_name,
  //                    chapter_name:results.rows.item(i).chapter_name,
  //                    disease_name:results.rows.item(i).disease_name,
  //                    prescription_name:results.rows.item(i).prescription_name,
  //                    prescription_detail:results.rows.item(i).prescription_detail,
  //                  };
  //                  arrayDB.push(objforDB);
  //                 //  console.log(objforDB);
  //                }
  //               //  console.log('0 index is = ', arrayDB[0].book_name);
  //               //  this.setState({
  //               //   finalArray:arrayDB,
  //               //   // showProgress:true,
  //               //  });
  //                this.pushToNextViewController(arrayDB);
  //              }else{
  //                alert('Book data is not available');
  //              }
  //            }
  //          );
  //        });
  // }

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

        // this.fetchDataFromDB(bookName);

    }

  render(){
    
    console.log('this.state.bookArrayNew = ',this.state.bookArrayNew);

    return(
      <View>

      <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {true}/>
      
      {/* <Header title='تصانیف' showMenu={false} navigator={this.props.navigator} navigation={this.props.navigation}/> */}
      
            {/* <FlatList
                  style={{marginBottom:20}}
                  data={this.state.bookArray}
                  numColumns={2}
                  renderItem={
                  ({item}) =>
                  <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.rowSelected(item)}>
                    <Image source={item.cover} style={styles.imageStyle}/>
                    <Text style={styles.textStyle}>{item.title}</Text>
                  </TouchableOpacity>
                }
            /> */}
            
            <FlatList
                 style={{marginBottom:0}}
                 data={this.state.bookArrayNew}
                 numColumns={1}
                //  horizontal={true}
                 renderItem={ ({item}) =>
               
               <View style = {styles.viewStyle}>
                  <View style = {styles.viewStyleThumbnail}>
                  <Image source={{uri: item.url}} style={styles.imageStyle}/>
                  </View>
                  <View style = {styles.viewStyleText}>
                    <View style = {styles.viewStyleTop}>
                      <Text style={styles.titleStyle}>{item.title}</Text>
                      <Text style={styles.subtitleStyle}>Author: {item.author}</Text>
                  </View>
                  <View style = {styles.viewStyleBottom}>

                      {/* { item.audio?(
                      <TouchableOpacity style={styles.buttonStyleAudio} onPress={()=>this.rowSelectedAudio(item)}>
                        <Text style={styles.buttontitleStyle}> Audio </Text>
                      </TouchableOpacity>
                      ):(
                        null
                      )
                      } */}
                      
                      
                      {/* {item.data?( */}

                      <TouchableOpacity style={styles.buttonStyleUnicode} onPress={()=>this.rowSelectedUnicode(item)}>
                        <Text style={styles.buttontitleStyle}> Unicode </Text>
                      </TouchableOpacity>
                      
                      {/* ):(null)
                      } */}

                      {/* {item.pdf?(  */}

                      <TouchableOpacity style={styles.buttonStylePDF} onPress={()=>this.rowSelectedPDF(item)}>
                        <Text style={styles.buttontitleStyle}> PDF </Text>
                      </TouchableOpacity>

                      {/* ):(null)
                      } */}
                     
                  </View>
                  </View>
                </View>
               }
           />



      </View>
    );
  }
}

const styles=StyleSheet.create({
outerContainer:{
  flex:1,
  backgroundColor:'white',
  justifyContent: 'center',
  alignItems: 'center',
},
buttonStyle:{
  marginLeft:0,
  marginRight:0,
  marginTop:10,
  marginBottom:0,
  justifyContent: 'center',
  alignItems: 'center',
  width:Cell_Width,
},

imageStyle:{
  marginLeft:5,
  marginRight:5,
  marginTop:5,
  marginBottom:5,
  width:80,
  height:120,
},

textStyle:{
  color:'#38803B',
  marginTop:0,
  marginBottom:5,
  textAlign:'center',
  fontSize:20,
  // fontWeight:'bold',
  fontFamily:'MehrNastaliqWeb'
},

viewStyle:{
  flex:1,
  flexDirection:'row',
  marginLeft:5,
  marginRight:5,
  marginTop:5,
  marginBottom:5,
  backgroundColor : 'white', 
  elevation: 3,
  borderRadius:4,
  padding:4,
  justifyContent: 'flex-start',
  alignItems: 'center',
  // width:Cell_Width,
  shadowOpacity: 10,
  shadowColor: 'black',
  justifyContent: 'center',
},

viewStyleThumbnail:{
  flex:0.33,
  // marginLeft:5,
  // marginRight:5,
  // marginTop:5,
  // marginBottom:5,
  // elevation: 3,
  // justifyContent: 'flex-start',
  // alignItems: 'center',
  // width:Cell_Width,
  // borderRadius:4,
  // padding:4,
  // shadowOpacity: 10,
  backgroundColor : 'white',
  // shadowColor: 'black',
  // justifyContent: 'center',
},

viewStyleText:{
  flex:0.67,
  // marginLeft:15,
  // marginRight:5,
  // marginTop:5,
  // marginBottom:5,
  // elevation: 3,
  // justifyContent: 'flex-start',
  // alignItems: 'center',
  // width:Cell_Width,
  // borderRadius:4,
  // padding:4,
  // shadowOpacity: 10,
  backgroundColor : 'white',
  // shadowColor: 'black',
  // justifyContent: 'center',
},

viewStyleTop:{
  flex:0.67,
  // marginLeft:15,
  // marginRight:5,
  // marginTop:5,
  // marginBottom:5,
  // elevation: 3,
  // justifyContent: 'flex-start',
  // alignItems: 'center',
  // width:Cell_Width,
  // borderRadius:4,
  // padding:4,
  // shadowOpacity: 10,
  backgroundColor : 'white',
  // shadowColor: 'black',
  // justifyContent: 'center',
},

viewStyleBottom:{
  flex:0.67,
  flexDirection:'row',
  // marginLeft:15,
  // marginRight:5,
  // marginTop:5,
  // marginBottom:5,
  // elevation: 3,
  // justifyContent: 'flex-start',
  // alignItems: 'center',
  // width:Cell_Width,
  // borderRadius:4,
  // padding:4,
  // shadowOpacity: 10,
  backgroundColor : 'white',
  // shadowColor: 'black',
  // justifyContent: 'center',
},
titleStyle:{
  color:'black',
  marginTop:0,
  // marginBottom:0,
  // textAlign:'center',
  fontSize:18,
  // fontWeight:'bold',
  // fontFamily:'MehrNastaliqWeb'
},

buttontitleStyle:{
  color:'black',
  marginTop:0,
  // marginBottom:0,
  // textAlign:'center',
  fontSize:12,
  // fontWeight:'bold',
  // fontFamily:'MehrNastaliqWeb'
},

subtitleStyle:{
  color:'grey',
  marginTop:0,
  // marginBottom:0,
  // textAlign:'center',
  fontSize:13,
  // fontWeight:'bold',
  // fontFamily:'MehrNastaliqWeb'
},

buttonStyleAudio:{
  marginLeft:5,
  marginRight:5,
  marginTop:50,
  marginBottom:5,
  elevation: 3,
  // justifyContent: 'flex-start',
  alignItems: 'center',
  width:60,
  height:35,
  borderRadius:4,
  padding:4,
  shadowOpacity: 10,
  backgroundColor : '#D3D3D3',
  shadowColor: 'black',
  justifyContent: 'center',
},

buttonStyleUnicode:{
  marginLeft:0,
  marginRight:5,
  marginTop:50,
  marginBottom:5,
  elevation: 3,
  // justifyContent: 'flex-start',
  alignItems: 'center',
  width:60,
  height:35,
  borderRadius:4,
  padding:4,
  shadowOpacity: 10,
  backgroundColor : '#D3D3D3',
  shadowColor: 'black',
  justifyContent: 'center',
},

buttonStylePDF:{
  marginLeft:0,
  marginRight:5,
  marginTop:50,
  marginBottom:5,
  elevation: 3,
  // justifyContent: 'flex-start',
  alignItems: 'center',
  width:60,
  height:35,
  borderRadius:4,
  padding:4,
  shadowOpacity: 10,
  backgroundColor : '#D3D3D3',
  shadowColor: 'black',
  justifyContent: 'center',
},

})

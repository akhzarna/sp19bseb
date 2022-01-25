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
  SectionList,
  Pressable,
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

// import Styles from './aliahtashamdata/BookShelf/Styles';

import Icon from 'react-native-vector-icons/AntDesign';

const DATA = [
  {
    title: 'Ali Jahanzaib',
    msg: 'Whatsupp?',
    pic: '',
    time: '6:51 PM',
    unread: '2',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
  {
    title: 'Ahmad',
    msg: 'Hi',
    pic: '',
    time: '6:49 PM',
    unread: '1',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
  {
    title: 'Waleed',
    msg: 'Where are you?',
    pic: '',
    time: '6:45 PM',
    unread: '5',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },

  {
    title: 'Faizan',
    msg: 'wanna go?',
    pic: '',
    time: '6:33 PM',
    unread: '1',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
  {
    title: 'Anas',
    msg: 'Very nice!',
    pic: '',
    time: '6:22 PM',
    unread: '3',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
  {
    title: 'Dad',
    msg: 'Come home',
    pic: '',
    time: '5:51 PM',
    unread: '1',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
  {
    title: 'Mom',
    msg: 'Where are you going?',
    pic: '',
    time: '1:12 PM',
    unread: '1',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
  {
    title: 'Zain',
    msg: 'lets party',
    pic: '',
    time: '8:54 PM',
    unread: '3',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
  {
    title: 'Wahaj',
    msg: 'Join meeting',
    pic: '',
    time: '4:50 PM',
    unread: '12',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },

  {
    title: 'Ali Ahmad',
    msg: 'Dude, Lets meet',
    pic: '',
    time: '9:24 PM',
    unread: '4',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
  {
    title: 'Amina',
    msg: 'Tommorrow?',
    pic: '',
    time: '7:55 PM',
    unread: '22',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
  {
    title: 'Client',
    msg: 'Excellent job',
    pic: '',
    time: '3:59 PM',
    unread: '3',
    url:'https://firebasestorage.googleapis.com/v0/b/matabsulemani-23765.appspot.com/o/thumbnail_aak.jpg?alt=media&token=cf23a0c0-be7f-4e12-b8b5-3f7ba776ca00',
  },
];

export default class BookShelf extends Component{

    constructor(props){
      super(props);
      // this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
      this.state={
          bookArray:[],
          bookArrayNew:[],
          showProgress:true,
          flag1:45,
          university:[],
      }

      // this.state = {

      // }

    }
    
    componentDidMount() {

      // Alert.alert('I am Bookshel');
      this.setState({
        flag1:280
      });

      // Alert.alert('Flag value is = ' + flag1);

      // Alert.alert('This is BookShelf')
    //   console.log('Final Book is = ',this.state.bookArray);
    //   AsyncStorage.getItem("booksData").then((value) => {
    //     var booksData = JSON.parse(value);
    //     if (booksData == null) {
    //       this.booksLoadAction();
    //     }else{
    //     this.setState({
    //       bookArray:booksData,
    //       showProgress:false
    //     }); 
    //     this.booksLoadAction();
    //     }
    //   }
    // ).done();


    // const usersCollection = firestore().collection('Users');
    // console.log('Total Collections: ', usersCollection);
    
    // const userDocument = firestore().collection('Users').doc('brFR2nBInbv7RPMZn7A5');
    // console.log('Total Documents: ', userDocument);


  // firestore()
  // .collection('Users')
  // .get()
  // .then(querySnapshot => {
  //   console.log('Total users: ', querySnapshot.size);
  //   querySnapshot.forEach(documentSnapshot => {
  //     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
  //   });
  // });


  // firestore()
  // .collection('books')
  // .doc('0')
  // .get()
  // .then(documentSnapshot => {
  //   console.log('Books exists: ', documentSnapshot.exists);
  //   if (documentSnapshot.exists) {
  //     console.log('User data: ', documentSnapshot.data());
  //   }
  // });

//  Complete Collection


// firestore()
//   .collection('Student')
//   .orderBy('marks', 'desc')
//   .limit(5)
//   .get()
//   .then(querySnapshot => {
//     console.log('Total users: ', querySnapshot.size);

//     querySnapshot.forEach(documentSnapshot => {
//       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//     });
//   });

var newArray = [];

// firestore()
//   .collection('Student')
//   .get()
//   .then(querySnapshot => {
//     // console.log('Total users: ', querySnapshot.size);
//     querySnapshot.forEach(documentSnapshot => {
//       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//       newArray.push(documentSnapshot.data());
//       this.setState({university:newArray});
//     });
//   });

// for (var x = 0; x<22; x++){
//   var shoaib = x+'';

//   firestore()
//   .collection('NayaTable')
//   .doc(shoaib)
//   .set({
//     name: 'Ada Lovelace',
//     age: 30,
//   })
//   .then(() => {
//     console.log('User added!');
//   });
// }


// firestore()
//   .collection('Student')
//   .doc('10')
//   .update({
//     age: 22,
//     name:'Sadam',
//     class:'BCS',
//     marks:78,
//     campus:'Comsats'
//   })
//   .then(() => {
//     console.log('User updated!');
//   });

  // firestore()
  // .collection('books')
  // .orderBy('id', 'desc')
  // .get()
  // .then(querySnapshot => {
  //   var tempArray = [];
  //   // console.log('Total users: ', querySnapshot.size);
  //   querySnapshot.forEach(documentSnapshot => {
  //     console.log('Firestore Document', documentSnapshot.id, documentSnapshot.data());
  //     tempArray.push(documentSnapshot.data());
  //   });
  //   this.setState({
  //     bookArrayNew:tempArray
  //   }); 
  // });

  // firestore()
  // .collection('Users')
  // .doc('ABC')
  // .delete()
  // .then(() => {
  //   console.log('User deleted!');
  // });
  
  // database()
  // .ref('/Student/1')
  // .once('value')
  // .then(snapshot => {
  //   console.log('User data: ', snapshot.val());
  // });
    

  database()
  .ref('/University/')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
    this.setState({university:snapshot.val()});
  });


  // database()
  // .ref('/users/')
  // .on('value', snapshot => {
  //   console.log('User data: ', snapshot.val());
  // });


  
  // database()
  // .ref('/Student/')
  // .on('value', snapshot => {
  //   console.log('User data: ', snapshot.val());
  // });

  // database()
  // .ref('/Student/')
  // .once('value')
  // .then(snapshot => {
  //   console.log('User data: ', snapshot.val());
  // });


}

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

    componentWillMount(){

      // Alert.alert('componentWillMount');

      // this.state.flag1 = 300;

      this.setState({
        flag1 : 156
      });

    }

    booksLoadAction(){
      
      this.props.navigation.navigate('Allbooks');
    
    }

    medicineLoadAction(){
      
      this.props.navigation.navigate('Products-Screen');
    
    }

    render()
    {
      return (

        <View style = {Styles.Container}>
        
        <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {true}/>

        {/* <View style = {Styles.innerContainer}>
        <Pressable onPress={()=>{navigation.toggleDrawer()}}> 
            <Icon name='menu-fold' size={30} color='#24A148'/>  
            </Pressable>
            <Image 
            source={require('./aliahtashamdata/Images/logoresize.png')} 
            style={Styles.logo}/>
       </View> */}

        {/* <Header navigation={navigation}/> */}
       
        <View style = {Styles.UpperBody}>
            <View style = {Styles.sectionright}>
            <Image
             style={Styles.founderimg}
             source={require('./aliahtashamdata/Images/hakeem.png')}
             />
             <Text style = {Styles.imgdetails}>حکیم محمد عبداللہ</Text>
             <Text style = {Styles.imgdetails}>(1974-1904)</Text>
            </View>
            <View style = {Styles.sectionleft}>
                <Text style = {Styles.aboutContent}>حکیم محمد عبداللہؒ کے صاحبزادے حکیم عبدالوحید سلیمانی   ؒنے 1968ء میں پنجاب یونیورسٹی ، لاہور سے فارمیسی اور اسلامیات کی تعلیم کے حصول کے بعد جہانیاں سے عملی زندگی کا آغاز کیا اور کتب و ادویہ کی فروخت اور ترسیل کے لیے ادارہ سلیمانی کی بنیاد رکھی۔</Text>
                <Pressable style = {Styles.moreBtn}>
                    <Text style = {Styles.Btntxt}>View More .. </Text>
                </Pressable>
            </View>
        </View>
      {/*  <View style ={Styles.midBody}>
        <Image
             style={Styles. designContent}
             source={require('../../Assets/Images/leaf.png')}
             /> 
            <Text style ={Styles.midContent}>ہماری روایت ۔ ہمارا عزم   فروغ صحت ۔ فروغ علم</Text>
          <Image
             style={Styles. designContent}
             source={require('../../Assets/Images/leaf.png')}
             /> 
            
</View> */}

        <View style ={Styles.Grids}>

        <TouchableOpacity onPress = {() => this.medicineLoadAction()}>
            <View style ={Styles.GridOne}>
            <Image
             style={Styles.Gridimg}
             source={require('./aliahtashamdata/Icons/ExpandMenu_9.png')}
             /> 
             <Text style = {Styles.GridNam}>ادویات</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress = {() => this.booksLoadAction()}>

            <View style ={Styles.GridOne}>
            <Image
             style={Styles.Gridimg}
             source={require('./aliahtashamdata/Icons/ExpandMenu_10.png')}
             /> 
             <Text style = {Styles.GridNam}>مطب</Text>
            </View>
          </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.booksLoadAction()}>
          <View style ={Styles.GridOne}>
            <Image
             style={Styles.Gridimg}
             source={require('./aliahtashamdata/Icons/ExpandMenu_7.png')}
             /> 
             <Text style = {Styles.GridNam}>کتب</Text>
            </View>
        </TouchableOpacity>

        </View>
     
       <View style = {Styles.footer}>
           <View style = {Styles.footerTxtDesign}>
       
           <Text style = {Styles.footerTxt}>
           ہماری روایت ۔ ہمارا عزم  
            </Text>
            </View>
            
           <Text style = {Styles.footerTxtSecond}>
           فروغ صحت ۔ فروغ علم    
              </Text>
                   
        </View>
        </View>
      )
  }
}

const Styles=StyleSheet.create({

  innerContainer:{
    height:'10%',
    backgroundColor:'#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
    alignItems:'center',
    paddingHorizontal:20,
    flexDirection:'row'
    },
    logo:{
      height:'100%',
       width:'55%',
       marginHorizontal:50,
       marginTop:-20
    },
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

viewStyleMain:{
  flex:1,
  flexDirection:'row',
  // marginLeft:5,
  // marginRight:5,
  // marginTop:5,
  // marginBottom:5,
  // elevation: 3,
  // borderRadius:4,
  padding:4,
  height:140,
  // justifyContent: 'flex-start',
  // shadowOpacity: 10,
  // shadowColor: 'grey',
  // alignItems: 'center',
  // justifyContent: 'center',
  backgroundColor : 'lightgrey', 
},

leftView:{
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

rightView:{
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
  backgroundColor : 'grey',
  // shadowColor: 'black',
  // justifyContent: 'center',
},

viewStyleTop:{
  flex:0.50,
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

bottomView:{
  flex:0.50,
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
  color:'lightgrey',
  marginTop:0,
  // marginBottom:0,
  // textAlign:'center',
  fontSize:18,
  // fontWeight:'bold',
  // fontFamily:'MehrNastaliqWeb'
},

buttontitleStyle:{
  color:'lightgrey',
  marginTop:0,
  // marginBottom:0,
  // textAlign:'center',
  fontSize:12,
  // fontWeight:'bold',
  // fontFamily:'MehrNastaliqWeb'
},

subtitleStyle:{
  color:'grey',
  marginTop:5,
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
  shadowColor: 'lightgrey',
  justifyContent: 'center',
},

buttonStyleUnicode:{
  // marginLeft:0,
  marginRight:5,
  marginTop:50,
  // marginBottom:5,
  // elevation: 3,
  // justifyContent: 'flex-start',
  alignItems: 'center',
  width:60,
  height:35,
  borderRadius:4,
  padding:4,
  shadowOpacity: 10,
  backgroundColor : '#D3D3D3',
  shadowColor: 'lightgrey',
  justifyContent: 'center',
},

buttonStylePDF:{
  // marginLeft:0,
  // marginRight:5,
  marginTop:50,
  // marginBottom:5,
  elevation: 3,
  // justifyContent: 'flex-start',
  alignItems: 'center',
  width:60,
  height:35,
  borderRadius:4,
  padding:4,
  shadowOpacity: 10,
  backgroundColor : '#D3D3D3',
  shadowColor: 'lightgrey',
  justifyContent: 'center',
},

Container:{
  backgroundColor:'#fff',
flex:1,
},
UpperBody:{
  flexDirection:'row-reverse',
  backgroundColor:'#fff',
  borderBottomLeftRadius:10,
  borderBottomRightRadius:10,
  shadowColor: '#000',
  shadowOpacity: 0.26,
  shadowOffset: { width: 0, height: 2},
  shadowRadius: 10,
  elevation: 5 
},
sectionright:{
  margin:15,
  borderWidth:.8,
  borderRadius:20,
  borderColor:'#ffb422'
},
founderimg:{
  height:130,
  width:120,
  borderRadius:20,
  borderColor:'#fff',
 borderWidth:7,

},

imgdetails:{
  textAlign:'center',
  color:'#a5a5a5',
  fontFamily:'Jameel-Noori-Nastaleeq-Kasheeda',
},
sectionleft:{
  width:'60%',
 marginVertical:15,
 paddingTop:10,  
 paddingLeft:10,
},
aboutContent:{
  textAlign:'auto',
  color:'#a5a5a5',
  fontFamily:'Jameel-Noori-Nastaleeq-Kasheeda',
  fontSize:14,
  lineHeight:25,
},
moreBtn:{
 marginLeft:5,
},
Btntxt:{
  fontFamily:'Poppins-SemiBold',
  color:'#24A148',
  textDecorationLine:'underline'
},
midBody:{
  flexDirection:'row',
  justifyContent:'center',
  marginVertical:30
},
midContent:{
  fontFamily:'Jameel-Noori-Nastaleeq-Kasheeda',
  fontSize:16,
  color:'#24A148',
  textDecorationLine:'underline',
 
},
designContent:{
  width:30, 
  height:30,
  margin:6,
},
Grids:{
  
  flexDirection:'row',
 marginHorizontal:10,
 marginVertical:30,
  
},
GridOne:{
  borderWidth:2,
 marginHorizontal:10,
  width:110,
  height:160,
  borderRadius:20,
  justifyContent:'center',
  alignItems:'center',
  borderColor:'#ffb422',
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
  backgroundColor:'#fff'
  
},
Gridimg:{
  width:75,
  height:75,
},
GridNam:{
  fontSize:22,
  fontWeight:'700',
  color:'#ffb422',
  marginTop:18,
},
footer:{
  margin:20,
},
footerTxtDesign:{
  flexDirection:'row-reverse'
},
footerTxt:{
  fontFamily:'AlQalam Irtaza Hassan Regular',
  fontSize:30,
  color:'#24A148',
  margin:10,
},
footerTxtSecond:{
  fontFamily:'AlQalam Irtaza Hassan Regular',
  fontSize:30,
  color:'#ffb422',
  textAlign:'left',
  margin:10,
}
})

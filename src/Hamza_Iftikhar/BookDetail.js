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
  ScrollView
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

import Icon from 'react-native-vector-icons/FontAwesome';
import BooksData from './aliahtashamdata/AllBooks/BooksData';

export default class BookDetail extends Component{

    constructor(props){
      super(props);
      // this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
      this.state={
          bookArray:[],
          bookArrayNew:[],
          showProgress:true,
          flag1:45,
          university:[],
          allBooksData:[],
      }

      // this.state = {

      // }

    }

    componentDidMount() {
      console.log('Hello Hello' + this.props.route.params.item.title);
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


  // database()
  // .ref('/books/')
  // .once('value')
  // .then(snapshot => {
  //   console.log('All Books are: ', snapshot.val());
  //   this.setState({allBooksData:snapshot.val()});
  // });


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

    rowSelected(){
        console.log(this.props.route.params.item.chapters);
        // var bookName = this.state.bookArray[item.key]
        this.props.navigation.navigate('BookView',{
          bookdetail:this.props.route.params.item,
          // finalDict:this.props.route.params.item,
        });
    }

    chaptersLoadAction(chapters){
      console.log('All Books Data is = ', chapters);
      this.props.navigation.navigate('Allchapters',{chapters:chapters});
    }

    render()
    {
      return   (

   

      <View style = {Styles.container}>
      {/* <StatusBar  backgroundColor={'#fff'} barStyle="dark-content" /> */}
      <View style ={Styles.headerSection}>
      <View style = {Styles.appBar}>
     <TouchableOpacity onPress={()=>this.props.navigation.pop()}>
      <Icon name="chevron-left" size={22} color="#969696" />
      </TouchableOpacity>
     <TouchableOpacity>
        <Icon name="bookmark" size={22} color='#969696' />
     </TouchableOpacity>
        </View>
        <View style ={Styles.ProductView}>
          <View style ={Styles.imgView}>
              <Image
              style = {Styles.prodimg}
              source = {{ uri: this.props.route.params.item.url}}/>
          </View>
          <View style = {Styles.productContent}>
          <Text style= {Styles.prodNam}> {this.props.route.params.item.title} </Text>
          <Text style= {Styles.prodAuthor}> {this.props.route.params.item.author} </Text>
          </View>
          </View>
          <View style = {Styles.bookActions}>
            <TouchableOpacity  style = {Styles.bookActionBtn}>
            <Icon name="comments" size={24} color='#969696' />
            <Text style = {Styles.actiontxt}>Reviews </Text>
            </TouchableOpacity>
            <TouchableOpacity  style = {Styles.bookActionBtn}>
            <Icon name="download" size={21} color='#969696' />
            <Text style = {Styles.actiontxt}>Download </Text>
            </TouchableOpacity>
            <TouchableOpacity  style = {Styles.bookActionBtn}>
            <Icon name="share-square" size={22} color='#969696' />
            <Text style = {Styles.actiontxt}>Share </Text>
            </TouchableOpacity>
          </View>
          </View>

          <View style = {Styles.midSection}>
            <Text style ={Styles.descriptionTitle}>مختصر تعارف:</Text>
            <Text style ={Styles.description}> {this.props.route.params.item.bookintro} </Text>
          </View>
          <View style ={Styles.FooterSection}>
          <TouchableOpacity style={Styles.readBtn} onPress={()=>this.rowSelected()}>
            <Text style={Styles.readBtntxt}>Read Now</Text>
          </TouchableOpacity>
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
  headerSection:{
      padding:10,
      backgroundColor:'#fafafa',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 5,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
  },
  appBar:{
      flexDirection:'row',
      margin:8,
      paddingHorizontal:10,
      justifyContent:'space-between'
  },
  ProductView:{
      flexDirection:'row',
      margin:8,
      paddingHorizontal:10,
  },
  imgView:{
      width:150,
      height:230,
      margin:10,
      borderRadius:20,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 5,

  },
  prodimg:{
      height:'100%',
      width:'100%',
      resizeMode:'cover',
      borderRadius:20,
  },
  productContent:{

     height:230,
     width:'50%',
     margin:10,
     justifyContent:'center'
  },
  prodNam:{
      fontFamily:'300 Regular',
      fontSize:30,
      color:'#18191A'
  },
  prodAuthor:{
      fontFamily:'Jameel Noori Nastaleeq Regular',
      fontSize:20,
      color:'#969696'
  },
  bookActions:{
      flexDirection:'row',
      justifyContent:'space-between',
      margin:10,

  },
  bookActionBtn:{
      flexDirection:'row',
      marginHorizontal:10,
      alignItems:'center'
  },
  actiontxt:{
      fontFamily:'Poppins-SemiBold',
      color:'#969696',
      fontSize:14,
      marginLeft:10,
      marginTop:8,
  },
  midSection:{
      margin:20,
  },
  descriptionTitle:{
      fontFamily:'300 Regular',
      fontSize:22,
      marginHorizontal:10,
      color:'#18191A'
  },
  description:{
      fontFamily:'Jameel Noori Nastaleeq Regular',
      fontSize:20,
      marginHorizontal:20,

  },
  FooterSection:{
      flex:1,
      position:'relative',
  },
  readBtn:{
      position:'absolute',
      bottom:0,
      right:0,
      height:45,
      width:150,
      justifyContent:'center',
      alignItems:'center',
      borderTopLeftRadius:10,
      backgroundColor:'#24A148'
  },
  readBtntxt:{
      color:'#fff',
      fontFamily:'Poppins-SemiBold',
      fontSize:15
  }
})

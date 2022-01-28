
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage,
} from 'react-native';

var Header=require('./Header');
var HeadingView=require('./HeadingView');

var bookmark_icon=require('./Icons/bookmark_icon.png')
var share_icon=require('./Icons/share_icon.png')
import HTMLView from 'react-native-htmlview';
import Share, {ShareSheet, Button} from 'react-native-share';
var isiPhone=Platform.OS === 'ios';

class ReadingComponentFromBooks extends Component{

  constructor(props){
    super(props);
    var readingArray = [];
    this.width = Dimensions.get('window').width;
    this.height = Dimensions.get('window').height;

    console.log('Section Array is = ' , this.props.route.params.sectionArray);
    console.log('Section Array is = ' , this.props.route.params.sectionArray[0]);

    // console.log('First time in ReadingComponentFromBooks data is = ', this.props.route.params.sectionArray);
    // console.log('First time in ReadingComponentFromBooks length is = ', this.props.route.params.sectionArray.length);
    // console.log('First time in ReadingComponentFromBooks selectedRow is = ', this.props.route.params.selectedRow);
    // console.log('Aik aur tarajba is = ', this.props.route.params.sectionArray[0].title);
    // Alert.alert('Data is = ' + this.props.route.params.sectionArray.length);

    for (var i = 0; i < this.props.route.params.sectionArray.length; i++) {

    // var mainHeading = this.props.route.params.sectionArray[i].chapter_name;
    // var subHeading = this.props.route.params.sectionArray[i].disease_name;
    // var subbestHeading = this.props.route.params.disease_name;
    var subbestHeading = this.props.route.params.prescription_name;
    var tempData = this.props.route.params.sectionArray[i].title;
    var bookTitle = this.props.route.params.disease_name;
    // var headingWords = [mainHeading,subHeading,subbestHeading];
    var index = tempData.indexOf('\r');
    var beforeHeading = tempData.slice(0,index);
    var afterHeading = tempData.slice(index+1,tempData.length);
    // var headingData = '<h1>'+beforeHeading+'</h1>';
    var headingWords = [beforeHeading];
    afterHeading = afterHeading.replace('\n','');
    afterHeading = '<p>'+afterHeading+'</p>';
    if (Platform.OS === 'ios') {
    }else{
     afterHeading=afterHeading.split('\r').join('\n');
    }

    var ObjectToSaveInArray = {heading:headingWords,data:afterHeading,key:i,bookmarkCheck:false};
    readingArray.push(ObjectToSaveInArray);

  }

    this.state={
      readingArray:readingArray,
      data:afterHeading,
      orignalData:this.props.route.params.sectionArray[0].prescription_detail,
      indexOfBookMark:-1,
      headingWords:headingWords,
      bookTitle:bookTitle,
    }

    this.checkForAlreadyBookMark();
  }

  checkForAlreadyBookMark(){

    AsyncStorage.getItem("bookMark").then((value) => {
              if (value!=null) {
                    // console.log("value bookmark",value,"LENGTH",value.length);
                  //  Alert.alert("bookmark"+value);
                    var savedValue=JSON.parse(value);
                    var array=savedValue.bookMark;

                    for (var i = 0; i < array.length; i++) {

                      var paragraph = array[i];

                      var str1 = paragraph.slice(0,15);

                      for(var j=0; j<this.state.readingArray.length; j++){
                      var data = this.state.readingArray[j].data;
                      var str2=data.slice(0,15);

                      if (str1 == str2) {
                         var tempArrat=[];
                        // console.log("alredy book mark");
                      //  Alert.alert('before compare asyn',str1,i,j);
                      //  Alert.alert("before compare local",str2,"  " ,i,j);
                        //console.log("before compare asyn",str1,"  " ,i,j);
                        //console.log("before compare local",str2,"  ",i,j);
                        this.state.readingArray[j].bookmarkCheck = true;
                          tempArrat= this.state.readingArray;
                          this.setState({readingArray: tempArrat});

                      }else{
                      }
                    }
                   }


                  }
           }).done();
  }

seperateHeadingWord(data){
  var index1=data.indexOf('#');
  var array=[];
  if (index1!=-1) {
    var urduWord=data.slice(0,index1);
    urduWord=urduWord.trim();
    array.push(urduWord);
    var index2=data.indexOf('#',index1+1);
            if (index2!=-1) {
              var persianWord=data.slice(index1+1,index2);
              persianWord=persianWord.trim();
              var index3=data.indexOf('\r');
              var englishWord=data.slice(index2+1,index3);
              englishWord=englishWord.trim();
              array.push(persianWord);
              array.push(englishWord);
            }else{
              var index3=data.indexOf('\r');
              var englishWord=data.slice(index1+1,index3);
              englishWord=englishWord.trim();
              array.push(englishWord);
            }
    }else{
      var index3=data.indexOf('\r');
      var word=data.slice(0,index3);
      word=word.trim();
      array.push(word);
    }
  array.reverse();
  return array;
  }

  BookMarkBtnClicked(item){
        //   console.log("before key",item.key);
        // //  item.key = -1;
        // console.log("before editing",this.state.readingArray[item.key]);
        // this.state.readingArray[item.key].bookmarkCheck = !this.state.readingArray[item.key].bookmarkCheck;
        // var test = [];
        // test = this.state.readingArray;
        // this.setState({readingArray:test});
        // console.log("after editing",this.state.readingArray[item.key]);



        // for(var i=0; i<this.state.readingArray.length; i++){
        //   if(item.key == this.state.readingArray[i].key)
        //   {
        //     console.log("before editing key", this.state.readingArray[i].bookmarkCheck);
        //     this.state.readingArray[i].bookmarkCheck = !this.state.readingArray[i].bookmarkCheck;
        //     console.log("after additing key",this.state.readingArray[i].bookmarkCheck);
        //   }
        // }


    if (item.bookmarkCheck == false) {
      item.bookmarkCheck = true;
      // console.log("book markk item length",item.length);
      AsyncStorage.getItem("bookMark").then((value) => {
          if (value!=null) {
                  // console.log("data save in bookmark",item);
                  var savedValue=JSON.parse(value);
                  // savedValue.bookmarkCheck =
                  var array=savedValue.bookMark;
                  array.push(item.data);
                  var bookMark={bookMark:array};
                  AsyncStorage.setItem('bookMark', JSON.stringify(bookMark))
                  this.setState({indexOfBookMark:array.length-1});
                  //   this.state.item.bookmarkCheck = array.length-1;
                }else{
                  var tempArray=[];
                  tempArray.push(item.data);
                  var bookMark={bookMark:tempArray};
                  AsyncStorage.setItem('bookMark', JSON.stringify(bookMark))
                  this.setState({indexOfBookMark:tempArray.length-1});
               //   this.state.item.bookmarkCheck = array.length-1;
                }
                Alert.alert('Alert!','Book Mark Saved.')
             }).done();
   }else{
      item.bookmarkCheck = false;
      AsyncStorage.getItem("bookMark").then((value) => {
        if (value!=null) {
              var savedValue=JSON.parse(value);
              var array=savedValue.bookMark;
              var tempArray=[];
              var dummyArray = [];
              for(var i = 0; i < array.length; i++) {
             //   Alert.alert("here"+array[i]);
                var paragraph= array[i];
                var str1 = paragraph.slice(0,30);
                var itemData= item.data;
                var str2 = itemData.slice(0,30);
                 if (str1== str2) {
                  //  tempArray.push(array[i]);
                 }else{
                   array[i].bookmarkCheck = false;
                  dummyArray.push(array[i]);
                 }
              }
              var bookMark={bookMark:dummyArray};
              AsyncStorage.setItem('bookMark', JSON.stringify(bookMark))
              this.setState({indexOfBookMark:-1});
              Alert.alert('Alert!','Book Mark removed.')
        }
     }).done();
     }
  }

  rowSelected(selectedItem){

  }

  componentDidMount() {
    // Alert.alert('ReadingComponentFromBooks');
    // console.log("key",this.props.route.params.selectedRow);

    // scrollToIndex
    // if(this.props.route.params.selectedRow){
    //   scrollToIndex = () => {
    //     let randomIndex =  this.props.route.params.selectedRow;
    //     this.flatListRef.scrollToIndex({animated: false, index: randomIndex});
    //   }
    // }
}

  // UNSAFE_componentWillMount(){
  //
  //   }

    getItemLayout = (data, index) => (
      { length: 0, offset: 900 * index, index }
    );

  shareFunction(item){
    Share.open({
    // message:Constants.readingheaderTitle+'\n'+'آیت نمبر:'+item.AyahNumber+'\n'+'\n'+'آیت: '+item.AyahTextQalam+'\n'+'\n'+'اردوترجمۂ: '+translation+'\n'+'\n'+'تفسیر: '+item.Tafseer+'\n'+'\n',
    title: "مطب سلیمانی",
    message:"مطب سلیمانی" + '\n' +
    this.props.route.params.sectionArray[item.key].prescription_detail
    + "ادارہ سلیمانی",
    // url: Constants.applivelink,
    subject: "Share Link" //  for email
    });
  }

  render(route){

    let shareOptions = {
         title: "مطب سلیمانی",
         message:this.props.route.params.sectionArray[0].prescription_detail,
         subject: "Share Link" //  for email
       };

      //  const headingView=this.state.headingWords.map((item,index)=>{
      //    return(
      //      <View key={`item-${index}`} style={[styles.subViewStyle,{borderTopWidth:1,borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:index==this.state.headingWords.length-1?1:0,backgroundColor:'#BFEBFF'}]} >
      //      <Text style={{fontSize:27,color:'black',fontWeight:'bold', fontFamily:'MehrNastaliqWeb', marginTop:10,marginBottom:10,marginLeft:5,marginRight:5,textAlign:'right'}}>{item} </Text>
      //      </View>
      //    )
      //  });

    return(

      <View style={styles.outerContainer}>
      <Header title={this.props.route.params.title} navigator={this.props.navigator} navigation={this.props.navigation} />

      <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          style={styles.listView}
          data={this.state.readingArray}
          keyExtractor={(item, index) => ''+item.key}
          extraData={this.state}
          initialScrollIndex={this.props.route.params.selectedRow}
          getItemLayout={this.getItemLayout}
          renderItem={({item,index})=>
        <View style={{marginTop:10}}>

          <HeadingView headingWords={item.heading}/>

            <HTMLView
                value={item.data}
                addLineBreaks={false}
                textComponentProps={{textAlign:'right'}}
                stylesheet={htmlstyles}
            />

            <TouchableOpacity onPress={()=>this.BookMarkBtnClicked(item)}
            style={{marginLeft:40,marginRight:40,marginBottom:5,marginTop:10, backgroundColor: (item.bookmarkCheck ? '#E8590A':'gray'),height:50,justifyContent:'center',alignItems:'center',borderRadius:30}}>
            <View style={styles.innerView}>
            <Image source={bookmark_icon} style={styles.iconStar}/>
            <Text style={styles.textStyle1}>بک مارک</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>this.shareFunction(item)}  style={{marginLeft:40,marginRight:40,marginBottom:20,marginTop:5,backgroundColor:'#2C3990',height:50,justifyContent:'center',alignItems:'center',borderRadius:30}}>
            <View style={styles.innerView}>
            <Image source={share_icon}  style={styles.iconShare}/>
              <Text style={styles.textStyle1}>  شیئیر</Text>
            </View>
            </TouchableOpacity>
          </View>
          }
        />
      </View>
    )
  }

}

const styles=StyleSheet.create({
    outerContainer:{
      flex:1,
      backgroundColor:'white',
    },
    listView:{
      paddingLeft:20,
      paddingRight:20,
      flex:1,
    },
    textView:{
      height:80,
      alignItems:'center',
      justifyContent:'flex-end',
      marginLeft:15,
      marginRight:15,
      flexDirection:'row',
      // backgroundColor:'green',
    },
    lineView:{
      height:1,
      marginRight:15,
      marginLeft:15,
      backgroundColor:'#E5E5E5',
    },
    textStyle:{
      textAlign:'right',
      color:'#000000',
      fontFamily:'MehrNastaliqWeb',
      fontSize:17,
      lineHeight:40,
    },
    iconDimention:{
      width:12,
      height:20,
    },
    innerView:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
    textStyle1:{
      color:'white',
      fontFamily:'MehrNastaliqWeb',
      fontSize:25,
      // fontWeight:'bold',
    },
    iconShare:{
      width:30,
      height:25,
      marginRight:10,
    },
    defaultStyle:{
    textAlign:'right',
    // color:'blue'

  },
  iconStar:{
    height:25,
    width:25,
    marginRight:10,
    // backgroundColor:'green'
  },
  subViewStyle:{
    flex:1,
    // backgroundColor:'green',
    // borderWidth:1,
    // height:50,
    alignItems:'center',
    justifyContent:'center',
  },

})

const htmlstyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  b:{
    fontWeight:'bold',
    color:'blue',
    fontFamily:'MehrNastaliqWeb',
    fontSize:20,
  },
  wrapper: {
        alignItems: "center",
  },
   p: {
     textAlign: "right",
     lineHeight:35,
     fontFamily:'MehrNastaliqWeb',
     fontSize:20,
     color:'#606060',
     marginTop:10,
    //  paddingTop:-40,
  },
  h1:{
    fontSize:30,
    color:'red',
    fontFamily:'MehrNastaliqWeb',
    textAlign: "right",
    // paddingTop:25,
    // lineHeight:20,
    // paddingBottom:-40,
  }
});

module.exports=ReadingComponentFromBooks;
